import { Users } from "src/repository/users";

export class UsersMock implements Users {
    public async checkUser(token: string): Promise<string> {
        if (token) 
            return "pippo";
        throw new Error();
    }
}