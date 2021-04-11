import { matchersWithOptions } from 'jest-json-schema';
import { JSONSchema7 } from "json-schema";
import { Model } from 'src/core/model';
import { SCHEMAS, setFormats } from 'test/configAjv';

expect.extend(matchersWithOptions(SCHEMAS, (ajv) => setFormats(ajv)));

const MODEL = Model.createModelMock();

const ADDRESS_SCHEMA: JSONSchema7 = {
    $ref: "schemas/addresses.json#/address"
};
const ADDRESSES_SCHEMA: JSONSchema7 = {
    $ref: "schemas/addresses.json#/addresses"
};

test('schema', () => {
    expect(ADDRESS_SCHEMA).toBeValidSchema();
    expect(ADDRESSES_SCHEMA).toBeValidSchema();
});

test('get Address', async () => {
    const RES = await MODEL.getAddress("1");
    expect(RES).toMatchSchema(ADDRESS_SCHEMA);
});