import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import type { NextPage } from "next";
import Image from "next/image";

import { Breadcrumbs, Button, Header, QuestionView, Wrapper } from "../../../components";
import { api } from "../../../utils/api";
import type { Study } from "../../../utils/types";
import { useBreadcrumbs } from "../../../hooks";

const StudyPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;    
    const { data } = api.study.get.useQuery( { id: id as string }, {
        enabled: !! id
    } ); 
    const breadcrumbs = useBreadcrumbs();

    if ( ! data || ! data.questions) {
        return null;
    }

    return (
        <StudyView breadcrumbs={ breadcrumbs } study={ data } />
    )
}

type StudyViewProps = {
    breadcrumbs: Array<{ href: string, text: string }>,
    study: Study
}

type EditStudyButtonProps = {
    study: Study
}

const EditStudyButton:React.FC<EditStudyButtonProps> = props => {
    const { study } = props;
    const { data: sessionData } = useSession();

    if ( ! study.authorId || sessionData?.user.id !== study.authorId ) {
        return null;
    }
    
    return (
        <Button style="secondary" href={ `/studies/${ study.id }/edit`} >Edit</Button>
    )
}

const StudyView:React.FC<StudyViewProps> = props => {
    const { breadcrumbs, study } = props;
    const [ expanded, setExpanded ] = useState<boolean>( false );
    const title = study && `${ study.title }${ study.published ? '' : ' (Draft)' }`;

    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <div className="space-y-8">
                    <Breadcrumbs breadcrumbs={ breadcrumbs } />
                    <div className="flex gap-8 mb-12 items-center justify-between">
                        <h1 className="h1">{ title }</h1>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={ () => { setExpanded( true ) } }>
                                    <div>Expand all</div>
                                    <Image src="/arrows.svg" width={ 17 } height={ 18 } alt="arrow" />
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer" onClick={ () => { setExpanded( false ) } }>
                                    <div>Collapse all</div>
                                    <Image className="rotate-180" src="/arrows.svg" width={ 17 } height={ 18 } alt="arrow" />
                                </div>
                            </div>
                            <EditStudyButton study={ study } />
                        </div>
                    </div>
                    <div>
                        { study.questions.map( ( data, index ) => {
                            return (
                                <QuestionView key={ index } { ...data } expanded={ expanded } />
                            )
                        } ) }
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default StudyPage;