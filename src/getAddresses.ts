import { APIGatewayProxyHandler } from 'aws-lambda';
import API_RESPONSES from "src/utils/apiResponses"
import { getTokenFromEvent } from "src/utils/checkJWT";
import Address from 'src/Address';

// ritorna tutti gli indirizzi di un utente
export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN = getTokenFromEvent(event);
    if(TOKEN == null){
        return API_RESPONSES._400(null, "error", "manca TOKEN");
    }
    return API_RESPONSES._200(null, "success");
    // to-do: chiamata a microservizio users

    /*const USER: User = await User.createUser(TOKEN);
    if (USER && USER.isAuthenticate() && USER.isClient()) {
        const ADDRESSES: JSON =
        await Address.getAllAddresses(USER.getUsername());
        return API_RESPONSES._200(ADDRESSES);
    }
    else {
        return API_RESPONSES._400(null, "error",
            "TOKEN non valido o scaduto");
    }*/
}