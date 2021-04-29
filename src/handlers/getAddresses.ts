import { APIGatewayProxyHandler } from 'aws-lambda';
import { Model } from 'src/core/model';
import response from "src/utils/apiResponses"

// ritorna tutti gli indirizzi di un utente
export const HANDLER: APIGatewayProxyHandler = async (event) => {
    
    // checking for the identity
    const TOKEN = event.headers?.Authorization;
    if (TOKEN == null) {
        return response(400, "missing auth");
    }
    
    const MODEL: Model = Model.createModel();
    return await MODEL.getAddresses(TOKEN)
        .then((addresses: Array<any>) =>
            addresses ? response(200, "success", addresses) : response(400, "not found"))
        .catch((err: Error) => response(400, err.message));
}
