import { Persistence } from "src/repository/persistence"
import { Dynamo } from "src/repository/dynamo"
import Address from "src/core/address";
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
        const USER = await this.USERS.checkUser(token);
        console.log("User: ", USER);
        
        if(data) {
            const ADDRESS = new Address(data);
            return await this.DATABASE.addItem(USER, ADDRESS);
        }
        return false;
    }

    /**
     * 
     * @param user the id of the user
     * @returns the addresses of the user with the given id
     */
    public async getAddresses (token: string): Promise<any> {
        const USER = await this.USERS.checkUser(token);
        const ADDRESSES: Array<Address> = await this.DATABASE.getAll(USER);
        if(ADDRESSES)
            return ADDRESSES;
        return null;
    }

    /**
     * 
     * @param id the id of the address
     * @returns the address with the given id
     */
    public async getAddress (id: string, token: string): Promise<any> {
        const USER = await this.USERS.checkUser(token);
        console.log("User: " + USER);
        return this.DATABASE.getItem(USER, id);
    }

    /**
     * 
     * @param id the id of the address to delete
     * @returns the result of the operation
     */
    public async deleteAddress (id: string, token: string): Promise<boolean> { 
        const USER = await this.USERS.checkUser(token);
        if(id && USER)
            return this.DATABASE.deleteItem(USER, id);
        return false;
    }

    /**
     * 
     * @param id the id of the product to modify
     * @param data the data to modify
     * @returns the result of the operation
     */
    public async updateAddress (token: string, data: JSON): Promise<boolean> {
        const USER = await this.USERS.checkUser(token);
        if(data && USER)
            return this.DATABASE.editItem(USER, data);
        return false;
    }
}