import { APIGatewayProxyHandler } from 'aws-lambda';
import { Model } from 'src/core/model';
import API_RESPONSES from "src/utils/apiResponses"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    
    // checking for the identity
    const TOKEN = event.headers?.Authorization;
    if (TOKEN == null) {
        return API_RESPONSES._400(null, "error", "missing authentication token");
    }
    const ADDRESS_ID = event.pathParameters?.id;
    
    const MODEL: Model = Model.createModel();
    return await MODEL.getAddress(ADDRESS_ID, TOKEN)
        .then((ADDRESS) => {
            if (ADDRESS)
                return API_RESPONSES._200(ADDRESS, "success");
            return API_RESPONSES._400(null, "error", "the address with this id doesn't exist");
        })
        .catch((err:Error) => {
            return API_RESPONSES._400(null, "error", err.message);
        });
}
