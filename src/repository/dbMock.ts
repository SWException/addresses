import Address from "src/core/address";
import { Persistence } from "./persistence";
//TODO
export class DbMock implements Persistence {
    private static readonly TAX1 = new Tax("1", 22, "standard");
    private static readonly TAX2 = new Tax("2", 10, "food & beverage");
    private static readonly TAX3 = new Tax("3", 4, "primary necessity");

    getAll (): Array<Address> {
        return [DbMock.TAX1, DbMock.TAX2, DbMock.TAX3];
    }
    getItem (id: string): Address {
        return DbMock.TAX1;
    }
    addItem (item: Address): boolean {
        return true;
    }
    editItem (item: Address): boolean {
        return true;
    }
    deleteItem (id: string): boolean {
        return true;
    }

}