/* eslint-disable react/jsx-key */
"use client";

import React, { useMemo } from "react";
import type { CellProps, Column } from "react-table";
import { useTable } from "react-table";
import Link from "next/link";
import type { Study, User } from "@prisma/client";
import { Button } from "../Button/Button";

type DeleteCallback = ( id: string ) => void;
type StudyTableItemActions = {
    view?: boolean,
    edit?: boolean,
    onDeleteClick?: DeleteCallback
}

type StudyTableItemActionsProps = {
    id: string,
    actions?: StudyTableItemActions,
}

const StudyTableItem:React.FC<StudyTableItemActionsProps> = ( props ) => {
    
    const { id, actions } = props;

    if ( ! actions?.view && ! actions?.edit && ! actions?.onDeleteClick ) {
        return null;
    }

    return (
        <div className="flex items-center gap-4 justify-end py-4">
            { actions.view && <Link href={ `/studies/${ id }` }>View</Link> }
            { actions.edit && <Link href={ `/studies/${ id }/edit` }>Edit</Link> }
            { actions.onDeleteClick && <Button onClick={ () => actions.onDeleteClick( id ) }>Delete</Button> }
        </div>
    )
}

const useStudiesTableInstance = ( studies: Study[], actions?: StudyTableItemActions ) => {

    const columns = useMemo<Column<Study>[]>( () => [ {
        Header: () => <div>Title</div>,
        accessor: "title" as keyof Study,
        Cell: ( obj: CellProps<Study>) => {
            return (
                <Link className="block py-4" href={ `/studies/${ obj.row.original.id }` }>{ obj.value }</Link>
            )
        }
    }, {
        Header: () => <div>Author</div>,
        accessor: "User.name" as keyof Study,
        Cell: ({value}: CellProps<Study>) => <div className="py-4">{ value }</div>
    }, {
        Header: () => <div>Publish Date</div>,
        id: 'createdAt',
        accessor: obj => obj.createdAt.toLocaleDateString( 'ro-RO' ),
        Cell: ({value}: CellProps<Study>) => <div className="py-4">{ value }</div>
    }, {
        Header: () => null,
        id: 'actions',
        accessor: obj => obj.id,
        Cell: ( { value }: CellProps<Study>) => (
            <StudyTableItem id={ value as string } actions={ actions } />
        )
    } ], [] );

    return useTable<Study>( { columns, data: studies } )

}

type StudyTableProps = {
    data: (Study & { User: User; })[] | undefined;
    actions?: StudyTableItemActions
}

export const StudyTable:React.FC<StudyTableProps> = ( { data, actions } ) => {
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useStudiesTableInstance( data ?? [], actions );

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
                                    <td className="text-left last:text-right border-t border-t-borders" { ...cell.getCellProps() }>
                                        { cell.render( 'Cell' ) }
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