import React from 'react';
import { withLocalize, Translate } from 'react-localize-redux';
import LanguageToggle from './LanguageToggle';
import globalTranslations from './translations/global.json';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.props.initialize([
      { name: 'English', code: 'en' }, 
      { name: 'French', code: 'fr' }, 
      { name: 'Spanish', code: 'es' }
    ]);

    this.props.addTranslation(globalTranslations);
  }

  render() {
    return (
      <div>
        <LanguageToggle />
        <h1>
          <Translate id="title">Title</Translate>
        </h1>
      </div>
    );
  }
}

export default withLocalize(Main);