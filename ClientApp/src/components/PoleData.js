import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from 'i18next';
import $ from 'jquery';

import { Button } from 'react-bootstrap';
import { AddPoleModal } from './Modals/Poles/AddPoleModal';
import { EditPoleModal } from './Modals/Poles/EditPoleModal';

export class PoleData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            poles: [],
            currentpole: {
                "Id": "0",
                "Name": "",
                "Address": "",
                "City": "",
                "Cp": ""
            },
            loading: true,
            addModalShow: false,
            editModalShow: false
        };
        i18n.loadNamespaces('pole_data');
        this.deletePole = this.deletePole.bind(this);
    }

    componentDidMount() {
        this.populatePoleData();
    }

    // Function to check if the deleted pole is really deleted. 
    isDeleted(id) {
        var isDeleted = true;
        for (var poleCurrent in this.poles) {
            if (isDeleted && poleCurrent.Id == id) {
                isDeleted = false;
            }
        }
        return isDeleted;
    }

    // Function ran when the delete button is pressed.
    deletePole(id) {
        $.ajax({
            url: 'https://localhost:5001/api/pole/' + id,
            method: 'delete'
        }).done((response) => {
            if (this.isDeleted(response.Id)) {
                this.setState({ poles: JSON.parse(response) });
                this.forceUpdate();
            }
        });
    }

    // Function ran when the edit button is pressed. It will show the edit modal.
    editPole(pole) {
        this.setState({ currentpole: pole, editModalShow: true });
    }

    // Function to refresh data list and update the data table.
    refreshDatas() {
        this.populatePoleData();    
        this.forceUpdate();
    }

    // Function to create the data table and populate its.
    renderPolesTable(poles) {
        return (
            <table className='table table-striped' aria-labelledby='tabelLabel'>
                <thead>
                    <tr>
                        <th>{i18n.t('pole_data:address')}</th>
                        <th>{i18n.t('pole_data:name')}</th>
                        <th>{i18n.t('pole_data:city')}</th>
                        <th>{i18n.t('pole_data:actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {poles.map(pole =>
                        <tr id={'poleListeRows_' + pole.Id} key={pole.Id}>
                            <td>{pole.Address}</td>
                            <td>{pole.Name}</td>
                            <td>{pole.City}</td>
                            <td>
                                <button onClick={() => this.editPole(pole)} class='btn btn-warning' style={{ marginRight: 1 + 'em' }}>{i18n.t('pole_data:button.edit')}</button>
                                <button onClick={() => this.deletePole(pole.Id)} class='btn btn-danger'>{i18n.t('pole_data:button.delete')}</button>
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
                <h1 id='tabelLabel' >{i18n.t('pole_data:title')}</h1>
                <p>{i18n.t('pole_data:subtitle')}</p>
                <div id='poleTable'>
                    {this.renderPolesTable(this.state.poles)}
                </div>
                <Button
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                >{i18n.t('pole_data:button.add')}</Button>

                <AddPoleModal
                    id="addPoleModal"
                    show={this.state.addModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.addModalShow = false;
                    }}
                />
                <EditPoleModal
                    id="editPoleModal"
                    show={this.state.editModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.editModalShow = false;
                    }}
                    currentpole={this.state.currentpole}
                />
            </div>
        );
    }

    // Function to get data list.
    async populatePoleData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/pole', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.poles = await response.json();

        this.setState({ loading: false });
    }
}
