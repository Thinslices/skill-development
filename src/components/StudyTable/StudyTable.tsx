/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import type { CellProps, Column } from "react-table";
import { useTable } from "react-table";
import Link from "next/link";
import type { Study, User } from "@prisma/client";

const useStudiesTableInstance = ( studies: Study[] ) => {

    const columns = React.useMemo<Column<Study>[]>( () => [
        {
            Header: () => <div>Title</div>,
            accessor: "title" as keyof Study,
            Cell: ({value}: CellProps<Study>) => <div>{ value }</div>
        },
        {
            Header: () => <div>Author</div>,
            accessor: "User.name" as keyof Study,
            Cell: ({value}: CellProps<Study>) => <div>{ value }</div>
        },
        {
            Header: () => <div>Publish Date</div>,
            id: 'createdAt',
            accessor: obj => obj.createdAt.toLocaleDateString( 'ro-RO' ),
            Cell: ({value}: CellProps<Study>) => <div>{ value }</div>
        },
    ], [] );

    return useTable<Study>( { columns, data: studies } )

}

type StudyTableProps = {
    data: (Study & { User: User; })[] | undefined;
}

export const StudyTable:React.FC<StudyTableProps> = ( { data } ) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useStudiesTableInstance( data ?? [] );

    return (
        <table className="w-full" {...getTableProps()}>
            <thead>
                { headerGroups.map( ( headerGroup ) => (
                    <tr { ...headerGroup.getHeaderGroupProps() }>
                        { headerGroup.headers.map( column => {
                            return (
                                <th className="text-left last:text-right h6 pb-4" { ...column.getHeaderProps() }>{ column.render( 'Header' ) }</th>
                            )
                        } ) }
                    </tr>
                ) ) }
            </thead>
            <tbody {...getTableBodyProps()}>
                { rows.map( row => {
                    prepareRow( row )
                    return (
                        <tr { ...row.getRowProps() }>
                            { row.cells.map( cell => {
                                return (
                                    <td className="text-left last:text-right py-4 border-t border-t-borders" { ...cell.getCellProps() }>
                                        <Link href={ `studies/${ cell.row.original.id }` }>{ cell.render( 'Cell' ) }</Link>
                                    </td>
                                )
                            } ) }
                        </tr>
                    )
                } ) }
            </tbody>
        </table>
    )
}