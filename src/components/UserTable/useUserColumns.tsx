import type { User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react"
import type { CellProps, Column } from "react-table"

export const useUserColumns = () => {

    return useMemo<Column<User>[]>( () => [ {
        Header: () => <div>Name</div>,
        accessor: "name" as keyof User,
        Cell: ( obj: CellProps<User>) => {
            return (
                <Link className="block py-4" href={ `/users/${ obj.row.original.id }` }>
                    <div className="h4">{ obj.value }</div>
                    <div>{ obj.row.original.email }</div>
                </Link>
                )
            }
    } ], [] );

}