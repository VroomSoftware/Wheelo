import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import i18n from '../i18n';
import $ from 'jquery'; 
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { AddRentModal } from './Modals/Rents/AddRentModal';


export class RentRequests extends Component {
    static displayName = RentRequests.name;

    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            rentrequests: [],
            loading: true,
            currentRent: {
                "Id": 0,
                "EndDate": "",
                "StartDate": "",
                "State": 0,
                "StartPoleId": 1,
                "EndPoleId": 1,
                "UserId": 1,
                "VehicleId": 1,
                "StartKm": 0,
                "EndKm": 0, 
                "currentStartPoleName": "", 
                "currentEndPoleName":""
            },
            vehicles: []
        };
        this.populateVehicles();
        i18n.loadNamespaces('rent_requests_data');
    }

    componentDidMount() {
        this.populateRentRequestsData();
    }
    populateVehicles() {
        $.ajax({
            url: 'https://localhost:5001/api/vehicle',
            type: "GET",
            data: "",
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.state.vehicles = JSON.parse(response);
        });
    }
    // Function to request API to delete the rent request.
    deleteRentRequest(id) {
        $.ajax({
            url: 'https://localhost:5001/api/rent/' + id,
            method: 'delete'
        }).done((response) => {
            alert(response);
        });
    }
    getStartPole(id) {
        $.ajax({
            url: 'https://localhost:5001/api/pole' + id,
            type: "GET",
            data: "",
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            var currentStartPole = JSON.parse(response);
            this.state.currentStartPoleName = currentStartPole.name;
        });
    }
    getEndPole(id) {
        $.ajax({
            url: 'https://localhost:5001/api/pole' + id,
            type: "GET",
            data: "",
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            var currentEndPole = JSON.parse(response);
            this.state.currentEndPoleName = currentEndPole.name;
            console.log(currentEndPole.name);
            return currentEndPole.name;
        });
    }
    renderVehicles(vehicles) {
        return (<Form.Control name="Vehicle" as="select">
            {vehicles.map(vehicle =>
                <option value={vehicle.Id}>{vehicle.Name}</option>
            )}
        </Form.Control>);
    }
    updateRent(event) {
        console.log();
        let datas = {
        "Id": parseInt(event.target.RentId.value),
        "StartDate": event.target.RentStartDate.defaultValue.split(",")[0],
        "State" : 2,
        "EndDate": event.target.RentEndDate.defaultValue.split(",")[0],
        "StartPoleId": parseInt(event.target.RentStartPoleId.defaultValue),
        "EndPoleId": parseInt(event.target.RentEndPoleId.defaultValue),
        "VehicleId": parseInt(event.target.Vehicle.options[event.target.Vehicle.options.selectedIndex].value),
        "TotalSeats": parseInt(event.target.RentTotalSeats.value),
        "SeatsRemaining": parseInt(event.target.RentSeatsRemaining.value),
        "UserId": 1,
        "EndKm": parseInt(event.target.RentStartKm.defaultValue),
        "StartKm": parseInt(event.target.RentStartKm.defaultValue),
        };
        $.ajax({
            url: 'https://localhost:5001/api/rent',
            type: "PUT",
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.props.onHide();
        }).fail((response) => {
            console.log(response);
        });

    }
    handleSubmitForm(event) {
        event.preventDefault();
        this.updateRent(event);
    }
    // Generate the rent request table.
    renderRentRequestsTable(rentRequests) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>


                    </tr>
                </thead>
                <tbody>
                    {
                        rentRequests.map(rentRequest => {

                            if (rentRequest.State == 0) {
                                return (
                                    <tr key={rentRequest.Id}>
                                        <row>
                                            <Form onSubmit={event => this.handleSubmitForm(event)}>

                                                <Form.Group as={Col} controlId="RentId">
                                                    <Form.Control name="RentId" as="input" type="hidden" value={rentRequest.Id}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentStartDate">
                                                    <Form.Control name="RentStartDate" as="input" type="hidden" value={rentRequest.StartDate.split("T00:00:00")}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentEndDate">
                                                    <Form.Control name="RentEndDate" as="input" type="hidden" value={rentRequest.EndDate.split("T00:00:00")}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentUserName">
                                                    <Form.Control name="RentUserName" as="input" type="hidden" value={rentRequest.UserName}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentStartPoleId">
                                                    <Form.Control name="RentStartPoleName" as="input" type="hidden" value={rentRequest.StartPole.Id}>
                                                </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentEndPoleId">
                                                    <Form.Control name="RentEndPoleId" as="input" type="hidden" value={rentRequest.EndPole.Id}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentStartKm">
                                                    <Form.Control name="RentStartKm" as="input" type="hidden" value={rentRequest.StartKm}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentEndKm">
                                                    <Form.Control name="RentEndKm" as="input" type="hidden" value={rentRequest.EndKm}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentSeatsRemaining">
                                                    <Form.Control name="RentSeatsRemaining" as="input" type="hidden" value={rentRequest.SeatsRemaining}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentUserId">
                                                    <Form.Control name="RentUserId" as="input" type="hidden" value={rentRequest.UserId}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="RentTotalSeats">
                                                    <Form.Control name="RentTotalSeats" as="input" type="hidden" value={rentRequest.TotalSeats}>
                                                    </Form.Control>
                                                </Form.Group>

                                                <td>
                                                    {i18n.t('rent_requests_data:the')}{rentRequest.StartDate.split("T00:00:00")}
                                                    <br />{i18n.t('rent_requests_data:at')}{rentRequest.StartPoleName}
                                                </td>
                                                <td>
                                                    {i18n.t('rent_requests_data:the')}{rentRequest.EndDate.split("T00:00:00")}
                                                    <br />{i18n.t('rent_requests_data:at')}{rentRequest.EndPoleName}
                                                </td>

                                                <td>
                                                    <Form.Group as={Col} controlId="Vehicle">
                                                        {this.renderVehicles(this.state.vehicles)}
                                                    </Form.Group>
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-primary">{i18n.t('rent_requests_data:button.validate')}</button>
                                                </td>

                                                <td>
                                                    <button onClick={() => this.deleteRentRequest(rentRequest.Id)} class="btn btn-danger">{i18n.t('rent_requests_data:button.refuse')}</button>
                                                </td>
                                            </Form>
                                        </row>
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
        let contents = this.renderRentRequestsTable(this.state.rentrequests);

        return (
            <div>
                <AddRentModal
                    show={this.state.addModalShow}
                    onHide={() => {
                        this.refreshDatas();
                        this.state.addModalShow = false;
                    }}
                />
            
                <h1 id="tabelLabel" >{i18n.t('rent_requests_data:title')}</h1>
                <p>{i18n.t('rent_requests_data:subtitle')}</p>
                {contents}
            </div>
        );
    }

    // Function to refresh data list and update the data table.
    refreshDatas() {
        
        this.populateRentRequestsData();
        this.forceUpdate();
        console.log(this.state.rentrequests)
    }

    // Function to call the API to get the rentRequest list.
    async populateRentRequestsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/rent', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        this.state.rentrequests = await response.json();
        //console.log(this.state.rentrequests);
        this.setState({ loading: false });
    }

}
