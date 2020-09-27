import React from 'react';

import { PaginationButton } from './PaginationButton';

interface Props {
  page: number;
  setPage: any;
  pageCount: number;
  latestData: any;
}

// this is not a button. it's a paginator.
export const Paginator = (props: Props) => {
  return (
    <div className="row justify-content-center">
      <div className="col-auto mt-4 mb-3 mr-3">
        <PaginationButton
          onClick={() => props.setPage((old: number) => Math.max(old - 1, 0))}
          disabled={props.page === 1}
          label={'<< Previous Page'}
        />
        <span className="mr-4 ml-4 mt-3">Current Page: {props.page}</span>
        <PaginationButton
          onClick={() => props.setPage((old: number) => old + 1)}
          disabled={!props.latestData || props.page === props.pageCount}
          label={'Next Page >>'}
        />
      </div>
    </div>
  );
};
