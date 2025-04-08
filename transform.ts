import openapiTS, { SchemaObject, type TransformNodeOptions, type TransformObject, astToString } from 'openapi-typescript';
import fs from "node:fs";
import ts from 'typescript';

const BRAND_TOKEN = 'x-brand';

/**
 * Custom transform function to convert ID fields to opaque types
 */
function transform(
  schemaObject: SchemaObject,
  _options: TransformNodeOptions
): ts.TypeNode | TransformObject | undefined {
  const hasBrandKey = BRAND_TOKEN in schemaObject;
  if (!hasBrandKey) return;

  const brand = schemaObject[BRAND_TOKEN];
  if (!brand) throw new Error('brand cannot be empty');

  const isIncorrectType = !(schemaObject.type === "string" || schemaObject.type === 'number');
  if (isIncorrectType) throw new Error('branded type cannot be applied to types other than \'string\' or \'number\'');

  /** type node for Opaque */
  return {
    schema: ts.factory.createTypeReferenceNode(
      ts.factory.createIdentifier('Opaque'),
      [
        ts.factory.createKeywordTypeNode(
          schemaObject.type === 'string'
            ? ts.SyntaxKind.StringKeyword
            : ts.SyntaxKind.NumberKeyword
        ),
        ts.factory.createLiteralTypeNode(
          ts.factory.createStringLiteral(brand)
        )
      ]
    ),
    questionToken: schemaObject.nullable || !!schemaObject.required
  };
}




async function generateTypes() {

  const ast = await openapiTS(new URL("./schema.yaml", import.meta.url), { transform });
  const utilityTypesImport = 'import { Opaque } from \'./opaque\';\n\n'
  const contents = utilityTypesImport + astToString(ast);

  fs.writeFileSync("./types.ts", contents);
}

generateTypes().catch(console.error);
