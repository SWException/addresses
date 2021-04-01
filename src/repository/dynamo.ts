import Address from "src/core/address";
import { Persistence } from "src/repository/persistence"

export class Dynamo implements Persistence {
    private static readonly ADDRESSES_TABLE = "addresses";

    getAll (user: string): Array<Address> {
        // TO-DO for DynamoDB Engineer
        // NB: this function have to return all the addresses of  the given user
        return null;
    }

    getItem (id: string): Address {
        // TO-DO for DynamoDB Engineer
        return null;
    }

    addItem (item: Address): boolean {
        // TO-DO for DynamoDB Engineer
        return false;
    }

    editItem (item: Address): boolean {
        // TO-DO for DynamoDB Engineer
        return false;
    }
    deleteItem (id: string): boolean {
        // TO-DO for DynamoDB Engineer
        return false;
    }

}