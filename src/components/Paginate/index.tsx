import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import iconNext from 'src/assets/icons/pageNext.svg';
import iconPre from 'src/assets/icons/pagePre.svg';
import styled from '@emotion/styled';

const MyReactPaginate = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  color: #919191;
  gap: 12px;
  font-size: 14px;
  font-weight: 800;

  li {
    list-style: none;
  }

  a {
    box-sizing: border-box;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    width: 36px;
    height: 36px;
    user-select: none;
    text-align: center;
    line-height: 36px;
  }

  .selected {
    background: #4D53F5;
    color: #FEFEFE;
  }
`;

export default function Paginate(props: {
  page: number,
  total: number,
  pageSize: number,
  onPageChanged(page: number): void
}) {
  const {
    total, pageSize, page, onPageChanged,
  } = props;
  const count = Math.ceil(total / pageSize);
  const handler = (event: any) => {
    onPageChanged(event.selected + 1);
  };

  return (
    <>
      {count > 1 && (
        <MyReactPaginate
          forcePage={page - 1}
          breakLabel="..."
          nextLabel={<div>Next</div>}
          onPageChange={handler}
          pageCount={count}
          previousLabel={<div>Previous</div>}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          renderOnZeroPageCount={() => null}
        />
      )}
    </>
  );
}
