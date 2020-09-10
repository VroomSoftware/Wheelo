import React, { Component } from 'react';
import i18n from '../i18n';

export class Emprunts extends Component {
  static displayName = Emprunts.name;

  constructor(props) {
    super(props);
  }

    render() {
        i18n.loadNamespaces('loans');
    return (
      <div>
            <h1>{i18n.t('loans:title')}</h1>
      </div>
    );
  }
}
