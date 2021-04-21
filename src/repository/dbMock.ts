import Address from "src/core/address";
import { Persistence } from "src/repository/persistence";
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

    public async getAll (user:string): Promise<Array<Address>> {
        return user? [DbMock.ADDRESS1, DbMock.ADDRESS2, DbMock.ADDRESS3] : null;
    }
    public async getItem (user:string, id: string): Promise<Address> {
        return id && user? DbMock.ADDRESS1: null;
    }
    public async addItem (user:string, item: Address): Promise<boolean> {
        return item && user? true: false;
    }
    public async editItem (user: string, item: Address): Promise<boolean> {
        return item && user? true : false;
    }
    public async deleteItem (user: string, id: string): Promise<boolean> {
        return id && user? true : false;
    }

}