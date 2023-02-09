import { useRouter } from "next/router";
import { useCallback } from "react";
import { api } from "../../utils/api";
import type { Study } from "../../utils/types"; 

export const useCreateStudy = () => {
    const router = useRouter();

    const createStudy = api.study.create.useMutation( {
        onSuccess: async ( data ) => {
            await router.push( `/studies/${ data.id }` )
        },
    } );

    return useCallback( ( study: Omit<Study, 'id'>, publish?: boolean ) => {
        try {
            createStudy.mutate( {
                ...study,
                published: publish
            } )
        } catch {
            
        }
    }, [ createStudy ] )
}