﻿import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import i18n from 'i18next';
import $ from 'jquery';

export class AddCarModelModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newName: "", Id: 0, NbSeats: "", Brand: "", brands: []
        };
        this.populateBrands();

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
    // Function ran when submit the add form.
    handleSubmitForm(event) {
        event.preventDefault();

        this.state.Id = 0;
        this.state.newName = event.target.Name.value;
        this.state.newBrandId = event.target.Brand.value;
        this.state.newNbSeats = event.target.NbSeats.value;
        this.addCarModel();
    }

    // Function to add a new carmodel into the API.
    addCarModel() {

        // Create new data to be send to the API.
        let datas = {
            "Id": this.state.Id,
            "Name": this.state.newName,
            "BrandId": parseInt(this.state.newBrandId),
            "NbSeats": parseInt(this.state.newNbSeats,10)
        };
        console.log(datas);
        // API request to add the new carmodel.
        $.ajax({
            url: 'https://localhost:5001/api/carmodel',
            type: "POST",
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.props.onHide();
        }).fail((error)=> {
            console.log(error)
        });


    }
    renderBrands(brands) {
        console.log(brands);
        return (<Form.Control name = "Brand" as="select">
            {brands.map(brand =>
                <option value={brand.Id}>{brand.Name}</option>
            )}
        </Form.Control>);
    }

    // Function render to return the modal.
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
                        {i18n.t('carmodel:modal_add_title')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form onSubmit={event => this.handleSubmitForm(event)}>

                            <Form.Group controlId="formCarModelName">
                                <Form.Label>{i18n.t('carmodel:modal_name_label')}</Form.Label>
                                <Form.Control name="Name" type="text" placeholder="Name" />
                            </Form.Group>
                            <Form.Group controlId="NbSeats">
                                <Form.Label>{i18n.t('carmodel:modal_number_seat')}</Form.Label>
                                <Form.Control as="select">
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

                                                    
                            <Button variant="primary" type="submit">{i18n.t('carmodel:modal_button_add')}</Button>

                            <Button variant="danger" onClick={this.props.onHide}>{i18n.t('carmodel:modal_button_close')}</Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}