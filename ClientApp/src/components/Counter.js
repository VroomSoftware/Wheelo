import React, { Component } from 'react';
import i18n from '../i18n';

export class Counter extends Component {
    static displayName = Counter.name;

    constructor(props) {
        super(props);

        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }


    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        i18n.loadNamespaces('counter');
        return (
            <div>
                <h1>{i18n.t('counter:title')}</h1>

                <p>{i18n.t('counter:subtitle')}</p>

                <p aria-live="polite">{i18n.t('counter:counter')}<strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>{i18n.t('counter:increment')}</button>
            </div>
        );
    }
}
