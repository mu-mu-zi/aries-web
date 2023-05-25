import React from 'react';
import { Column, useTable } from 'react-table';
import { css } from '@emotion/react';
import Paginate from '../../components/Paginate';
import Logo from '../../components/Logo';

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
      <table {...getTableProps()} className="table-auto w-full">
        {data?.length !== 0 && (
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-left text-[#99AC9B] text-[16px] py-4 font-normal pr-4"
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
                {row.cells.map((cell) => <td className="py-2 pr-4" {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 大于 1 页才渲染组件 */}
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
    </div>
  );
}
