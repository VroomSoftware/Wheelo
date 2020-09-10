import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from '../i18n';
import $ from 'jquery'; 
import { Button } from 'react-bootstrap';
import { AddVehicleModal } from './Modals/Vehicles/AddVehicleModal';
import { EditVehicleModal } from './Modals/Vehicles/EditVehicleModal';

export class Vehicles extends Component {
    static displayName = Vehicles.name;

    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            editModalShow: false,
            vehicles: [],
            loading: true,
            currentVehicle: {
                "Id": 0,
                "Color": "",
                "DateMec": "",
                "IsActive": false,
                "Km": 0,
                "Model": {
                    "Id": 0
                },
                "Pole": {
                    "Id": 0
                },
                "Fuel": {
                    "Id": 0
                },
                "ModelId": 0,
                "PoleId": 0,
                "Registration": "",
                "FuelId": 0,
                "Images": [],
                "VehicleKey": [],
                "Rent": []
            }
        };
        i18n.loadNamespaces('vehicle_data');
        this.deleteVehicle = this.deleteVehicle.bind(this);
    }

    componentDidMount() {
        this.populateVehicleData();
    }

    // Function to request API to delete the Vehicle.
    deleteVehicle(id) {
        $.ajax({
            url: 'https://localhost:5001/api/vehicle/' + id,
            method: 'delete'
        }).done((response) => {
            alert(response);
        });
    }

    // Function ran when the edit button is pressed. This will open the modal.
    editVehicle(vehicle) {
        this.state.currentVehicle = vehicle;
        console.log(this.state.currentVehicle)
        this.setState({
            editModalShow: true
        });
    }

    // Generate the vehicle table.
    renderVehiclesTable(vehicles) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>{i18n.t('vehicle_data:name')}</th>
                        <th>{i18n.t('vehicle_data:model_name')}</th>
                        <th>{i18n.t('vehicle_data:color')}</th>
                        <th>{i18n.t('vehicle_data:fuel')}</th>
                        <th>{i18n.t('vehicle_data:km')}</th>
                        <th>{i18n.t('vehicle_data:pole')}</th>
                        <th>{i18n.t('vehicle_data:nbSeats')}</th>
                        <th>{i18n.t('vehicle_data:registration')}</th>
                        <th>
                            <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>{i18n.t('vehicle_data:button.add')}</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicle =>
                        <tr key={vehicle.Id}>
                            <td>{vehicle.Name}</td>
                            <td>{vehicle.ModelName}</td>
                            <td>{vehicle.Color}</td>
                            <td>{vehicle.FuelName}</td>
                            <td>{vehicle.Km}</td>
                            <td>{vehicle.PoleName}</td>
                            <td>{vehicle.NbSeats}</td>
                            <td>{vehicle.Registration}</td>

                            <td>
                                <button onClick={() => this.editVehicle(vehicle)} class='btn btn-warning' style={{ marginRight: 1 + 'em' }}>{i18n.t('vehicle_data:button.edit')}</button>
                                <button onClick={() => this.deleteVehicle(vehicle.Id)} class="btn btn-danger">{i18n.t('vehicle_data:button.delete')}</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.renderVehiclesTable(this.state.vehicles);

        return (
            <div>
                <AddVehicleModal
                    show={this.state.addModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.addModalShow = false;
                    }}
                />
                <EditVehicleModal
                    show={this.state.editModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.editModalShow = false;
                    }}
                    currentVehicle={this.state.currentVehicle}
                />
                <h1 id="tabelLabel" >{i18n.t('vehicle_data:title')}</h1>
                <p>{i18n.t('vehicle_data:subtitle')}</p>
                {contents}
            </div>
        );
    }

    // Function to refresh data list and update the data table.
    refreshDatas() {
        
        this.populateVehicleData();
        this.forceUpdate();
        console.log(this.state.vehicles)
    }

    // Function to call the API to get the vehicle list.
    async populateVehicleData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/vehicle', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.vehicles = await response.json();
        this.setState({ loading: false });
    }
}
