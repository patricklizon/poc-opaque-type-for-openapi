/**
 * GENERATED CODE - DO NOT MODIFY
 * 
 * This file uses a custom JSON Schema dialect with the {org} brand vocabulary.
 * See {dialect-url} for details.
 */

export interface paths {
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new user */
        post: operations["OperationUserCreate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{userId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user by ID */
        get: operations["getUserById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * UserIdentifier
         * Format: uuid
         * @description Unique identifier for a user account
         */
        UserId: Opaque<string, "user-id">;
        /** Format: email */
        Email: Opaque<string, "email">;
        /** Format: date-time */
        ISODate: Opaque<string, "iso-date">;
        /** Format: password */
        PasswordPlainText: Opaque<string, "password-plain-text">;
        User: {
            id: components["schemas"]["UserId"];
            email: components["schemas"]["Email"];
            createdAt: components["schemas"]["ISODate"];
            name: string;
        } & {
            [key: string]: unknown;
        };
        OperationUserCreatePayload: {
            email: components["schemas"]["Email"];
            name?: string;
            password: components["schemas"]["PasswordPlainText"];
        } & {
            [key: string]: unknown;
        };
        ErrorInvalidInput: {
            /** Format: int32 */
            code: number;
            message: string;
        } & {
            [key: string]: unknown;
        };
        ErrorUserNotFound: {
            /** Format: int32 */
            code: number;
            message: string;
        } & {
            [key: string]: unknown;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    OperationUserCreate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OperationUserCreatePayload"];
            };
        };
        responses: {
            /** @description User created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorInvalidInput"];
                };
            };
        };
    };
    getUserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: components["schemas"]["UserId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorUserNotFound"];
                };
            };
        };
    };
}
