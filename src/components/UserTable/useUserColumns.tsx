import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";
import type { CellProps, Column } from "react-table";
import { api } from "../../utils/api";
import type { TableItemAction } from "../Table/TableItemActions";
import { TableItemActions } from "../Table/TableItemActions";
import { useLoader, useUserRole } from "../../hooks";

export const useUserColumns = () => {
    const { data: sessionData } = useSession();
    const myId = sessionData?.user.id;
    const myRole = useUserRole(myId ?? "");
    const columns = useMemo<Column<User>[]>(() => {
        return [
            {
                Header: () => <div>Name</div>,
                accessor: "name" as keyof User,
                Cell: (obj: CellProps<User>) => {
                    return (
                        <Link
                            className="block py-4"
                            href={`/users/${obj.row.original.id}`}
                        >
                            <div className="flex gap-4">
                                {obj.row.original.image && (
                                    <div>
                                        <div className="h-14 w-14 overflow-hidden rounded-full border-2">
                                            <img
                                                alt={obj.value as string}
                                                src={obj.row.original.image}
                                                width={96}
                                                height={96}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div className="h4">{obj.value}</div>
                                    <div>{obj.row.original.email}</div>
                                </div>
                            </div>
                        </Link>
                    );
                },
            },
            {
                Header: () => <div>Role</div>,
                accessor: "role" as keyof User,
                Cell: (obj: CellProps<User>) => {
                    return <div>{obj.value}</div>;
                },
            },
            {
                Header: () => null,
                id: "actions",
                accessor: obj => obj.id,
                Cell: (obj: CellProps<User>) => {
                    const actions: Array<TableItemAction<User>> = [];
                    const utils = api.useContext();
                    const { start, stop } = useLoader();
                    const deleteUser = api.user.delete.useMutation({
                        onSuccess: async () => {
                            await utils.user.getAll.invalidate();
                        },
                        onSettled: () => {
                            stop();
                        },
                    });

                    if (
                        myRole === "ADMIN" &&
                        obj.row.original.role !== "ADMIN"
                    ) {
                        actions.push({
                            label: "Delete",
                            style: "primary",
                            onClick: item => {
                                start();
                                deleteUser.mutate({ id: item.id });
                            },
                        });
                    }

                    return (
                        <TableItemActions
                            item={obj.row.original}
                            actions={actions}
                        />
                    );
                },
            },
        ];
    }, [myRole]);

    return columns;
};
