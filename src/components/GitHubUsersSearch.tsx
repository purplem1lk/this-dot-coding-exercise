import React, { useEffect, useState } from 'react';
import { usePaginatedQuery } from 'react-query';

import { SubmitButton } from './SubmitButton';
import { UserCard } from './UserCard';
import { NoResultsText } from './NoResultsText';
import { TotalResultsCount } from './TotalResultsCount';
import { Paginator } from './Paginator';

const fetchUsers = async (
  key: string,
  page: number,
  { searchTerm }: { searchTerm: string }
) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${searchTerm}&per_page=3&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const GitHubUsersSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, refetch } = usePaginatedQuery(
    ['users', page, { searchTerm }],
    fetchUsers,
    {
      enabled: isEnabled,
    }
  );

  useEffect(() => {
    if (resolvedData && resolvedData.total_count) {
      if (resolvedData.total_count < 3) {
        setPageCount(1);
      } else {
        setPageCount(resolvedData.total_count / 3);
      }
    }
  }, [resolvedData]);

  const handleSearchInputChange = (event: any) => {
    setIsEnabled(false);
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <div className="row text-center mt-4">
        <div className="col">
          <form>
            <input
              className="mr-2"
              style={{ height: '37px' }}
              onChange={handleSearchInputChange}
              value={searchTerm}
              placeholder="Type here!"
            />
            <SubmitButton
              onClick={(e: any) => {
                e.preventDefault();
                setIsEnabled(true);
                refetch();
              }}
              isDisabled={!searchTerm.length}
            />
          </form>
        </div>
      </div>

      {resolvedData &&
        resolvedData.items &&
        resolvedData.items.length === 0 && <NoResultsText />}

      {resolvedData && resolvedData.items && resolvedData.items.length > 0 && (
        <>
          <Paginator
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            latestData={latestData}
          />
          <div className="row justify-content-center mt-3">
            <div className="col-auto">
              {resolvedData && resolvedData.total_count && (
                <TotalResultsCount
                  totalResultsCount={resolvedData.total_count}
                />
              )}
              <div>
                <em>Click the user's image to view more details!</em>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            {resolvedData.items.map((user: any) => (
              <div className="col-auto" key={user.login}>
                <UserCard
                  userHtml={user.html_url}
                  login={user.login}
                  userAvatar={user.avatar_url}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
