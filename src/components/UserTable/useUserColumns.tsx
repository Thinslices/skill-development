import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react"
import type { CellProps, Column } from "react-table"
import { api } from "../../utils/api";
import type { Role } from "@prisma/client";
import { TableItemActions } from "../Table/TableItemActions";

const useUserRole: ( id: string ) => Role = ( id ) => {
    const { data } = api.user.get.useQuery( { id }, {
        enabled: !! id
    } );

    return data?.role === "ADMIN" ? "ADMIN" : "USER";
}

export const useUserColumns = () => {

    const { data: sessionData } = useSession();
    const myId = sessionData?.user.id;
    const myRole = useUserRole( myId ?? '' );

    const columns = useMemo<Column<User>[]>( () => {
        console.log( myRole );

        return [ {
            Header: () => <div>Name</div>,
            accessor: "name" as keyof User,
            Cell: ( obj: CellProps<User>) => {
                return (
                    <Link className="block py-4" href={ `/users/${ obj.row.original.id }` }>
                        <div className="flex gap-4">
                            { obj.row.original.image && <div>
                                <div className="w-14 h-14 rounded-full border-2 overflow-hidden">
                                    <img alt={ obj.value as string } src={ obj.row.original.image } width={ 96 } height={ 96 } />
                                </div>
                            </div> }
                            <div>
                                <div className="h4">{ obj.value }</div>
                                <div>{ obj.row.original.email }</div>
                            </div>
                        </div>
                    </Link>
                )
            }
        }, {
            Header: () => <div>Role</div>,
            accessor: "role" as keyof User,
            Cell: ( obj: CellProps<User> ) => {
                return (
                    <div>{ obj.value }</div>
                )
            } 
        }, {
            Header: () => null,
            id: 'actions',
            accessor: obj => obj.id,
            Cell: ( obj: CellProps<User>) => {
                const actions = {}

                if ( myRole === "ADMIN" && myId !== obj.row.original.id ) {
                    Object.assign( actions, { 
                        onDeleteClick: () => {
                            console.log( 'Delete User' );
                        }
                    } )
                }

                return (
                    <TableItemActions id={ obj.value as string } actions={ actions } />
                )
            }
        } ];

    }, [ myId, myRole ] );

    return columns;

}
