import { useRouter } from "next/router";
import { useCallback } from "react";
import { api } from "../../utils/api";
import type { Study } from "../../utils/types"; 
import { useLoader } from "../useLoader/useLoader";

export const useCreateStudy = () => {
    const router = useRouter();
    const { start, stop } = useLoader();

    const createStudy = api.study.create.useMutation( {
        onSuccess: async ( data ) => {
            stop();
            await router.push( `/studies/${ data.id }` )
        },
    } );

    return useCallback( ( study: Omit<Study, 'id'>, publish?: boolean ) => {
        start();
        try {
            createStudy.mutate( {
                ...study,
                published: publish
            } )
        } catch {
            stop();
        }
    }, [createStudy, start, stop] )
}