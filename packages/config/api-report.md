## API Report File for "@backstage/config"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import type { JsonArray as JsonArray_2 } from '@backstage/types';
import { JsonObject as JsonObject_2 } from '@backstage/types';
import type { JsonPrimitive as JsonPrimitive_2 } from '@backstage/types';
import { JsonValue as JsonValue_2 } from '@backstage/types';

// @public
export type AppConfig = {
  context: string;
  data: JsonObject_2;
  filteredKeys?: string[];
};

// @public
export type Config = {
  subscribe?(onChange: () => void): {
    unsubscribe: () => void;
  };
  has(key: string): boolean;
  keys(): string[];
  get<T = JsonValue_2>(key?: string): T;
  getOptional<T = JsonValue_2>(key?: string): T | undefined;
  getConfig(key: string): Config;
  getOptionalConfig(key: string): Config | undefined;
  getConfigArray(key: string): Config[];
  getOptionalConfigArray(key: string): Config[] | undefined;
  getNumber(key: string): number;
  getOptionalNumber(key: string): number | undefined;
  getBoolean(key: string): boolean;
  getOptionalBoolean(key: string): boolean | undefined;
  getString(key: string): string;
  getOptionalString(key: string): string | undefined;
  getStringArray(key: string): string[];
  getOptionalStringArray(key: string): string[] | undefined;
};

// @public
export class ConfigReader implements Config {
  constructor(
    data: JsonObject_2 | undefined,
    context?: string,
    fallback?: ConfigReader | undefined,
    prefix?: string,
  );
  // (undocumented)
  static fromConfigs(configs: AppConfig[]): ConfigReader;
  // (undocumented)
  get<T = JsonValue_2>(key?: string): T;
  // (undocumented)
  getBoolean(key: string): boolean;
  // (undocumented)
  getConfig(key: string): ConfigReader;
  // (undocumented)
  getConfigArray(key: string): ConfigReader[];
  // (undocumented)
  getNumber(key: string): number;
  // (undocumented)
  getOptional<T = JsonValue_2>(key?: string): T | undefined;
  // (undocumented)
  getOptionalBoolean(key: string): boolean | undefined;
  // (undocumented)
  getOptionalConfig(key: string): ConfigReader | undefined;
  // (undocumented)
  getOptionalConfigArray(key: string): ConfigReader[] | undefined;
  // (undocumented)
  getOptionalNumber(key: string): number | undefined;
  // (undocumented)
  getOptionalString(key: string): string | undefined;
  // (undocumented)
  getOptionalStringArray(key: string): string[] | undefined;
  // (undocumented)
  getString(key: string): string;
  // (undocumented)
  getStringArray(key: string): string[];
  // (undocumented)
  has(key: string): boolean;
  // (undocumented)
  keys(): string[];
}

// @public @deprecated
export type JsonArray = JsonArray_2;

// @public @deprecated
export type JsonObject = JsonObject_2;

// @public @deprecated
export type JsonPrimitive = JsonPrimitive_2;

// @public @deprecated
export type JsonValue = JsonValue_2;
```
