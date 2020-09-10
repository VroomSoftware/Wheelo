import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import $ from 'jquery';
import i18n from 'i18next';

export class EditBrandModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentbrand: {
                "Id": "-1",
                "Name": ""
            },
            Id: ""
        };
        i18n.loadNamespaces('brand');
    }

    // Ran when the modal receive new data.
    componentWillReceiveProps(nextProps) {
        this.state.currentbrand = nextProps.currentbrand;
    }

    // Function ran when submit the edit form.
    handleSubmitForm(event) {

        event.preventDefault();
        this.state.newName = event.target.Name.value;
        this.editBrand();

    }

    // Function to send the brand to the API.
    editBrand() {

        // Create new data to send.
        let datas = {
            "Id": this.state.currentbrand.Id,
            "Name": this.state.newName
        };

        // API request to edit the brand.
        $.ajax({
            url: 'https://localhost:5001/api/brand',
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
                        {i18n.t('fuel:modal_edit_title')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form onSubmit={event => this.handleSubmitForm(event)}>

                            <Form.Group controlId="formBrandId" hidden>
                                <Form.Label>Id</Form.Label>
                                <Form.Control name="Id" type="number" placeholder="Id" />
                            </Form.Group>

                            <Form.Group controlId="formBrandName">
                                <Form.Label>
                                    {i18n.t('fuel:modal_edit_name')}</Form.Label>
                                <Form.Control name="Name" type="text" defaultValue={this.state.currentbrand.Name} placeholder="Name" />
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                {i18n.t('fuel:modal_edit_button_edit')}</Button>

                            <Button variant="danger" onClick={this.props.onHide}>
                                {i18n.t('fuel:modal_edit_button_close')}</Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}