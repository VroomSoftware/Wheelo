import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from '../i18n';
import $ from 'jquery';

import { Button } from 'react-bootstrap';
import { AddCarModelModal } from './Modals/CarModel/AddCarModelModal';
import { EditCarModelModal } from './Modals/CarModel/EditCarModelModal';

export class CarModels extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carmodels: [],
            currentcarmodel: {
                "Id": 0,
                "Name": "",
                "BrandId": 0,
                "NbSeats": 0
            },
            loading: true,
            addModalShow: false,
            editModalShow: false
        };
        i18n.loadNamespaces('carmodel');
        this.deleteCarModel = this.deleteCarModel.bind(this);
    }

    componentDidMount() {
        this.populateCarModelsData();
    }

    // Function to check if the deleted carmodel is really deleted. 
    isDeleted(id) {
        var isDeleted = true;
        for (var carmodelCurrent in this.carmodels) {
            if (isDeleted && carmodelCurrent.Id == id) {
                isDeleted = false;
            }
        }
        return isDeleted;
    }

    // Function ran when the delete button is pressed.
    deleteCarModel(id) {
        $.ajax({
            url: 'https://localhost:5001/api/carmodel/' + id,
            method: 'delete'
        }).done((response) => {
            if (this.isDeleted(response.Id)) {
                this.setState({ carmodels: JSON.parse(response) });
                this.forceUpdate();
            }
        });
    }

    // Function ran when the edit button is pressed. It will show the edit modal.
    editCarModel(carmodel) {
        this.setState({ currentcarmodel: carmodel, editModalShow: true });

    }
    // Function to refresh data list and update the data table.
    refreshDatas() {
        this.populateCarModelsData();    
        this.forceUpdate();
    }

    // Function to create the data table and populate its.
    renderCarModelsTable(carmodels) {
        return (
            <table className='table table-striped' aria-labelledby='tabelLabel'>
                <thead>
                    <tr>
                        <th>{i18n.t('carmodel:name')}</th>
                        <th>{i18n.t('carmodel:nb_seat')}</th>
                        <th>{i18n.t('carmodel:brand')}</th>
                        <th>{i18n.t('carmodel:actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {carmodels.map(carmodel =>
                        <tr id={'carmodelListeRows_' + carmodel.Id} key={carmodel.Id}>

                            <td>{carmodel.Name}</td>
                            <td>{carmodel.NbSeats}</td>
                            <td>{carmodel.BrandName}</td>

                            <td>
                                <button onClick={() => this.editCarModel(carmodel)} class='btn btn-warning' style={{ marginRight: 1 + 'em' }}>{i18n.t('carmodel:button_edit')}</button>
                                <button onClick={() => this.deleteCarModel(carmodel.Id)} class='btn btn-danger'>{i18n.t('carmodel:button_delete')}</button>
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
                <h1 id='tabelLabel' >{i18n.t('carmodel:title')}</h1>
                <p>{i18n.t('carmodel:subtitle')}</p>
                <div id='carmodelTable'>
                    {this.renderCarModelsTable(this.state.carmodels)}
                </div>
                <Button
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                >{i18n.t('carmodel:button_add')}</Button>

                <AddCarModelModal
                    id="addCarModelModal"
                    show={this.state.addModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.addModalShow = false;
                    }}
                />
                <EditCarModelModal
                    id="editCarModelModal"
                    show={this.state.editModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.editModalShow = false;
                    }}
                    currentCarModel={this.state.currentcarmodel}
                />
            </div>
        );
    }

    getBrand(brandId) {
        this.populateBrands();
        console.log(brandId);
        return this.state.brands.find(brand => brand.Id = brandId);
    }

    // Function to get data list.
    async populateCarModelsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/carmodel', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.carmodels = await response.json();

        this.setState({ loading: false });
        }
}
