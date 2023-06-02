import React from 'react';
import { Column, useTable } from 'react-table';
import { css } from '@emotion/react';
import Paginate from '../../components/Paginate';
import Logo from '../../components/Logo';
import Empty from '../Empty';

export default function SimpleTable({ columns, data, pagination }: {
  columns: Column<any>[],
  data?: any[],
  pagination?: {
    pageIndex: number,
    pageSize: number,
    total: number,
    onPageChanged?(page: number): void
  }
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: data ?? [],
  });

  return (
    <div className="flex flex-col">
      {data?.length === 0 && <Empty />}
      {data?.length !== 0 && (
        <>
          <table {...getTableProps()} className="table-auto w-full max-w-full break-words">
            {data?.length !== 0 && (
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="text-left text-[#99AC9B] text-[16px] py-4 font-normal pr-4 whitespace-pre"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            )}
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="text-left text-[16px] text-[#C2D7C7F6]">
                    {row.cells.map((cell) => (
                      <td
                        className="py-2 pr-4 break-all overflow-hidden overflow-ellipsis"
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {pagination && Math.ceil(pagination.total / pagination.pageSize) > 1 && (
            <div className="mx-auto mt-4">
              <Paginate
                page={pagination.pageIndex}
                total={pagination.total}
                pageSize={pagination.pageSize}
                onPageChanged={(page) => pagination.onPageChanged?.(page)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
