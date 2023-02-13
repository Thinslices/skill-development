import type { Study, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react"
import type { CellProps, Column } from "react-table"
import type { TableItemActionsConfig } from "../Table/TableItemActions";
import { TableItemActions } from "../Table/TableItemActions"

export const useStudyColumns = ( actions?: TableItemActionsConfig ) => {

    return useMemo<Column<Study>[]>( () => [ {
        Header: () => <div>Title</div>,
        accessor: "title" as keyof Study,
        Cell: ( obj: CellProps<Study>) => {
            return (
                <Link className="h4 block py-4" href={ `/studies/${ obj.row.original.id }` }>{ obj.value }</Link>
                )
            }
        }, {
            Header: () => <div>Author</div>,
            accessor: "User" as keyof Study,
            Cell: ( { value }: CellProps<Study> ) => {
                const user = value as User;

                return (
                    <Link className="block py-4" href={ `/users/${ user.id }/studies` }>{ user.name }</Link>
                ) 
            }
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
                <TableItemActions id={ value as string } actions={ actions } />
            )
    } ], [] );

}