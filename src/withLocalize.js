import React from 'react';

// const LocalizeContext = React.createContext();

// console.log(React.createContext);

// the context can contain all the actions
// the translation data can be stored directly in the state if redux is being used
// would be nice if there was a way to create a mock version of store to allow for using same API and reducers to update state

export const withLocalize = WrappedComponent => {
  return function LocalizedComponent(props) {
    return (
      <WrappedComponent {...props} />
    );
  }
};
