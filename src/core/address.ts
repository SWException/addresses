import {v4 as uuidv4} from 'uuid';

export default class Address {

    private readonly id: string;
    private readonly user: string;
    private readonly description: string;
    private readonly recipientName: string;
    private readonly recipientSurname: string;
    private readonly address: string;
    private readonly city: string;
    private readonly code: number;
    private readonly district: string;

    constructor (data: {[key:string]: any}) {
        if(data?.userid)
            this.user = data.userid;
        
        if(data?.id)
            this.id = data.id;
        else
            this.id = uuidv4();
        
        this.description = data.description;
        this.recipientName = data.recipientName;
        this.recipientSurname = data.recipientSurname;
        this.address = data.address;
        this.city = data.city;
        this.code = data.code;
        this.district = data.district;
    }

    public getId (): string {
        return this.id;
    }
    public getUser (): string{
        return this.user;
    }
    public getDescription (): string {
        return this.description;
    }
    public getRecipientName (): string{
        return this.recipientName;
    }
    public getRecipientSurname (): string {
        return this.recipientSurname;
    }
    public getAddress (): string {
        return this.address;
    }
    public getCity (): string {
        return this.city;
    }
    public getCode (): number {
        return this.code;
    }
    public getDistrict (): string {
        return this.district;
    }
    
}