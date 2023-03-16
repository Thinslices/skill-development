import { useRouter } from "next/router";
import { useCallback } from "react";
import { useLoader } from "..";
import { api } from "../../utils/api";
import type { Study } from "../../utils/types";

export const useUpdateStudy = () => {
    const router = useRouter();
    const { start, stop } = useLoader();
    
    const updateStudy = api.study.update.useMutation( {
        onSuccess: async ( data ) => {
            await router.push( `/studies/${ data.id }` )
        },
        onSettled: () => {
            stop();
        }
    } );

    // id should be required
    return useCallback( ( study: Study, publish?: boolean ) => {
        start();
        try {
            updateStudy.mutate( {
                ...study,
                published: publish
            } )
        } catch {
            stop();
        }
    }, [ updateStudy ] )
}
