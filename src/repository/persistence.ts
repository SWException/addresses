import Address from "src/core/address"

export interface Persistence {
    getAll(user: string): Promise<Array<Address>>;
    getItem(id: string): Promise<Address>;
    addItem(item: Address): Promise<boolean>;
    editItem(item: {[key: string]: any}): Promise<boolean>;
    deleteItem(id: string): Promise<boolean>;
}