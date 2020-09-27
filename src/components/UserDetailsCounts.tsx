import React from 'react';

interface Props {
  responses: any[];
  userLogin: string;
}

export const UserDetailsCounts = (props: Props) => {
  return (
    <>
      <div className="row">
        Following Count:
        <a
          className="ml-1"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.github.com/${props.userLogin}?tab=following`}
        >
          {props.responses[1].following.toLocaleString()}
        </a>
      </div>
      <div className="row">
        Follower Count:
        <a
          className="ml-1"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.github.com/${props.userLogin}?tab=followers`}
        >
          {props.responses[1].followers.toLocaleString()}
        </a>
      </div>
      <div className="row">
        Star Count:
        <a
          className="ml-1"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.github.com/${props.userLogin}?tab=stars`}
        >
          {props.responses[2].toLocaleString()}
        </a>
      </div>
    </>
  );
};
