/* eslint-disable react/jsx-key */
import type { TableInstance } from 'react-table';

export type { TableItemAction } from './TableItemActions';
export { TableItemActions } from './TableItemActions';

type TableProps<T extends object> = {
    tableInstance: TableInstance<T>;
};

export const Table = <T extends object>({ tableInstance }: TableProps<T>) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <table className="w-full" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => {
                            const isLast =
                                index > 0 &&
                                index === headerGroup.headers.length - 1;
                            return (
                                <th
                                    className={`${
                                        isLast ? 'text-right' : 'text-left'
                                    } h6 pb-4`}
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                                const isLast =
                                    index > 0 && index === row.cells.length - 1;
                                return (
                                    <td
                                        className={`${
                                            isLast ? 'text-right' : 'text-left'
                                        } border-t border-t-borders`}
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
