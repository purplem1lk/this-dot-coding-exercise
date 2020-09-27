import React from 'react';

interface Props {
  onClick: any;
  disabled: boolean;
  label: string;
}

export const PaginationButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="btn btn-outline-info"
    >
      {props.label}
    </button>
  );
};
