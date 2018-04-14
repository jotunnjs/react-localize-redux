import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { localeReducer, getTranslate, initialize, addTranslation, addTranslationForLanguage, setActiveLanguage, getLanguages, getActiveLanguage, getOptions } from './locale';
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
      locale: localeReducer(undefined, {})
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
    // TODO: add a check to ensure that locale state exists?
    // TODO: rename locale to localize
    const prevLocaleState = prevState.locale
    const curLocaleState = this.props.store.getState().locale;

    const prevActiveLanguage = getActiveLanguage(prevLocaleState);
    const curActiveLanguage = getActiveLanguage(curLocaleState);

    const prevOptions = getOptions(prevLocaleState);
    const curOptions = getOptions(curLocaleState);

    const prevTranslations = getTranslationsForActiveLanguage(prevLocaleState);
    const curTranslations = getTranslationsForActiveLanguage(curLocaleState);

    const hasActiveLangaugeChanged = (prevActiveLanguage.code !== curActiveLanguage.code);
    const hasOptionsChanged = (prevOptions !== curOptions);
    const hasTranslationsChanged = (prevTranslations !== curTranslations);

    if (hasActiveLangaugeChanged || hasOptionsChanged || hasTranslationsChanged) {
      this.setState({ locale: curLocaleState });
    }
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