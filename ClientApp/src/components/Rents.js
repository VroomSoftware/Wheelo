import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from '../i18n';
import $ from 'jquery'; 
import { Button } from 'react-bootstrap';
import { AddRentModal } from './Modals/Rents/AddRentModal';


export class Rents extends Component {
    static displayName = Rents.name;

    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            rents: [],
            vehicles: [],
            loading: true,
            currentRent: {
                "Id": 0,
                "EndDate": "",
                "StartDate": "",
                "State": 0,
                "StartPole": {
                    "Id": 0
                },
                "EndPole": {
                    "Id": 0
                },
                "User": {
                    "Id":0
                },
                "Vehicle": {
                    "Id":0
                },
                "EndPoleId": 0,
                "StartPoleId": 0,
                "UserId": 0,
                "VehicleId": 0,
                "StartKm": 0,
                "EndKm": 0
            },

        };
        i18n.loadNamespaces('rent_data');
    }

    componentDidMount() {
        this.populateRentData();
    }


    // Function to request API to delete the rent.
    deleteRent(id) {
        $.ajax({
            url: 'https://localhost:5001/api/rent/' + id,
            method: 'delete'
        }).done((response) => {
            alert(response);
        });
    }

    // Generate the rent table.
    renderRentsTable(rents) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>{i18n.t('rent_data:start')}</th>
                        <th>{i18n.t('rent_data:finish')}</th>
                        <th>{i18n.t('rent_data:nbSeats')}</th>
                        <th>
                            <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>{i18n.t('rent_data:button.add')}</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {rents.map(rent => {

                        if (rent.State == 2) {
                            return (
                                <tr key={rent.Id}>
                                    <td>{i18n.t('rent_data:the')}{rent.StartDate.split("T00:00:00")} <br />{i18n.t('rent_data:at')}{rent.StartPoleName} </td>
                                    <td>{i18n.t('rent_data:the')}{rent.EndDate.split("T00:00:00")} <br />{i18n.t('rent_data:at')}{rent.EndPoleName} </td>
                                    <td>{rent.SeatsRemaining + "/" + rent.TotalSeats}</td>
                                    <td>
                                        <button onClick={() => this.changeSubscription(rent.Id)} class="btn btn-danger">{i18n.t('rent_data:button.subscription')}</button>
                                    </td>
                                </tr>
                            )
                        }
                    })
                        }
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.renderRentsTable(this.state.rents);

        return (
            <div>
                <AddRentModal
                    show={this.state.addModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.addModalShow = false;
                    }}
                />
            
                <h1 id="tabelLabel" >{i18n.t('rent_data:title')}</h1>
                <p>{i18n.t('rent_data:subtitle')}</p>
                {contents}
            </div>
        );
    }

    // Function to refresh data list and update the data table.
    refreshDatas() {
        
        this.populateRentData();
        this.populateVehicles();
        this.forceUpdate();
        console.log(this.state.rents)
    }
    async populateVehicles() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/vehicle', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.vehicles = await response.json();
        console.log(this.state.vehicles)
        this.setState({ loading: false });
    }
    // Function to call the API to get the rent list.
    async populateRentData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/rent', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.rents = await response.json();
        console.log(this.state.rents)
        this.setState({ loading: false });
    }
}
