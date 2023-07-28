import type { Study, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { CellProps, Column } from 'react-table';
import type { TableItemAction } from '..';
import { TableItemActions } from '..';
import { useDialog, useLoader, useUserRole } from '../../hooks';
import { api } from '../../utils/api';

export const useStudyColumns = () => {
  const utils = api.useContext();
  const { start, stop } = useLoader();
  const { data: sessionData } = useSession();
  const myId = sessionData?.user.id;
  const myRole = useUserRole(myId ?? '');
  const { show: showDialog } = useDialog();

  const { mutate: deleteStudy } = api.study.delete.useMutation({
    onSuccess: async () => {
      await utils.study.invalidate();
      stop();
    },
    onError: () => {
      stop();
    },
  });

  const columns = useMemo<Column<Study>[]>(
    () => [
      {
        Header: () => <div>Title</div>,
        accessor: 'title' as keyof Study,
        Cell: (obj: CellProps<Study>) => {
          return (
            <Link
              className="h4 block py-4"
              href={`/studies/${obj.row.original.id}`}>
              {obj.value}
            </Link>
          );
        },
      },
      {
        Header: () => <div>Author</div>,
        accessor: 'User' as keyof Study,
        Cell: ({ value }: CellProps<Study>) => {
          const user = value as User;

          return (
            <Link className="block py-4" href={`/users/${user.id}/studies`}>
              {user.name}
            </Link>
          );
        },
      },
      {
        Header: () => <div>Publish Date</div>,
        id: 'createdAt',
        // accessor: obj => obj.createdAt.toLocaleDateString('ro-RO'),
        Cell: ({ value }: CellProps<Study>) => (
          <div className="py-4">{value}</div>
        ),
      },
      {
        Header: () => null,
        id: 'actions',
        accessor: obj => obj.id,
        Cell: (obj: CellProps<Study>) => {
          const router = useRouter();
          const authorId = obj.row.original.authorId;
          const authorRole = useUserRole(authorId);

          const actions: TableItemAction<Study>[] = [
            {
              label: 'View',
              onClick: item => {
                void router.push(`/studies/${item.id}`);
              },
            },
          ];

          if (
            myId === authorId ||
            (myRole === 'ADMIN' && authorRole !== 'ADMIN')
          ) {
            actions.push({
              label: 'Edit',
              onClick: item => {
                void router.push(`/studies/${item.id}/edit`);
              },
            });

            actions.push({
              label: 'Delete',
              onClick: item => {
                showDialog({
                  title: 'Are you sure?',
                  message: 'Are you sure you want to delete this item?',
                  onConfirm: () => {
                    start();
                    try {
                      deleteStudy({ id: item.id });
                    } catch {
                      stop();
                    }
                  },
                });
              },
            });
          }

          return <TableItemActions item={obj.row.original} actions={actions} />;
        },
      },
    ],
    [deleteStudy, myId, myRole, showDialog, start, stop]
  );

  return columns;
};
