import { useState } from "react";
import { useRouter } from "next/router";
import { Breadcrumbs, Header, QuestionView, Wrapper } from "../../../components";
import { api } from "../../../utils/api";
import { useBreadcrumbs } from "../../../hooks";

const Study = () => {
    const router = useRouter();
    const { id } = router.query;    
    const { data, isLoading } = api.study.get.useQuery( { id: id as string } ); 
    const [ expanded, setExpanded ] = useState<boolean>( false );
    const breadcrumbs = useBreadcrumbs();

    if ( ! data ) {
        return;
    }

    return (
        <>
            <Header />
            <Wrapper className="py-14">
                <div className="space-y-8">
                    <Breadcrumbs breadcrumbs={ breadcrumbs } />
                    <div className="flex gap-8 mb-12 items-center justify-between">
                        <h1 className="h1">{ data && `${ data.title }${ data.published ? '' : ' (Draft)' }` }</h1>
                        <div className="flex gap-4">
                            <div className="cursor-pointer" onClick={ () => { setExpanded( true ) } }>Expand all</div>
                            <div className="cursor-pointer" onClick={ () => { setExpanded( false ) } }>Collapse all</div>
                        </div>
                    </div>
                    <div>
                        { data.questions.map( ( data, index ) => {
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

export default Study;