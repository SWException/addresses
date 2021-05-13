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
    const RES = await MODEL.getAddress("1", "token");
    expect(RES).toMatchSchema(ADDRESS_SCHEMA);
});

test('get addresses', async () => {
    const RES = await MODEL.getAddresses("token");
    expect(RES).toMatchSchema(ADDRESSES_SCHEMA);
});

test('create address', async () => {
    const ADDR= await MODEL.getAddress("1", "token");
    const RES = await MODEL.createAddress(ADDR, "token");
    expect(RES).not.toBe(false);
});

test('error create address', async () => {
    await expect(MODEL.createAddress(null, "token"))
        .rejects.toThrow(Error);
});

test('error create address no token passed', async () => {
    const ADDR= await MODEL.getAddress("1", "token");
    await expect(MODEL.createAddress(ADDR, null))
        .rejects.toThrow(Error);
});

test('update address', async () => {
    const ADDR = await MODEL.getAddress("2", "token")
    const RES = await MODEL.updateAddress("token", ADDR);
    expect(RES).toBe(true);
});

test('error update address', async () => {
    const RES = await MODEL.updateAddress("token", null);
    expect(RES).toBe(false);
});

test('error update address no token', async () => {
    const ADDR = await MODEL.getAddress("2", "token");
    await expect(MODEL.updateAddress(null, ADDR))
        .rejects.toThrow(Error);
});

test('delete address', async () => {
    const RES = await MODEL.deleteAddress("1", "token");
    expect(RES).toBe(true);
});

test('error delete address', async () => {
    const RES = await MODEL.deleteAddress(null, "token");
    expect(RES).toBe(false);
});

test('error delete address no token', async () => {
    await expect(MODEL.deleteAddress("1", null))
        .rejects.toThrow(Error);
});