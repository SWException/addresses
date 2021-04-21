import Address from "src/core/address"

export interface Persistence {
    getAll(user: string): Promise<Array<Address>>;
    getItem(user: string, id: string): Promise<Address>;
    addItem(user: string, item: Address): Promise<boolean>;
    editItem(user: string, item: {[key: string]: any}): Promise<boolean>;
    deleteItem(user: string, id: string): Promise<boolean>;
}