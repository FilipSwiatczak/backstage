/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { StorageApi, StorageValueChange } from '@backstage/core-plugin-api';
import { Observable } from '@backstage/types';
import ObservableImpl from 'zen-observable';

export type MockStorageBucket = { [key: string]: any };

export class MockStorageApi implements StorageApi {
  private readonly namespace: string;
  private readonly data: MockStorageBucket;
  private readonly bucketStorageApis: Map<string, MockStorageApi>;

  private constructor(
    namespace: string,
    bucketStorageApis: Map<string, MockStorageApi>,
    data?: MockStorageBucket,
  ) {
    this.namespace = namespace;
    this.bucketStorageApis = bucketStorageApis;
    this.data = { ...data };
  }

  static create(data?: MockStorageBucket) {
    return new MockStorageApi('', new Map(), data);
  }

  forBucket(name: string): StorageApi {
    if (!this.bucketStorageApis.has(name)) {
      this.bucketStorageApis.set(
        name,
        new MockStorageApi(
          `${this.namespace}/${name}`,
          this.bucketStorageApis,
          this.data,
        ),
      );
    }
    return this.bucketStorageApis.get(name)!;
  }

  get<T>(key: string): T | undefined {
    return this.data[this.getKeyName(key)];
  }

  async set<T>(key: string, data: T): Promise<void> {
    this.data[this.getKeyName(key)] = data;
    this.notifyChanges({ key, newValue: data });
  }

  async remove(key: string): Promise<void> {
    delete this.data[this.getKeyName(key)];
    this.notifyChanges({ key, newValue: undefined });
  }

  observe$<T>(key: string): Observable<StorageValueChange<T>> {
    return this.observable.filter(({ key: messageKey }) => messageKey === key);
  }

  private getKeyName(key: string) {
    return `${this.namespace}/${encodeURIComponent(key)}`;
  }

  private notifyChanges<T>(message: StorageValueChange<T>) {
    for (const subscription of this.subscribers) {
      subscription.next(message);
    }
  }

  private subscribers = new Set<
    ZenObservable.SubscriptionObserver<StorageValueChange>
  >();

  private readonly observable = new ObservableImpl<StorageValueChange>(
    subscriber => {
      this.subscribers.add(subscriber);
      return () => {
        this.subscribers.delete(subscriber);
      };
    },
  );
}
