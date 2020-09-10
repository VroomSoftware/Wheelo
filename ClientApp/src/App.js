import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Emprunts } from './components/Emprunts';
import './custom.css';
import i18n from './i18n';
import { PoleData } from './components/PoleData';
import { Vehicles } from './components/Vehicles';
import { Fuels } from './components/Fuels';
import { VehicleBrands } from './components/VehicleBrands';
import { CarModels } from './components/CarModels';
import { Rents } from './components/Rents';
import { RentRequests } from './components/RentRequests';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: i18n.lng
        };

        this.onLanguageChanged = this.onLanguageChanged.bind(this)
    }

    componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged)
    }

    componentWillUnmount() {
        i18n.off('languageChanged', this.onLanguageChanged)
    }

    onLanguageChanged(lng) {
        this.setState({
            lng: lng
        })
    }
    static displayName = App.name;

    render() {
        let lng = this.state.lng;

        const changeLanguage = lng => {
            i18n.changeLanguage(lng);
        };

        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/pole' component={PoleData} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <Route path='/emprunts' component={Emprunts} />
                <Route path='/vehicles' component={Vehicles} />
                <Route path='/fuels' component={Fuels} />
                <Route path='/brands' component={VehicleBrands} />
                <Route path='/carmodels' component={CarModels} />
                <Route path='/rents' component={Rents} />
                <Route path='/rentrequests' component={RentRequests} />


            </Layout>
        );
    }
}
