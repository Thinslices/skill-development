/* eslint-disable react/jsx-key */
"use client";

import { useTable } from "react-table";
import type { Study, User } from "@prisma/client";
import { useStudyColumns } from "./useStudyColumns";
import { Table } from "..";

type StudyTableProps = {
    data: (Study & { User: User })[] | undefined;
};

export const StudyTable: React.FC<StudyTableProps> = ({ data }) => {
    const columns = useStudyColumns();
    const tableInstance = useTable<Study>({ columns, data: data ?? [] });

    return <Table tableInstance={tableInstance} />;
};
