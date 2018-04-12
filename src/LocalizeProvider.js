import React, { Component } from 'react';
import { localeReducer, getTranslate } from './locale';
import { LocalizeContext } from './LocalizeContext';

class LocalizeProvider extends Component {

  constructor(props) {
    super(props);

    const dispatch = this.props.store
      ? this.props.store.dispatch
      : this.dispatch.bind(this);

    this.state = {
      locale: localeReducer(undefined, {}),
      dispatch: dispatch, 
      translate: () => {} // maybe throw a warning that person hasn't initialized from this dummy function
    }
  } 

  componentDidUpdate(prevProps, prevState) {
    // console.log('DID UPDATE!', prevState === this.state);
  //   const isInitialized = (this.state.locale.languages && this.state.locale.languages.length > 0);
    
  //   this.setState({
  //     translate: getTranslate(this.state.locale)
  //   });
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('getDerivedStateFromProps', nextProps, prevState);
  // }

  dispatch(action) {
    console.log('action', action);

    // this.setState({
    //   locale: localeReducer(this.state.locale, action),
    //   translate: getTranslate(this.state.locale)
    // }, () => {
    //   console.log(this.state);
    // });

    this.setState((prevState) => {
      return {
        locale: localeReducer(prevState.locale, action),
        translate: getTranslate(prevState.locale)
      }
    });
  }

  render() {
    return (
      <LocalizeContext.Provider value={this.state}>
        {this.props.children}
      </LocalizeContext.Provider>
    ); 
  }
}

export default LocalizeProvider;