import { Opaque } from './opaque';

export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** Format: uuid */
    UserId: Opaque<string, "user-id">;
    User: {
      id: components["schemas"]["UserId"];
      name: string;
    };
    TupleType: components["schemas"]["UserId"][];
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
