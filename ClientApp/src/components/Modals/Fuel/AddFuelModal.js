import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import i18n from 'i18next';
import $ from 'jquery';

export class AddFuelModal extends Component {

    constructor(props) {
        super(props);
        this.state = { newName: "", Id: 0 };
        i18n.loadNamespaces('fuel');
    }

    // Function ran when submit the add form.
    handleSubmitForm(event) {
        event.preventDefault();

        this.state.Id = 0;
        this.state.newName = event.target.Name.value;
        this.addFuel();
    }

    // Function to add a new fuel into the API.
    addFuel() {

        // Create new data to be send to the API.
        let datas = {
            "Id": this.state.Id,
            "Name": this.state.newName,
        };

        // API request to add the new fuel.
        $.ajax({
            url: 'https://localhost:5001/api/fuel',
            type: "POST",
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.props.onHide();
        });

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

                            <Form.Group controlId="formFuelName">
                                <Form.Label>
                                    {i18n.t('fuel:modal_add_name')}</Form.Label>
                                <Form.Control name="Name" type="text" placeholder="Name" />
                            </Form.Group>
                                                     
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