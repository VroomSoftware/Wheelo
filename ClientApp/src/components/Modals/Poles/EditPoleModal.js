import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import i18n from 'i18next';
import $ from 'jquery';

export class EditPoleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentpole: {
                "Id": "-1",
                "Name": "",
                "Address": "",
                "City": "",
                "Cp": ""
            },
            newName: "",
            newAddress: "",
            newCity: "",
            newCp: "",
            Id: ""
        };

        i18n.loadNamespaces('pole_data');
    }

    // Ran when the modal receive new data.
    componentWillReceiveProps(nextProps) {
        this.state.currentpole = nextProps.currentpole;
    }

    // Function ran when submit the edit form.
    handleSubmitForm(event) {

        event.preventDefault();
        this.state.newName = event.target.Name.value;
        this.state.newAddress = event.target.Address.value;
        this.state.newCity = event.target.City.value;
        this.state.newCp = event.target.Cp.value;

        this.editPole();

    }

    // Function to send the pole to the API.
    editPole() {

        // Create new data to send.
        let datas = {
            "Id": this.state.currentpole.Id,
            "Name": this.state.newName,
            "Address": this.state.newAddress,
            "City": this.state.newCity,
            "Cp": this.state.newCp
        };

        // API request to edit the pole.
        $.ajax({
            url: 'https://localhost:5001/api/pole',
            type: "PUT",
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            this.props.onHide();
        }).fail((response) => {
            console.log(response);
        });
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
                        {i18n.t('pole_data:modal_edit_title')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form onSubmit={event => this.handleSubmitForm(event)}>

                            <Form.Group controlId="formPoleId" hidden>
                                <Form.Label>Id</Form.Label>
                                <Form.Control name="Id" type="number" placeholder="Id" />
                            </Form.Group>

                            <Form.Group controlId="formPoleName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="Name" type="text" defaultValue={this.state.currentpole.Name} placeholder="Name" />
                            </Form.Group>

                            <Form.Group controlId="formPoleAddress">
                                <Form.Label>
                                    {i18n.t('fuel:modal_edit_address')}</Form.Label>
                                <Form.Control defaultValue={this.state.currentpole.Address} name="Address" />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formPoleCity">
                                    <Form.Label>
                                        {i18n.t('fuel:modal_edit_city')}</Form.Label>
                                    <Form.Control defaultValue={this.state.currentpole.City} name="City" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formPoleCp">
                                    <Form.Label>{i18n.t('fuel:modal_edit_cp')}</Form.Label>
                                    <Form.Control defaultValue={this.state.currentpole.Cp} name="Cp" />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" type="submit" >{i18n.t('fuel:modal_edit_button_edit')}</Button>

                            <Button variant="danger" onClick={this.props.onHide}>{i18n.t('fuel:modal_edit_button_close')}</Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}