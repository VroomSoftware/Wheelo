import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import i18n from 'i18next';
import $ from 'jquery';

export class EditCarModelModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCarModel: {
                "Id": -1,
                "Name": "Test",
                "NbSeats": 0,
                "BrandId": 0,
            },
            brands: []
        };
        this.populateBrands();
    }

    // Ran when the modal receive new data.
    componentWillReceiveProps(nextProps) {
        this.state.currentCarModel = nextProps.currentCarModel;
    }

    // Function ran when submit the edit form.
    handleSubmitForm(event) {

        event.preventDefault();
        this.state.newName = event.target.Name.value;
        this.state.newNbSeats = event.target.NbSeats.value;
        this.state.newBrandId = event.target.formCarModelBrand.value;
        this.editCarModel();

    }

    // Function to send the carModel to the API.
    editCarModel() {

        // Create new data to send.
        let datas = {
            "Id": this.state.currentCarModel.Id,
            "Name": this.state.newName,
            "NbSeats": parseInt(this.state.newNbSeats),
            "BrandId": parseInt(this.state.newBrandId)

        };
        
        // API request to edit the carModel.
        $.ajax({
            url: 'https://localhost:5001/api/carModel',
            type: "PUT",
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.props.onHide();
        }).fail((response) => {
            console.log(response);
        });
    }

    renderBrands(brands) {
        return (<Form.Control as="select" defaultValue={this.state.currentCarModel.BrandId}>
            {brands.map(brand =>
                <option value={brand.Id}>{brand.Name}</option>
            )}
        </Form.Control>);
    }

    // Function to return the modal.
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
                        Edit car model
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form onSubmit={event => this.handleSubmitForm(event)}>

                            <Form.Group controlId="formCarModelName">
                                <Form.Label>{i18n.t('carmodel:modal_name_label')}</Form.Label>
                                <Form.Control name="Name" type="text" defaultValue={this.state.currentCarModel.Name} placeholder="Name" />
                            </Form.Group>

                            <Form.Group controlId="NbSeats">
                                <Form.Label>{i18n.t('carmodel:modal_number_seat')}</Form.Label>
                                <Form.Control as="select" defaultValue={this.state.currentCarModel.NbSeats}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formCarModelBrand">
                                <Form.Label>{i18n.t('carmodel:modal_brand')}</Form.Label>
                                {this.renderBrands(this.state.brands)}
                            </Form.Group>

                                                    
                            <Button variant="primary" type="submit">{i18n.t('carmodel:modal_button_edit')}</Button>

                            <Button variant="danger" onClick={this.props.onHide}>{i18n.t('carmodel:modal_button_close')}</Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    populateBrands() {
        $.ajax({
            url: 'https://localhost:5001/api/brand',
            type: "GET",
            data: "",
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.state.brands = JSON.parse(response);
        });
    }
}