type Opaque<T extends string | number, B extends string> = T & { readonly __brand: B }
