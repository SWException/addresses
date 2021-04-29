import { APIGatewayProxyHandler } from 'aws-lambda';
import { Model } from 'src/core/model';
import response from 'src/utils/apiResponses';

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    
    // checking for the identity
    const TOKEN = event.headers?.Authorization;
    if (TOKEN == null) {
        return response(400, "missing auth");
    }
    const ADDRESS_ID = event.pathParameters?.id;
    
    const MODEL: Model = Model.createModel();
    return await MODEL.deleteAddress(ADDRESS_ID, TOKEN)
        .then((result: boolean) =>
            result ? response(200, "success") : response(400, "error"))
        .catch((err: Error) => response(400, err.message));
}
