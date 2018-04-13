import React from 'react';
import {LocalizeContext} from 'react-localize-redux';

export const Article = props => {

  const renderStuff = (locale, translate) => {
    console.log('renderStuff', locale);

    return locale.languages.length > 0
      ? <h1>{translate('welcome-page')}</h1>
      : <p>No languages yet!</p>;
  }

  console.log('render Article');
  
  return (
    <LocalizeContext.Consumer>
      {({ locale, translate }) => 
        renderStuff(locale, translate)
      }
    </LocalizeContext.Consumer>
  );
}