import type { Study, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react"
import type { CellProps, Column } from "react-table"
import type { TableItemAction } from "..";
import { TableItemActions } from ".."
import { useLoader } from "../../hooks";
import { api } from "../../utils/api";

export const useStudyColumns = () => {

    const utils = api.useContext();
    const { start, stop } = useLoader();
    const deleteStudy = api.study.delete.useMutation( {
        onSuccess: async () => {
            await utils.study.invalidate();
            stop();
        },
        onError: () => {
            stop();
        }
    } );

    const columns = useMemo<Column<Study>[]>( () => [ {
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
            Cell: ( obj: CellProps<Study>) => {
                const router = useRouter();
                const actions: TableItemAction<Study>[] = [ {
                    label: 'View',
                    onClick: ( item ) => {
                        void router.push( `/studies/${ item.id }` );
                    }
                }, {
                    label: 'Edit',
                    onClick: ( item ) => {
                        void router.push( `/studies/${ item.id }/edit` );
                    }
                }, {
                    label: 'Delete',
                    onClick: ( item ) => {
                        start();
                        try {
                            deleteStudy.mutate( { id: item.id } );
                        } catch {
                            stop();
                        }
                    }
                } ];
                return (
                    <TableItemActions item={ obj.row.original } actions={ actions } />
                )
            }
    } ], [] );

    return columns;
}