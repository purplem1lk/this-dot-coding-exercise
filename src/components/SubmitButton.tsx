import React from "react";

interface Props {
  onClick: any;
  isDisabled: boolean;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      style={{ verticalAlign: "0px" }}
      onClick={props.onClick}
      className="btn btn-outline-primary"
      type="submit"
      disabled={props.isDisabled}
    >
      Search
    </button>
  );
};
