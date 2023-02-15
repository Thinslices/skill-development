import { api } from "../../utils/api";
import type { Role } from "@prisma/client";

export const useUserRole: ( id: string ) => Role = ( id ) => {
    const { data } = api.user.get.useQuery( { id }, {
        enabled: !! id
    } );

    return data?.role === "ADMIN" ? "ADMIN" : "USER";
}