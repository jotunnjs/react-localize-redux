import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { localeReducer, getTranslate, initialize, addTranslation, addTranslationForLanguage, setActiveLanguage, getLanguages } from './locale';
import { LocalizeContext } from './LocalizeContext';

export class LocalizeProvider extends Component {

  constructor(props) {
    super(props);

    const dispatch = this.props.store
      ? this.props.store.dispatch
      : this.dispatch.bind(this);

    const localizeActionCreators = {
      initialize,
      addTranslation,
      addTranslationForLanguage,
      setActiveLanguage
    };

    const localizeDispatchers = Object.keys(localizeActionCreators).reduce((prev, cur) => ({
      ...prev,
      [cur]: (...args) => dispatch(localizeActionCreators[cur](...args))
    }), {});
    
    this.getContextPropsSelector = createSelector(
      getTranslate,
      getLanguages,
      (translate, languages) => {
        return {
          translate,
          languages,
          ...localizeDispatchers
        };
      }
    );

    this.state = {
      locale: localeReducer(undefined, {})
    };
  } 

  dispatch(action) {
    console.log('action', action);

    this.setState((prevState) => {
      return {
        locale: localeReducer(prevState.locale, action)
      }
    });
  }

  render() {
    this.contextProps = this.getContextPropsSelector(this.state.locale);

    return (
      <LocalizeContext.Provider value={this.contextProps}>
        {this.props.children}
      </LocalizeContext.Provider>
    ); 
  }
}