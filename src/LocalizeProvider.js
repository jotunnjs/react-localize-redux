import React, { Component } from 'react';
import { localeReducer, getTranslate } from './locale';
import { LocalizeContext } from './LocalizeContext';

class LocalizeProvider extends Component {

  constructor(props) {
    super(props);

    const dispatch = this.props.store
      ? this.props.store.dispatch
      : this.dispatch.bind(this);

    console.log(this.context);

    this.state = {
      locale: localeReducer(undefined, {}),
      // dispatch: dispatch, 
      // translate: () => {} // maybe throw a warning that person hasn't initialized from this dummy function
    }

    this.contextProps = {
      dispatch,
      locale: this.state.locale
    };
  } 

  componentDidUpdate(prevProps, prevState) {

    // console.log('componentDidUpdate', prevState, this.state);
    // this.contextProps.locale = this.state.locale;
    // this.contextProps.translate = getTranslate(this.state.locale);

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
      // console.log('prevState', Object.assign({}, prevState));
      // console.log('curState', Object.assign({}, this.state));
      
      return {
        locale: localeReducer(prevState.locale, action),
        // translate: getTranslate(prevState.locale)
      }
    });
  }

  getContextProps() {
    // context reference should only change when locale changes
    // for all other time ref should not change
  }

  render() {
    console.log('render', Object.assign({}, this.state.locale));
    // this.contextProps.locale = this.state.locale;
    // this.contextProps.translate = getTranslate(this.state.locale);
    this.contextProps = {
      ...this.contextProps,
      locale: this.state.locale,
      translate: getTranslate(this.state.locale)
    };

    return (
      <LocalizeContext.Provider value={this.contextProps}>
        {this.props.children}
      </LocalizeContext.Provider>
    ); 
  }
}

export default LocalizeProvider;