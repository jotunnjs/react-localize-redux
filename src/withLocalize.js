import React, { Component } from 'react';
import { LocalizeContext } from './LocalizeContext';

// the context can contain all the actions
// the translation data can be stored directly in the state if redux is being used
// would be nice if there was a way to create a mock version of store to allow for using same API and reducers to update state


export const withLocalize = WrappedComponent => {

  const LocalizedComponent = props => {
    return (
      <LocalizeContext.Consumer>
         {context => 
           <WrappedComponent { ...props }
             { ...props }
             { ...context }
           />
         }
      </LocalizeContext.Consumer>
    );
  }

  return LocalizedComponent;
};
