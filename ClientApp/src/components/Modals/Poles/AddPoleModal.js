import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import i18n from 'i18next';
import $ from 'jquery';

export class AddPoleModal extends Component {

    constructor(props) {
        super(props);
        this.state = { newName: "", newAddress: "", newCity: "", newCp: "", Id: 0 };
        i18n.loadNamespaces('pole_data');
    }

    // Function ran when submit the add form.
    handleSubmitForm(event) {
        event.preventDefault();

        this.state.Id = 0;
        this.state.newName = event.target.Name.value;
        this.state.newAddress = event.target.Address.value;
        this.state.newCity = event.target.City.value;
        this.state.newCp = event.target.Cp.value;

        this.addPole();
    }

    // Function to add a new pole into the API.
    addPole() {

        // Create new data to be send to the API.
        let datas = {
            "Id": this.state.Id,
            "Name": this.state.newName,
            "Address": this.state.newAddress,
            "City": this.state.newCity,
            "Cp": this.state.newCp
        };

        // API request to add the new pole.
        $.ajax({
            url: 'https://localhost:5001/api/pole',
            type: "POST",
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.props.onHide();
        });
        //.fail((response) => {
        //    console.log("fail")
        //    console.log(response)
        //})
        //.always((response) => {
        //    console.log("always");
        //    console.log(response);
        //});
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
                        {i18n.t('fuel:modal_add_title')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form onSubmit={event => this.handleSubmitForm(event)}>

                            <Form.Group controlId="formPoleName">
                                <Form.Label>
                                    {i18n.t('fuel:modal_add_name')}</Form.Label>
                                <Form.Control name="Name" type="text" placeholder="Name" />
                            </Form.Group>

                            <Form.Group controlId="formPoleAddress">
                                <Form.Label>
                                    {i18n.t('fuel:modal_add_address')}</Form.Label>
                                <Form.Control name="Address" />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formPoleCity">
                                    <Form.Label>
                                        {i18n.t('fuel:modal_add_city')}</Form.Label>
                                    <Form.Control name="City" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formPoleCp">
                                    <Form.Label>
                                        {i18n.t('fuel:modal_add_cp')}</Form.Label>
                                    <Form.Control name="Cp" />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" type="submit">
                                {i18n.t('fuel:modal_add_button_add')}</Button>

                            <Button variant="danger" onClick={this.props.onHide}>
                                {i18n.t('fuel:modal_add_button_close')}</Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}