import React from 'react';

const userValue = {
  userProfileLoading: {
    documents: 'loading',
  },
  userProfileLoaded: {
    documents: 'ready',
  },
};

export default React.createContext(userValue.userProfileLoading);
