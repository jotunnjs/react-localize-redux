import React, { Component } from 'react';

const LocalizeContext = React.createContext();

// console.log(React.createContext);

// the context can contain all the actions
// the translation data can be stored directly in the state if redux is being used
// would be nice if there was a way to create a mock version of store to allow for using same API and reducers to update state


export const withLocalize = WrappedComponent => {

  class LocalizedComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  return LocalizedComponent;
};
