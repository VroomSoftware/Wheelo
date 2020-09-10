import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from '../i18n';
import $ from 'jquery';

import { Button } from 'react-bootstrap';
import { AddBrandModal } from './Modals/VehicleBrand/AddBrandModal';
import { EditBrandModal } from './Modals/VehicleBrand/EditBrandModal';

export class VehicleBrands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            currentbrand: {
                "Id": "0",
                "Name": "",
            },
            loading: true,
            addModalShow: false,
            editModalShow: false
        };
        i18n.loadNamespaces('brand');
        this.deleteBrand = this.deleteBrand.bind(this);
    }

    componentDidMount() {
        this.populateBrandsData();
    }

    // Function to check if the deleted brand is really deleted. 
    isDeleted(id) {
        var isDeleted = true;
        for (var brandCurrent in this.brands) {
            if (isDeleted && brandCurrent.Id == id) {
                isDeleted = false;
            }
        }
        return isDeleted;
    }

    // Function ran when the delete button is pressed.
    deleteBrand(id) {
        $.ajax({
            url: 'https://localhost:5001/api/brand/' + id,
            method: 'delete'
        }).done((response) => {
            if (this.isDeleted(response.Id)) {
                this.setState({ brands: JSON.parse(response) });
                this.forceUpdate();
            }
        });
    }

    // Function ran when the edit button is pressed. It will show the edit modal.
    editBrand(brand) {
        this.setState({ currentbrand: brand, editModalShow: true });
    }

    // Function to refresh data list and update the data table.
    refreshDatas() {
        this.populateBrandsData();    
        this.forceUpdate();
    }

    // Function to create the data table and populate its.
    renderBrandsTable(brands) {
        return (
            <table className='table table-striped' aria-labelledby='tabelLabel'>
                <thead>
                    <tr>
                        <th>{i18n.t('brand:name')}</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map(brand =>
                        <tr id={'brandListeRows_' + brand.Id} key={brand.Id}>

                            <td>{brand.Name}</td>

                            <td>
                                <button onClick={() => this.editBrand(brand)} class='btn btn-warning' style={{ marginRight: 1 + 'em' }}>{i18n.t('brand:button.edit')}</button>
                                <button onClick={() => this.deleteBrand(brand.Id)} class='btn btn-danger'>{i18n.t('brand:button.delete')}</button>
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
                <h1 id='tabelLabel' >{i18n.t('brand:title')}</h1>
                <p>{i18n.t('brand:subtitle')}</p>
                <div id='brandTable'>
                    {this.renderBrandsTable(this.state.brands)}
                </div>
                <Button
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                >{i18n.t('brand:button.add')}</Button>

                <AddBrandModal
                    id="addBrandModal"
                    show={this.state.addModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.addModalShow = false;
                    }}
                />
                <EditBrandModal
                    id="editBrandModal"
                    show={this.state.editModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.editModalShow = false;
                    }}
                    currentbrand={this.state.currentbrand}
                />
            </div>
        );
    }

    // Function to get data list.
    async populateBrandsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/brand', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.brands = await response.json();

        this.setState({ loading: false });
    }
}
