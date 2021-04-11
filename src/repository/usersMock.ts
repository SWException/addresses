import { Users } from "./users";

export class UsersMock implements Users {

    public async checkUser(token: string): Promise<string> {
        return token ? "pippo" : null;
    }
    public async checkVendor(token: string): Promise<boolean> {
        return token ? true : false;
    }  
}