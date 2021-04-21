export interface Users {
    checkUser (token: string): Promise<string>
}

