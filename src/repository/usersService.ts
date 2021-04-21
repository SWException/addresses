import fetch from "node-fetch";
import { Users } from "src/repository/users";

export class UsersService implements Users {
    public async checkUser (token: string): Promise<string> {
        return await fetch(process.env.SERVICES + `/users/customers/check/${token}`)
            .then(res => res.json())
            .then((response) => {
                if(response.status == "success")
                    return response.data.username;
                throw new Error(response.message);
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

}