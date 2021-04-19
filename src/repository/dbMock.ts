import Address from "src/core/address";
import { Persistence } from "./persistence";
//TODO
export class DbMock implements Persistence {
    private static readonly ADDRESS1 = new Address({id:"1", 
        userid: "pippo", 
        description: "home", 
        recipientName: "pippo", 
        recipientSurname: "pippo", 
        address: "Via dei Pioppi 1", 
        city: "Topolinia",
        code: 6969, 
        district: "RO"});
    private static readonly ADDRESS2 = new Address({id:"2", 
        userid: "paperino", 
        description: "home", 
        recipientName: "paolino", 
        recipientSurname: "paperino", 
        address: "Via dei Salici 69", 
        city: "Paperopoli",
        code: 113, 
        district: "TV"});
    private static readonly ADDRESS3 = new Address({id:"3", 
        userid: "topolino", 
        description: "home", 
        recipientName: "mickey", 
        recipientSurname: "mouse", 
        address: "Via dei Platani 9", 
        city: "Topolinia",
        code: 1188, 
        district: "PD"});

    public async getAll (): Promise<Array<Address>> {
        return [DbMock.ADDRESS1, DbMock.ADDRESS2, DbMock.ADDRESS3];
    }
    public async getItem (id: string): Promise<Address> {
        return id? DbMock.ADDRESS1: null;
    }
    public async addItem (item: Address): Promise<boolean> {
        return item? true: false;
    }
    public async editItem (item: Address): Promise<boolean> {
        return item? true : false;
    }
    public async deleteItem (id: string): Promise<boolean> {
        return id? true : false;
    }

}