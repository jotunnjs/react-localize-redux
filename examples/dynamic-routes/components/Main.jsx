import React from 'react';
import { initialize, addTranslation, LocalizeContext } from 'react-localize-redux';
import { Article } from './Article';

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

  render() {
    return (
      <div>
        <h1>Hello</h1>

        <Article />
      </div>
    );
  }
}