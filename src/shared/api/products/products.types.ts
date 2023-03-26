export type Products = Product[];

interface Product {
  unitCode: string;
  unitPrice: string;
  name: string;
  brand: string;
  properties: Property[];
  parameters: Parameter[];
}

export interface Property {
  name: string;
  value: string;
}

interface BaseParameter {
  name: string;
  code: Codes;
}

export enum Codes {
  NAME = "name",
  EMAIL = "email",
  ADDRESS = "address",
  DELIVERY = "delivery",
  COLOR = "color",
  COUNT = "count",
}

interface NecessaryParameter extends BaseParameter {
  code: Codes.NAME | Codes.EMAIL;
  necessary: 1 | 0;
}
export interface ParameterWithValue extends BaseParameter {
  code: Exclude<Codes, Codes.NAME | Codes.EMAIL>;
  value: number | string[];
}

export type Parameter = NecessaryParameter | ParameterWithValue;
