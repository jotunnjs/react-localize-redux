import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { localizeReducer, getTranslate, initialize, addTranslation, addTranslationForLanguage, setActiveLanguage, getLanguages, getActiveLanguage, getOptions } from './localize';
import { LocalizeContext } from './LocalizeContext';
import { storeDidChange } from './utils';

export class LocalizeProvider extends Component {

  unsubscribeFromStore;

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
      getActiveLanguage,
      getOptions,
      (translate, languages, activeLanguage, options) => {
        const defaultLanguage = options.defaultLanguage || (languages[0] && languages[0].code);
        return {
          translate,
          languages,
          defaultLanguage,
          activeLanguage,
          ...localizeDispatchers
        };
      }
    );

    this.state = {
      localize: localizeReducer(undefined, {})
    };
  } 

  componentDidMount() {
    if (this.props.store) {
      this.unsubscribeFromStore = storeDidChange(this.props.store, this.onStateDidChange.bind(this));
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromStore();
  }

  onStateDidChange(prevState) {
    // TODO: add a check to ensure that localize state exists?
    
    const prevLocalizeState = prevState.localize
    const curLocalizeState = this.props.store.getState().localize;

    const prevActiveLanguage = getActiveLanguage(prevLocalizeState);
    const curActiveLanguage = getActiveLanguage(curLocalizeState);

    const prevOptions = getOptions(prevLocalizeState);
    const curOptions = getOptions(curLocalizeState);

    const prevTranslations = getTranslationsForActiveLanguage(prevLocalizeState);
    const curTranslations = getTranslationsForActiveLanguage(curLocalizeState);

    const hasActiveLangaugeChanged = (prevActiveLanguage.code !== curActiveLanguage.code);
    const hasOptionsChanged = (prevOptions !== curOptions);
    const hasTranslationsChanged = (prevTranslations !== curTranslations);

    if (hasActiveLangaugeChanged || hasOptionsChanged || hasTranslationsChanged) {
      this.setState({ localize: curLocalizeState });
    }
  }

  dispatch(action) {
    console.log('action', action);

    this.setState((prevState) => {
      return {
        localize: localizeReducer(prevState.localize, action)
      }
    });
  }

  render() {
    this.contextProps = this.getContextPropsSelector(this.state.localize);

    return (
      <LocalizeContext.Provider value={this.contextProps}>
        {this.props.children}
      </LocalizeContext.Provider>
    ); 
  }
}