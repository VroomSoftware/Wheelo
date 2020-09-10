import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from '../i18n';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
        i18n.loadNamespaces('fetch_data');
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>{i18n.t('common:date')}</th>
                        <th>{i18n.t('fetch_data:temp_c')}</th>
                        <th>{i18n.t('fetch_data:temp_f')}</th>
                        <th>{i18n.t('fetch_data:summary')}</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{i18n.t(`fetch_data:weather.${forecast.summary}`)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>{i18n.t('common:loading')}</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >{i18n.t('fetch_data:title')}</h1>
                <p>{i18n.t('fetch_data:subtitle')}</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch('weatherforecast', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
