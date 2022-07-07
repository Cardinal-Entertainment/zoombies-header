import {Client} from "@heroiclabs/nakama-js"

let nakamaClient;
(async () => {

    const email = "ryanpricelondon@gmail.com";
    const username = "priceman614"
    const password = "12345678";
    const create = true;



    //Now try to authenticate
    try {
        nakamaClient = new Client(process.env.REACT_APP_NAKAMA_SERVER_KEY, "cryptoz.cards", 7350);
        //nakamaClient = new Client("defaultkey", "127.0.0.1", 7350);
        console.log("nakama client:",nakamaClient);     
        const session = await nakamaClient.authenticateEmail(email, password, create, username);
        console.info("Successfully authenticated:", session);
    }
    catch(err){
        console.error("ERROR auth email", err.statusCode, err.message);
    }


})();

export default nakamaClient;