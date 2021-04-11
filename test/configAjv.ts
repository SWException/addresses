import response from 'schemas/response.json';
import addresses from 'schemas/addresses.json';
import { JSONSchema7 } from 'json-schema';

export const SCHEMAS = {
    schemas: [response as JSONSchema7, addresses as JSONSchema7],
    strict: false
};

export function setFormats (ajv): void {
    ajv.addFormat("float", {
        type: "number",
        validate: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/
    });

    ajv.addFormat("int64", { type: "number", validate: /^\d+$/ });
    ajv.addFormat("uri", { type: "string" });
}