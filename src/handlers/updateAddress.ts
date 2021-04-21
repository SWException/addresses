import { APIGatewayProxyHandler } from 'aws-lambda';
import { Model } from 'src/core/model';
import API_RESPONSES from "src/utils/apiResponses"


export const HANDLER: APIGatewayProxyHandler = async (event) => {
    
    // checking for the identity
    const TOKEN = event.headers?.Authorization;
    if (TOKEN == null) {
        return API_RESPONSES._400(null, "error", "missing authentication token");
    }
    
    const ADDRESS = JSON.parse(event?.body);
    
    const MODEL: Model = Model.createModel();
    return await MODEL.updateAddress(TOKEN, ADDRESS)
        .then(RESULT => {
            if (RESULT)
                return API_RESPONSES._200(null, "success", "the address has been updated");
            return API_RESPONSES._400(null, "error", "the address has not been updated");
        })
        .catch((err: Error) => {
            return API_RESPONSES._400(null, "error", err.message);
        });
}
