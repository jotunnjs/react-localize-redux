import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';
import LanguageToggle from './LanguageToggle';
import globalTranslations from './translations/global.json';
import Movies from './sections/Movies';
import Books from './sections/Books';
import * as classes from './Main.css';

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
        <header>
          <LanguageToggle />
        </header>
        
        {this.props.activeLanguage &&
          <main>
            <nav>
              <NavLink to="/movies" activeClassName="active">Movies</NavLink>
              <NavLink to="/books" activeClassName="active">Books</NavLink>
            </nav>
            
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/books" component={Books} />
          </main>

        }
        
          
        
        
        {/* <h1>
          <Translate id="title">Title</Translate>
        </h1> */}
      </div>
    );
  }
}

export default withLocalize(Main);