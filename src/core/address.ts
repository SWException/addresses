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
        this.id = uuidv4();
        this.description = data.description;
        this.recipientName = data.recipientName;
        this.recipientSurname = data.recipientSurname;
        this.address = data.address;
        this.city = data.city;
        this.code = data.code;
        this.district = data.district;
    }
}