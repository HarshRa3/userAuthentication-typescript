import { instance } from "@/helper/Instance";

export const ApiFetching= async (method:string,api:string,data:any)=>{
    try {

        let response;
        switch (method) {
            case 'GET':
                response = await instance.get(api);
                break;
            case 'POST':
                response = await instance.post(api, data);
                break;
            case 'PUT':
                response = await instance.put(api, data);
                break;
            case 'DELETE':
                response = await instance.delete(api);
                break;
            default:
                throw new Error('Unsupported HTTP method');
            }

        return response;
    } catch (error) {
        return error;
    }
}