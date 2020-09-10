import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import $ from 'jquery';
import i18n from 'i18next';

export class EditVehicleModal extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: 'white',
            currentVehicle: {
                "Id": 0,
                "Name": "",
                "Color": "",
                "DateMec": "",
                "IsActive": false,
                "Km": "",
                "Model": {
                    "Id": 0
                },
                "Pole": {
                    "Id": 0
                },
                "Registration": "",
                "Fuel": {
                    "Id": 0
                },
                "Images": "",
                "VehicleKey": [],
                "Rent": []
            },
            fuels: [],
            models: [],
            poles: []
        };
        this.populateFuels();
        this.populatePoles();
        this.populateModels();
        i18n.loadNamespaces('vehicle_data');
    }

    componentWillReceiveProps(nextProps) {
        this.state.currentVehicle = nextProps.currentVehicle;
    }

    renderFuels(fuels) {
        return (<Form.Control name="Fuel" as="select" defaultValue={this.state.currentVehicle.Fuel.Id}>
            {fuels.map(fuel =>
                <option value={fuel.Id}>{fuel.Name}</option>
            )}
        </Form.Control>);
    }
    renderPoles(poles) {
        return (<Form.Control name="Pole" as="select" defaultValue={this.state.currentVehicle.Pole.Id}>
            {poles.map(pole =>
                <option value={pole.Id}>{pole.Name}</option>
            )}
        </Form.Control>);
    }
    renderModels(models) {
        return (<Form.Control name="Model" as="select" defaultValue={this.state.currentVehicle.Model.Id}>
            {models.map(model =>
                <option value={model.Id}>{model.Name}</option>
            )}
        </Form.Control>);
    }
    handleChange(event) {
        this.setState({ value: event.target });
    }

    handleSubmitForm(event) {
        event.preventDefault();

        this.state.Id = this.state.currentVehicle.Id ;
        this.state.newName = event.target.Name.value;
        this.state.newColor = event.target.Color === undefined ? "" : event.target.Color.value;
        this.state.newDateMec = event.target.DateMec.value;
        this.state.newIsActive = event.target.IsActive.checked;
        this.state.newKm = event.target.Km.value;
        this.state.newModelId = event.target.Model.value;
        this.state.newPoleId = event.target.Pole.value;
        this.state.newRegistration = event.target.Registration.value;
        this.state.newFuelId = event.target.Fuel.value;

        this.editVehicle();
    }
    editVehicle() {
        // Create new data to send.
        let datas = {
            "Id": this.state.Id,
            "Name": this.state.newName,
            "Color": this.state.newColor,
            "DateMec": this.state.newDateMec,
            "IsActive": this.state.newIsActive,
            "Km": parseInt(this.state.newKm),
            "ModelId": parseInt(this.state.newModelId),
            "PoleId": parseInt(this.state.newPoleId),
            "Registration": this.state.newRegistration,
            "FuelId": parseInt(this.state.newFuelId),
            "VehicleKey": [],
            "Rent": [],
            "Images": []
        };
        console.log(datas)
        // API request to edit the fuel.
        $.ajax({
            url: 'https://localhost:5001/api/vehicle',
            type: "PUT",
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.props.onHide();
        }).fail((response) => {
            console.log(response);
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {i18n.t('vehicle_data:modal_edit_title')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form onSubmit={event => this.handleSubmitForm(event)}>

                            <Form.Row>

                                {/* POLE */}
                                <Form.Group as={Col} controlId="Pole">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_pole')}</Form.Label>
                                    {this.renderPoles(this.state.poles)}  
                                </Form.Group>
                                {/* FIN POLE */}

                            </Form.Row>

                            <Form.Row>
                                {/* NAME */}
                                <Form.Group as={Col} controlId="Name">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_name')} : </Form.Label>
                                    <Form.Control name="Name" type="text" defaultValue={this.state.currentVehicle.Name} placeholder="Name" />
                                </Form.Group>
                                {/* FIN NAME */}
                            </Form.Row>

                            {/* COULEUR */}
                            <Form.Row>
                                <Form.Group as={Col} controlId="Color">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_color')} : </Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.currentVehicle.Color}>
                                        <option value="white">blanche</option>
                                        <option value="green">verte</option>
                                        <option value="red">rouge</option>
                                        <option value="black">noire</option>
                                        <option value="purple">violette</option>
                                    </Form.Control>
                                </Form.Group>
                                {/* FIN COULEUR */}

                                {/* FUEL */}
                                <Form.Group as={Col} controlId="Fuel">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_fuel')}</Form.Label>
                                    {this.renderFuels(this.state.fuels)}
                                </Form.Group>

                            </Form.Row>
                            {/* FIN FUEL */}

                            <Form.Row>

                                {/* MODEL */}
                                <Form.Group as={Col} controlId="Model">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_model')}</Form.Label>
                                    {this.renderModels(this.state.models)}
                                </Form.Group>
                                {/* FIN MODEL */}

                                {/* REGISTRATION */}
                                <Form.Group as={Col} controlId="Registration">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_registration')} : </Form.Label>
                                    <Form.Control name="Registration" type="text" defaultValue={this.state.currentVehicle.Registration} placeholder="Registration" />
                                </Form.Group>
                                {/* FIN REGISTRATION */}

                                {/* KILOMETRES */}
                                <Form.Group as={Col} controlId="Km">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_kilometer')} : </Form.Label>
                                    <Form.Control name="Kilometers" type="text" defaultValue={this.state.currentVehicle.Km} placeholder="Kilometers" />
                                </Form.Group>
                                {/* FIN KILOMETRES */}
                            </Form.Row>

                            <Form.Row>
                                {/* DATEMEC */}
                                <Form.Group as={Col} controlId="DateMec">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_date_mec')}</Form.Label>
                                    <Form.Control type="date" defaultValue={this.state.currentVehicle.DateMec != undefined ? this.state.currentVehicle.DateMec.split("T")[0] : ""}>
                                    </Form.Control>
                                </Form.Group>
                                {/* FIN DATEMEC */}

                                {/* ISACTIVE */}
                                <Form.Group controlId="formPoleIsActive">
                                    <Form.Label>{i18n.t('vehicle_data:modal_edit_is_active')}</Form.Label>
                                    <Form.Check type="checkbox" name="IsActive" defaultChecked={this.state.currentVehicle.IsActive}/>
                                    
                                </Form.Group>
                                {/* FIN ISACTIVE */}

                            </Form.Row>
                        <Form.Row>
                                <Button variant="danger" onClick={this.props.onHide}>{i18n.t('vehicle_data:modal_edit_button_close')}</Button>
                                <Button variant="primary" type="submit">{i18n.t('vehicle_data:modal_edit_button_edit')}</Button>
                        </Form.Row>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    populateFuels() {
        $.ajax({
            url: 'https://localhost:5001/api/fuel',
            type: "GET",
            data: "",
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.state.fuels = JSON.parse(response);
        });
    }
    populatePoles() {
        $.ajax({
            url: 'https://localhost:5001/api/pole',
            type: "GET",
            data: "",
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.state.poles = JSON.parse(response);
        });
    }
    populateModels() {
        $.ajax({
            url: 'https://localhost:5001/api/CarModel',
            type: "GET",
            data: "",
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.state.models = JSON.parse(response);
        });
    }
}