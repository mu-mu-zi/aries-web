import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from '@emotion/styled';
import leftIcon from '../../assets/icon/icons-small_triangle_left.svg';
import rightIcon from '../../assets/icon/icons-small_triangle_right.svg';

const MyReactPaginate = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  color: #919191;
  gap: 16px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Tw Cen MT';

  li {
    list-style: none;
  }

  a {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    width: 36px;
    height: 36px;
    user-select: none;
    text-align: center;
    line-height: 36px;
  }

  .selected {
    color: #3D3228;
    background: linear-gradient(90deg, #BE9D66 -4.08%, #E8D2A3 100%);
    border-radius: 12px;
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
    <div>
      {count > 1 && (
        <MyReactPaginate
          forcePage={page - 1}
          breakLabel="..."
          nextLabel={<img src={rightIcon} />}
          onPageChange={handler}
          pageCount={count}
          previousLabel={<img src={leftIcon} />}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          renderOnZeroPageCount={() => null}
        />
      )}
    </div>
  );
}
