import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from '../i18n';
import $ from 'jquery';

import { Button } from 'react-bootstrap';
import { AddFuelModal } from './Modals/Fuel/AddFuelModal';
import { EditFuelModal } from './Modals/Fuel/EditFuelModal';

export class Fuels extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fuels: [],
            currentfuel: {
                "Id": "0",
                "Name": "",
            },
            loading: true,
            addModalShow: false,
            editModalShow: false
        };
        i18n.loadNamespaces('fuel');
        this.deleteFuel = this.deleteFuel.bind(this);
    }

    componentDidMount() {
        this.populateFuelsData();
    }

    // Function to check if the deleted fuel is really deleted. 
    isDeleted(id) {
        var isDeleted = true;
        for (var fuelCurrent in this.fuels) {
            if (isDeleted && fuelCurrent.Id == id) {
                isDeleted = false;
            }
        }
        return isDeleted;
    }

    // Function ran when the delete button is pressed.
    deleteFuel(id) {
        $.ajax({
            url: 'https://localhost:5001/api/fuel/' + id,
            method: 'delete'
        }).done((response) => {
            if (this.isDeleted(response.Id)) {
                this.setState({ fuels: JSON.parse(response) });
                this.forceUpdate();
            }
        });
    }

    // Function ran when the edit button is pressed. It will show the edit modal.
    editFuel(fuel) {
        this.setState({ currentfuel: fuel, editModalShow: true });
    }

    // Function to refresh data list and update the data table.
    refreshDatas() {
        this.populateFuelsData();    
        this.forceUpdate();
    }

    // Function to create the data table and populate its.
    renderFuelsTable(fuels) {
        return (
            <table className='table table-striped' aria-labelledby='tabelLabel'>
                <thead>
                    <tr>
                        <th>{i18n.t('fuel:name')}</th>
                        <th><Button
                            variant='primary'
                            onClick={() => this.setState({ addModalShow: true })}
                        >{i18n.t('fuel:button.add')}</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {fuels.map(fuel =>
                        <tr id={'fuelListeRows_' + fuel.Id} key={fuel.Id}>

                            <td>{fuel.Name}</td>

                            <td>
                                <button onClick={() => this.editFuel(fuel)} class='btn btn-warning' style={{ marginRight: 1 + 'em' }}>{i18n.t('fuel:button.edit')}</button>
                                <button onClick={() => this.deleteFuel(fuel.Id)} class='btn btn-danger'>{i18n.t('fuel:button.delete')}</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div>
                <h1 id='tabelLabel' >{i18n.t('fuel:title')}</h1>
                <p>{i18n.t('fuel:subtitle')}</p>
                <div id='fuelTable'>
                    {this.renderFuelsTable(this.state.fuels)}
                </div>

                <AddFuelModal
                    id="addFuelModal"
                    show={this.state.addModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.addModalShow = false;
                    }}
                />
                <EditFuelModal
                    id="editFuelModal"
                    show={this.state.editModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.editModalShow = false;
                    }}
                    currentfuel={this.state.currentfuel}
                />
            </div>
        );
    }

    // Function to get data list.
    async populateFuelsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/fuel', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.fuels = await response.json();

        this.setState({ loading: false });
    }
}
