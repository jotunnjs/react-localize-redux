// @flow
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { getTranslate, addTranslationForLanguage, getLanguages, getOptions, getActiveLanguage, getTranslationsForActiveLanguage } from './localize';
import { storeDidChange } from './utils';
import { LocalizeContext } from './LocalizeContext';
import { withLocalize } from './withLocalize';
import type { Options, TranslatePlaceholderData, TranslateFunction, Language} from './localize';

export type TranslateProps = {
  id?: string,
  options?: Options,
  data?: TranslatePlaceholderData,
  children?: any|TranslateChildFunction
};

type TranslateState = {
  hasUpdated: boolean;
};

export type TranslateChildFunction = (
  translate: TranslateFunction, 
  activeLanguage: Language, 
  languages: Language[]) => any;

export class Translate extends React.Component<any, any> {

  unsubscribeFromStore: any;

  constructor(props: TranslateProps) {
    super(props);
    
    this.state = {
      hasAddedDefaultTranslation: false
    };
  }

  componentDidMount() {
    this.setState({ hasAddedDefaultTranslation: true });
  }

  addDefaultTranslation(context) {
    if (this.state.hasAddedDefaultTranslation) {
      return;
    }
    
    const { id, children, options = {}, languages } = this.props;
    const defaultLanguage = options.defaultLanguage || context.defaultLanguage;

    if (children === undefined || typeof children === 'function') {
      return;
    }

    if (options.ignoreTranslateChildren ) {
      return;
    }
    
    if (id !== undefined && defaultLanguage !== undefined) {
      const translation = ReactDOMServer.renderToStaticMarkup(children);
      context.addTranslationForLanguage({[id]: translation}, defaultLanguage);
    }
  }

  renderChildren(context) {
    const { id = '', options, data } = this.props;

    this.addDefaultTranslation(context);

    return typeof this.props.children === 'function'
      ? this.props.children(context)
      : (context.translate(id, data, options): any);
  }

  render() {
    return (
      <LocalizeContext.Consumer>
        { context => this.renderChildren(context) }
      </LocalizeContext.Consumer>
    );
  }
}

