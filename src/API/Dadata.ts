import type { DaDataApi } from "dadata-api";
import axios from 'axios'

const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
const token = "a88bd145b3272ed1e6876a27d2d592d8bb473865";

type Response = DaDataApi.Suggestion<DaDataApi.Party>;

export const getOrganizationInfo = async (inn: number): Promise<Response | undefined> => {
    const response = await axios.post(url, {
        query: inn.toString(),
        branch_type: "MAIN"
    }, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token 
        }
    });

    const data = response.data.suggestions as Response[];

    if(!data) {
        return;
    }
    return data[0];
}