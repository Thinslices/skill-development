import type { NextPage } from "next"
import { Breadcrumbs, Layout } from "../";
import { useBreadcrumbs } from "../../hooks";

export const TodoPage:NextPage = () => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <Layout>
            <div className="space-y-8">
                <Breadcrumbs breadcrumbs={ breadcrumbs } />
                <div className="h1">Todo</div>
            </div>
        </Layout>
    )
}