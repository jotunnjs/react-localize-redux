// @flow
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { getTranslate, addTranslationForLanguage, getLanguages, getOptions, getActiveLanguage, getTranslationsForActiveLanguage } from './locale';
import { storeDidChange } from './utils';
import { LocalizeContext } from './LocalizeContext';
import { withLocalize } from './withLocalize';
import type { Options, TranslatePlaceholderData, TranslateFunction, Language} from './locale';

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

const DEFAULT_LOCALE_STATE_NAME = 'locale';
const DEFAULT_REDUX_STORE_KEY = 'store';

class TranslateComponent extends React.Component<any, any> {

  unsubscribeFromStore: any;

  constructor(props: TranslateProps) {
    super(props);

    const { id, children, languages, defaultLanguage } = this.props;

    if (children === undefined || typeof children === 'function') {
      return;
    }

    // TODO: do I really still need this option
    // if (locale.options.ignoreTranslateChildren) {
    //   return;
    // }
    
    if (id !== undefined && defaultLanguage !== undefined) {
      const translation = ReactDOMServer.renderToStaticMarkup(children);
      this.props.addTranslationForLanguage({[id]: translation}, defaultLanguage);
    }
  }

  render() {
    const { id = '', data, options, translate, activeLanguage, languages } = this.props;
    
    return typeof this.props.children === 'function'
      ? this.props.children(translate, activeLanguage, languages)
      : (translate(id, data, options): any);
  }
}

export const Translate = withLocalize(TranslateComponent);

