import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

import { Authorize, Header, StudyTable, Wrapper } from "../../components";
import { api } from "../../utils/api";

const Studies = () => {
    const { data: sessionData } = useSession();
 
    const query = api.study.getUserStudies.useQuery( {
        id: sessionData?.user?.id as string,
    }, {
        enabled: !! sessionData?.user?.id
    } );

    const studies = (query?.data ?? []).map( study => {
        const isDraft = ! study.published;
        const newTitle = isDraft ? `${ study.title } (Draft)` : study.title;
        return {
            ...study,
            title: newTitle
        }
    } );


    return (
        <StudyTable data={ studies } />
    )
}

const MyStudies: NextPage = () => {

    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <Authorize>
                    <h1 className="h1 mb-12">My studies</h1>
                    <Studies />
                </Authorize>
            </Wrapper>
        </>
    );
};

export default MyStudies;
