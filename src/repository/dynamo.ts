import Address from "src/core/address";
import { Persistence } from "src/repository/persistence"
import * as AWS from "aws-sdk";

export class Dynamo implements Persistence {
    private static readonly TABLE_NAME = "addresses";
    private static readonly DOCUMENT_CLIENT = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

    public async getAll (USER: string): Promise<Array<Address>> {
        console.log(USER);
        // TODO for DynamoDB Engineer: CONTROLLARE CHE FUNZIONI
        // NB: this function have to return all the addresses of the given user
        const PARAMS = {
            KeyConditionExpression: 'userid = :username',
            ExpressionAttributeValues: {
                ":username": USER
            },
            TableName: Dynamo.TABLE_NAME,
            ScanIndexForward: false
        };

        const DATA = await Dynamo.DOCUMENT_CLIENT.query(PARAMS).promise();
        const ADDRESSES = DATA.Items.map((add)=> new Address(add));
        return ADDRESSES;;
    }

    public async getItem (USER: string, ADDRESS_ID: string): Promise<Address> {
        console.log("getItem in dynamo:" + ADDRESS_ID);
        // TODO for DynamoDB Engineer: CONTROLLARE CHE FUNZIONI
        const PARAMS = {
            Key: {
                "userid": USER,
                "id": ADDRESS_ID
            },
            TableName: Dynamo.TABLE_NAME
        };

        console.log("PARAMS:", PARAMS);
        
        const DATA = await Dynamo.DOCUMENT_CLIENT.get(PARAMS).promise();
        console.log("getItem response:", DATA.Item);
        if(DATA.Item)
            return new Address(DATA.Item);
        throw new Error("No item with id " + ADDRESS_ID + " for user " + USER);
    }

    public async addItem (USER: string, ITEM: Address): Promise<boolean> {
        console.log(ITEM);
        console.log(USER);
        
        // TODO for DynamoDB Engineer: CONTROLLARE CHE FUNZIONI
        const PARAMS = {
            TableName: Dynamo.TABLE_NAME,
            Item: {
                userid: USER,
                id: "" + ITEM.getId(),
                description: ITEM.getDescription(),
                recipientName: ITEM.getRecipientName(),
                recipientSurname: ITEM.getRecipientSurname(),
                address: ITEM.getAddress(),
                city: ITEM.getCity(),
                code: ITEM.getCode(),
                district: ITEM.getDistrict(),
            }
        };
        console.log(PARAMS);
        

        const DATA = await Dynamo.DOCUMENT_CLIENT.put(PARAMS)
            .promise()

        return (DATA) ? true : false;
    }

    public async editItem (USER: string, ITEM: {[key: string]: any}): Promise<boolean> {
        console.log(ITEM);
        // TODO for DynamoDB Engineer: CONTROLLARE CHE FUNZIONI
        const VALUES = {};
        let expression = "SET ";
        let first = true;

        Object.keys(ITEM).forEach(function (key) {
            if (key != "id") {
                const VALUE = ITEM[key];
                if (!first) {
                    expression += ", "
                } 
                else {
                    first = false;
                }
                expression += key + " = :" + key;
                VALUES[":" + key] = VALUE;
            }
        });

        const PARAMS = {
            TableName: Dynamo.TABLE_NAME,
            Key: {
                userid: USER,
                id: ITEM.getId()
            },
            UpdateExpression: expression,
            ExpressionAttributeValues: VALUES
        }
        console.log(PARAMS);

        const DATA = await Dynamo.DOCUMENT_CLIENT.update(PARAMS).promise().then(() => true).catch(
            (err) => { console.error(err);
             return false; }
        );
        return DATA;
    }

    public async deleteItem(USER: string, id: string): Promise<boolean> {
        const PARAMS = {
            Key: {
                userid: USER,
                id: id
            },
            TableName: Dynamo.TABLE_NAME
        };

        await Dynamo.DOCUMENT_CLIENT.delete(PARAMS).promise().catch(
            () => { return false; }
        );
        return true;;
    }

}
