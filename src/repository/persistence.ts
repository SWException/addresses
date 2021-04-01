import Address from "src/core/address"

export interface Persistence {
    getAll(user: string): Array<Address>;
    getItem(id: string): Address;
    addItem(item: Address): boolean;
    editItem(item: {[key: string]: any}): boolean;
    deleteItem(id: string): boolean;
}