import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import { GitHubUsersSearch } from './components/GitHubUsersSearch';

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <GitHubUsersSearch />
    </ReactQueryCacheProvider>
  );
}

export default App;
