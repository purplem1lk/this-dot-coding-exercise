import React from "react";

interface Props {
  totalResultsCount: number;
}

export const TotalResultsCount = (props: Props) => {
  return (
    <div className="mb-2 text-center">
      Total Count: {props.totalResultsCount.toLocaleString()}
    </div>
  );
};
