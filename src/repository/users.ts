export interface Users {
    checkVendor(token: string): Promise<boolean>
    checkUser (token: string): Promise<string>
}

