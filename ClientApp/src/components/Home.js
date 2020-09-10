import React, { Component } from 'react';
import i18n from '../i18n';

export class Home extends Component {

    static displayName = Home.name;

    render() {

        i18n.loadNamespaces('home');

        return (
            <div>
                <h1>Vroom Software</h1>
                <h2>{i18n.t('home:title.welcome')}</h2>
                <img src={require('./img/logo_wheelo.png')} />
            </div>
        );
    }
}
