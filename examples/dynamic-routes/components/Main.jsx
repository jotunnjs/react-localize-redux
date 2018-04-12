import React from 'react';
import { initialize, addTranslation, LocalizeContext } from 'react-localize-redux';

export class Main extends React.Component {

  constructor(props) {
    super(props);

    const json = require('../assets/global.locale.json');

    this.props.dispatch(initialize([
      { name: 'English', code: 'en' }, 
      { name: 'French', code: 'fr' }, 
      { name: 'Spanish', code: 'es' }
    ]));

    
    this.props.dispatch(addTranslation(json));
  }

  renderStuff(locale, translate) {
    console.log('translations', locale.translations);

    return locale.languages.length > 0
      ? <h1>{translate('welcome-page')}</h1>
      : <p>No languages yet!</p>;
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>

        <LocalizeContext.Consumer>
          {({ locale, translate }) => 
            this.renderStuff(locale, translate)
          }
        </LocalizeContext.Consumer>
      </div>
    );
  }
}