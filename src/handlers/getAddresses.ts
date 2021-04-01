import { APIGatewayProxyHandler } from 'aws-lambda';
import { Model } from 'src/core/model';
import API_RESPONSES from "src/utils/apiResponses"

// ritorna tutti gli indirizzi di un utente
export const HANDLER: APIGatewayProxyHandler = async (event) => {
    
    // checking for the identity
    const TOKEN = event.headers?.Authorization;
    if (TOKEN == null) {
        return API_RESPONSES._400(null, "error", "missing authentication token");
    }
    
    const MODEL: Model= Model.createModel();
    const ADDRESSES: {[key:string]:any}= MODEL.getAddresses(TOKEN)
    if (ADDRESSES) {
    return API_RESPONSES._200(ADDRESSES, "success");
    }
    return API_RESPONSES._400(null, "success", "this user has no addresses" )
}
