import { Persistence } from "src/repository/persistence"
import { Dynamo } from "src/repository/dynamo"
import Address from "./address";
import { DbMock } from "src/repository/dbMock";
import { Users } from "src/repository/users";
import { UsersService } from "src/repository/usersService";
import { UsersMock } from "src/repository/usersMock";

export class Model {
    private readonly DATABASE: Persistence;
    private readonly USERS: Users;
    
    private constructor (db: Persistence,  users: Users) {
        this.DATABASE = db;
        this.USERS = users;
    }

    public static createModel (): Model {
        return new Model(new Dynamo(), new UsersService());
        
    }

    public static createModelMock (): Model {
        return new Model(new DbMock(), new UsersMock());
    } 

    /**
     * add an address to the db
     * @param data the data of the address to add 
     * @returns the result of the operation
     */
    public async createAddress (data: {[key:string]: any}, token: string ): Promise<boolean> {
        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }
        let result = false;
        if(data) {
            const ADDRESS = new Address(data);
            result = await this.DATABASE.addItem(ADDRESS);
        }
        return result;
    }

    /**
     * 
     * @param user the id of the user
     * @returns the addresses of the user with the given id
     */
    public async getAddresses (token: string): Promise<JSON> {
        const USER = await this.USERS.checkUser(token);
        const ADDRESSES: Array<Address> = await this.DATABASE.getAll(USER);
        if(ADDRESSES == null)
            return null;
        return JSON.parse(JSON.stringify(ADDRESSES));
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
    public async deleteAddress (id: string, token: string): Promise<boolean> { 
        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }
        if(!id){
            return false;
        }
        return this.DATABASE.deleteItem(id);
    }

    /**
     * 
     * @param id the id of the product to modify
     * @param data the data to modify
     * @returns the result of the operation
     */
    public async updateAddress (token: string, data: JSON): Promise<boolean> {
        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }
        if(!data)
            return false;
        return this.DATABASE.editItem(data);
    }
}