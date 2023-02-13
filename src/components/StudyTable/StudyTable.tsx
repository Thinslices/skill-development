/* eslint-disable react/jsx-key */
"use client";

import { useTable } from "react-table";
import type { Study, User } from "@prisma/client";
import type { TableItemActionsConfig } from "../Table/TableItemActions";
import { useStudyColumns } from "./useStudyColumns";
import { Table } from "..";

type StudyTableProps = {
    data: (Study & { User: User; })[] | undefined,
    actions?: TableItemActionsConfig
}

export const StudyTable:React.FC<StudyTableProps> = ( { data, actions } ) => {
    const columns = useStudyColumns( actions );
    const tableInstance = useTable<Study>( { columns, data: data ?? [] } )

    return (
        <Table tableInstance={ tableInstance } />
    )
}
