import openapiTS, { SchemaObject, type TransformNodeOptions, type TransformObject, astToString } from 'openapi-typescript';
import fs from "node:fs";
import ts from 'typescript';
import path from 'node:path';

const BRAND_TOKEN = 'x-brand';

/**
 * Custom transform function to convert ID fields to opaque types
 */
function transform(
	schemaObject: SchemaObject,
	_options: TransformNodeOptions
): ts.TypeNode | TransformObject | undefined {
	console.log(schemaObject)
	const hasBrandKey = BRAND_TOKEN in schemaObject;
	if (!hasBrandKey) return;

	const brand = schemaObject[BRAND_TOKEN];
	if (brand === undefined) return;
	if (typeof brand !== 'string') throw new Error('brand must be defined as a string');
	if (!brand) throw new Error('brand cannot be empty');

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
	// Add support for custom dialect
	const ast = await openapiTS(new URL("../input/schema.yaml", import.meta.url), {
		transform,
		additionalProperties: true
	});

	const warningComment =
		'/**\n' +
		' * GENERATED CODE - DO NOT MODIFY\n' +
		' * \n' +
		' * This file uses a custom JSON Schema dialect with the {org} brand vocabulary.\n' +
		' * See {dialect-url} for details.\n' +
		' */\n\n';
	const contents = astToString(ast);

	fs.writeFileSync(path.join(__dirname, "../output/", "types.ts"), warningComment + contents);
}

generateTypes().catch(console.error);
