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

    public async getItem (ADDRESS_ID: string): Promise<Address> {
        console.log(ADDRESS_ID);
        // TODO for DynamoDB Engineer: CONTROLLARE CHE FUNZIONI
        const PARAMS = {
            TableName: Dynamo.TABLE_NAME,
            IndexName: "id-index",
            KeyConditionExpression: "id = :order",
            ExpressionAttributeValues: {
                ":order": ADDRESS_ID
            },
        };

        const DATA = await Dynamo.DOCUMENT_CLIENT.query(PARAMS).promise();
        return new Address(DATA.Items.pop());
    }

    public async addItem (ITEM: Address): Promise<boolean> {
        console.log(ITEM);
        // TODO for DynamoDB Engineer: CONTROLLARE CHE FUNZIONI
        const PARAMS = {
            TableName: Dynamo.TABLE_NAME,
            Key: {
                userid: ITEM.getUser(),
                id: ITEM.getId()
            },
            Item: {
                description: ITEM.getDescription(),
                recipientName: ITEM.getRecipientName(),
                recipientSurname: ITEM.getRecipientSurname(),
                address: ITEM.getAddress(),
                city: ITEM.getCity(),
                code: ITEM.getCode(),
                district: ITEM.getDistrict(),

            }
        };

        const DATA = await Dynamo.DOCUMENT_CLIENT.put(PARAMS)
            .promise()
            .catch((err) => {
                console.error("createOrder", err);
                return false;
            });

        return (DATA) ? true : false;
    }

    public async editItem (ITEM: {[key: string]: any}): Promise<boolean> {
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

        const OLD_ITEM = await this.getItem(ITEM.id);

        const PARAMS = {
            TableName: Dynamo.TABLE_NAME,
            Key: {
                userid: OLD_ITEM.getUser(),
                id: OLD_ITEM.getId()
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

    public async deleteItem (id: string): Promise<boolean> {
        const PARAMS = {
            Key: {
                id: id
            },
            TableName: Dynamo.TABLE_NAME,
            IndexName: "id-index"
        };

       await Dynamo.DOCUMENT_CLIENT.delete(PARAMS).promise().catch(
            (err) => { return err; }
        );
        return true;;      
    }

}
