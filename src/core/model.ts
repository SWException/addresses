import { Persistence } from "src/repository/persistence"
import { Dynamo } from "src/repository/dynamo"
import Address from "./address";
import { DbMock } from "src/repository/dbMock";

export class Model {
    private readonly DATABASE: Persistence;
    
    private constructor (db: Persistence) {
        this.DATABASE = db;
    }

    public static createModel (): Model {
        return new Model(new Dynamo());
    }

    public static createModelMock (): Model {
        return new Model(new DbMock());
    } 

    /**
     * add an address to the db
     * @param data the data of the address to add 
     * @returns the result of the operation
     */
    public createAddress (data: {[key:string]: any} ): boolean {
        let result = false;
        if(data) {
            const ADDRESS = new Address(data);
            result = this.DATABASE.addItem(ADDRESS);
        }
        return result;
    }

    /**
     * 
     * @param user the id of the user
     * @returns the addresses of the user with the given id
     */
    public getAddresses (user: string): JSON {
        const ADDRESSES: Array<Address> = this.DATABASE.getAll(user);
        if(ADDRESSES == null)
            return null;
        
        const OBJ = [];
        ADDRESSES.forEach(item => {
            OBJ.push(item)
            });
        return JSON.parse(JSON.stringify(OBJ));
    }

    /**
     * 
     * @param id the id of the address
     * @returns the address with the given id
     */
    public getAddress (id: string): JSON {
        const ADDRESS = this.DATABASE.getItem(id);
        return JSON.parse(JSON.stringify(ADDRESS));
    }

    /**
     * 
     * @param id the id of the address to delete
     * @returns the result of the operation
     */
    public deleteAddress (id: string): boolean {
        return this.DATABASE.deleteItem(id);
    }

    /**
     * 
     * @param id the id of the product to modify
     * @param data the data to modify
     * @returns the result of the operation
     */
    public updateAddress (data: JSON): boolean {
        if(!data)
            return false;
        return this.DATABASE.editItem(data);
    }
}