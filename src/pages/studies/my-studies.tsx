import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { Authorize, Header, StudyTable, Wrapper } from "../../components";
import { useLoader } from "../../hooks";
import { api } from "../../utils/api";

const useMyStudies = () => {
    const { data: sessionData } = useSession();

    const query = api.study.getUserStudies.useQuery( {
        id: sessionData?.user?.id as string,
    } );

    const studies = (query?.data ?? []).map( study => {
        const isDraft = ! study.published;
        const newTitle = isDraft ? `${ study.title } (Draft)` : study.title;

        return {
            ...study,
            title: newTitle
        }
    } );

    return studies;
}

const useMyStudiesActions = () => {

    const utils = api.useContext();
    const { start, stop } = useLoader();
    const deleteStudy = api.study.delete.useMutation( {
        onSuccess: async () => {
            await utils.study.getUserStudies.invalidate();
        },
        onSettled: () => {
            stop();
        }
    } );

    const actions = {
        view: true,
        edit: true,
        onDeleteClick: ( id: string ) => {
            start();
            try {
                deleteStudy.mutate( { id } );
            } catch {
                stop();
            }
        }
    };

    return actions;
}

const MyStudies: NextPage = () => {
    const studies = useMyStudies();
    const actions = useMyStudiesActions();

    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Authorize>
                    <h1 className="h1 mb-12">My studies</h1>
                    <StudyTable data={ studies } actions={ actions } />
                </Authorize>
            </Wrapper>
        </>
    );
};

export default MyStudies;
