import { APIGatewayProxyHandler } from 'aws-lambda';
import { Model } from 'src/core/model';
import response from 'src/utils/apiResponses';

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    
    // checking for the identity
    const TOKEN = event.headers?.Authorization;
    if (TOKEN == null) {
        return response(400, "missing auth");
    }
    
    const ADDRESS = JSON.parse(event?.body);

    const MODEL: Model = Model.createModel();
    return await MODEL.createAddress(ADDRESS, TOKEN)
        .then((result: string) =>
            result ? response(200, "success", {id: result}) : response(400, "error"))
        .catch((err: Error) => response(400, err.message));
}
