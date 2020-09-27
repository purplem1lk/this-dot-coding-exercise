import React, { useState } from 'react';
import { useQuery } from 'react-query';

import './UserCard.css';
import { UserDetailsCounts } from './UserDetailsCounts';

const fetchOneUser = async (key: string, login: string) => {
  const starCount = `https://api.github.com/users/${login}/starred?per_page=1`;
  const userMetaData = `https://api.github.com/users/${login}`;
  const urls = [starCount, userMetaData];
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  let linkHeader = null;
  const data = await Promise.all(
    responses.map((response: any) => {
      const headers = response.headers;
      if (headers.has('link')) {
        // There are many headers that are returned in the response above.
        // The starCount variable is a hard-coded url that puts one star per page,
        // which will provide us the number of stars in the `per_page=` parameter.
        // The chained methods below allow us to get the star count.
        linkHeader = headers
          .get('link')
          .split('page=')
          .slice(-1)
          .pop()
          .split('>')
          .shift();
      }
      return response.json();
    })
  );

  // linkHeader gives us the star count is pushed into data in order to be used in useQuery.
  data.push(linkHeader);
  return data;
};

interface Props {
  userHtml: string;
  login: string;
  userAvatar: string;
}

export const UserCard = (props: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { data, refetch } = useQuery(['user', props.login], fetchOneUser, {
    enabled: false,
  });

  const detailsOnClick = () => {
    setShowDetails((current) => !current);
    if (!data) {
      refetch();
    }
  };

  const responses = data as any;

  return (
    <div className="card" style={{ width: 280 }}>
      <img
        className="card-img-top cursor-pointer"
        onClick={detailsOnClick}
        src={props.userAvatar}
        alt={props.login}
      ></img>
      <div className="card-body d-inline-block">
        <h5 className="card-title text-center">{props.login}</h5>
        <div className="card-text">
          {responses && responses.length && showDetails && (
            <>
              <div className="row ml-.5">Name: {responses[1].name}</div>
              {responses[1].bio && (
                <div className="row ml-.5">Bio: {responses[1].bio}</div>
              )}
              {responses[1].company && (
                <div className="row ml-.5">Company: {responses[1].company}</div>
              )}
              <UserDetailsCounts
                responses={responses}
                userLogin={props.login}
              />
            </>
          )}
        </div>
        <div className="col text-center">
          <a
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            href={props.userHtml}
            className="btn btn-primary mt-2"
          >
            Go to GitHub Page
          </a>
        </div>
      </div>
    </div>
  );
};
