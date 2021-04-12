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

test('get addresses', async () => {
    const RES = await MODEL.getAddresses("token");
    expect(RES).toMatchSchema(ADDRESSES_SCHEMA);
});

test('create address', async () => {
    const ADDR= await MODEL.getAddress("1");
    const RES = await MODEL.createAddress(ADDR, "token");
    expect(RES).toBe(true);
});

test('error create address', async () => {
    const RES = await MODEL.createAddress(null, "token");
    expect(RES).toBe(false);
});

test('error create address no token passed', async () => {
    const ADDR= await MODEL.getAddress("1");
    function test (){
        return MODEL.createAddress(ADDR, null);
    }
    await expect(test).rejects.toThrow(Error);
});

test('update address', async () => {
    const ADDR = MODEL.getAddress("2")
    const RES = await MODEL.updateAddress("token", ADDR);
    expect(RES).toBe(true);
});

test('error update address', async () => {
    const RES = await MODEL.updateAddress("token", null);
    expect(RES).toBe(false);
});

test('error update address no token', async () => {
    const ADDR = MODEL.getAddress("2")
    function test (){
        return MODEL.updateAddress(null, ADDR);
    }
    await expect(test).rejects.toThrow(Error);
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
    function test (){
        return MODEL.deleteAddress("1", null);
    }
    await expect(test).rejects.toThrow(Error);
});