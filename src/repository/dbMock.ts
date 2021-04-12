import Address from "src/core/address";
import { Persistence } from "./persistence";
//TODO
export class DbMock implements Persistence {
    private static readonly ADDRESS1 = new Address({id:"1", 
        user: "pippo", 
        description: "home", 
        recipientName: "pippo", 
        recipientSurname: "pippo", 
        address: "Via dei Pioppi 1", 
        city: "Topolinia",
        code: 6969, 
        district: "RO"});
    private static readonly ADDRESS2 = new Address({id:"2", 
        user: "paperino", 
        description: "home", 
        recipientName: "paolino", 
        recipientSurname: "paperino", 
        address: "Via dei Salici 69", 
        city: "Paperopoli",
        code: 113, 
        district: "TV"});
    private static readonly ADDRESS3 = new Address({id:"3", 
        user: "topolino", 
        description: "home", 
        recipientName: "mickey", 
        recipientSurname: "mouse", 
        address: "Via dei Platani 9", 
        city: "Topolinia",
        code: 1188, 
        district: "PD"});

    getAll (): Array<Address> {
        return [DbMock.ADDRESS1, DbMock.ADDRESS2, DbMock.ADDRESS3];
    }
    getItem (id: string): Address {
        return id? DbMock.ADDRESS1: null;
    }
    addItem (item: Address): boolean {
        return item? true: false;
    }
    editItem (item: Address): boolean {
        return item? true : false;
    }
    deleteItem (id: string): boolean {
        return id? true : false;
    }

}