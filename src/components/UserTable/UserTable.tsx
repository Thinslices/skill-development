import type { User } from "@prisma/client";
import { useTable } from "react-table";
import { Table } from "..";
import { useUserColumns } from "./useUserColumns";

type UserTableProps = {
    data: User[] | undefined;
}

export const UserTable:React.FC<UserTableProps> = ( props ) => {
    const { data } = props;
    const columns = useUserColumns();
    const tableInstance = useTable<User>( { columns, data: data ?? [] } );

    return (
        <Table tableInstance={ tableInstance } />
    )
}