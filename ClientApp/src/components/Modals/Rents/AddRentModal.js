import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import $ from 'jquery';
import authService from '../../api-authorization/AuthorizeService'


export class AddRentModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newStartDate: "",
            newEndDate: "",
            newStartPole: "",
            newEndPole: "",
            newVehicle:"",
            newUser:"",
            Id: 0,
            poles: []
        };
        this.populatePoles();
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
   
    renderPoles(poles) {
        return (<Form.Control name="Pole" as="select">
            {poles.map(pole =>
                <option value={pole.Id}>{pole.Name}</option>
            )}
        </Form.Control>);
    }
    // Function ran when submit the add form.
    handleSubmitForm(event) {
        event.preventDefault();
        
        this.state.Id = 0;
        this.state.newStartDate = event.target.StartDate.value;
        this.state.newEndDate = event.target.EndDate.value;
        this.state.newStartPoleId = event.target.StartPole.value;
        this.state.newEndPoleId = event.target.EndPole.value;
        this.state.newVehicleId = 1;
        this.state.newTotalSeats = 5;
        this.state.newSeatsRemaining = 4;
        this.state.newStartKm = 1;
        this.state.newEndKm = 3;
        this.state.newUserId = this.test();
        this.addRent();
    }

    async test() {
     /*  const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
     */await Promise.resolve(authService.getUser().sub);

    }
    // Function to add a new rent into the API.
    addRent() {
            
        // Create new data to be send to the API.
        let datas = {
            "Id": this.state.Id,
            "StartDate": this.state.newStartDate,
            "EndDate": this.state.newEndDate,
            "StartPoleId": parseInt(this.state.newStartPoleId),
            "EndPoleId": parseInt(this.state.newEndPoleId),
            "VehicleId": this.state.newVehicleId,
            "TotalSeats": this.state.newTotalSeats,
            "SeatsRemaining": this.state.newSeatsRemaining,
            "UserId": 0,
            "EndKm": this.state.newEndKm,
            "StartKm": this.state.newStartKm
        };

        // API request to add the new rent.
        $.ajax({
            url: 'https://localhost:5001/api/rent',
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
                        Add rent
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form onSubmit={event => this.handleSubmitForm(event)}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="StartDate">
                                <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date">
                                    </Form.Control>
                            </Form.Group>

                                <Form.Group as={Col} controlId="EndDate">
                                <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date">
                                    </Form.Control>
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="StartPole">
                                    <Form.Label>Start Pole</Form.Label>
                                    {this.renderPoles(this.state.poles)}
                                </Form.Group>

                                <Form.Group as={Col} controlId="EndPole">
                                    <Form.Label>EndPole</Form.Label>
                                    {this.renderPoles(this.state.poles)}
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                            <Button variant="primary" type="submit">Add</Button>
                            </Form.Row>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}