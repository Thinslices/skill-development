import { api } from "../../utils/api";

export const useUserStudies = ( id: string ) => {

    const query = api.study.getUserStudies.useQuery( {
        id: id,
    }, {
        enabled: !! id
    } );

    return query?.data ?? [];
}
