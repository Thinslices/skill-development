import { useRouter } from "next/router";
import { useCallback } from "react";
import { api } from "../../utils/api";
import type { Study } from "../../utils/types"; 

export const useUpdateStudy = () => {
    const router = useRouter();

    const updateStudy = api.study.update.useMutation( {
        onSuccess: async ( data ) => {
            await router.push( `/studies/${ data.id }` )
        },
    } );

    // id should be required
    return useCallback( ( study: Study, publish?: boolean ) => {
        try {
            updateStudy.mutate( {
                ...study,
                published: publish
            } )
        } catch {

        }
    }, [ updateStudy ] )
}