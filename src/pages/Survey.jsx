import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Premises from './Premises'; 

const Survey = () => {
  const [validated, setValidated] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);
  const [numOfPremises, setNumOfPremises] = useState(0);  
  const [currentPremisesIndex, setCurrentPremisesIndex] = useState(0);  
  

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleNext = () => {
    setShowNextForm(true);
  };

  const handlePrevious = () => {
    setShowNextForm(false); 
    setCurrentPremisesIndex(0);  // it gets reset to the prev form when going back to the main form
  };

  const handlePremisesChange = (e) => {
    setNumOfPremises(Number(e.target.value));
  };

  const goToNextPremises = () => {
    if (currentPremisesIndex < numOfPremises - 1) {
      setCurrentPremisesIndex(currentPremisesIndex + 1);
    }
  };

  const goToPreviousPremises = () => {
    if (currentPremisesIndex > 0) {
      setCurrentPremisesIndex(currentPremisesIndex - 1);
    }
  };

  return (
    <>

    
      {!showNextForm ? (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
       
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Client Name</Form.Label>
              <Form.Control required type="text" placeholder="Client Name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Site name</Form.Label>
              <Form.Control required type="text" placeholder="Site name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Business Category</Form.Label>
              <Form.Select required>
                <option>Open this select menu</option>
                <option value="1">Category One</option>
                <option value="2">Category Two</option>
                <option value="3">Category Three</option>
              </Form.Select>
            </Form.Group>
          </Row>

     
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>City</Form.Label>
              <Form.Select required>
                <option>Open this select menu</option>
                <option value="1">City One</option>
                <option value="2">City Two</option>
                <option value="3">City Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>State</Form.Label>
              <Form.Select required>
                <option>Open this select menu</option>
                <option value="1">State One</option>
                <option value="2">State Two</option>
                <option value="3">State Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom06">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {['Site Incharge', 'Commercial Incharge', 'Location Incharge', 'Referal'].map((incharge, index) => (
            <div key={index}>
              <h2>{incharge}</h2>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId={`validation${incharge}Name`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control required type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId={`validation${incharge}Email`}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control required type="text" placeholder="Email" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId={`validation${incharge}Phone`}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control required type="text" placeholder="Phone" minLength={10} maxLength={10} />
                </Form.Group>
              </Row>
              <hr />
            </div>
          ))}

       
          <Row className="mb-3">
            <h2>Sent Proposal To</h2>
            {['Site Incharge', 'Commercial Incharge', 'Location Incharge'].map((incharge, index) => (
              <Form.Group as={Col} md="4" key={index} controlId={`proposal${index}`}>
                <Form.Check inline label={incharge} type="checkbox" id={`proposalCheckbox${index}`} />
              </Form.Group>
            ))}
          </Row>

          <Row className="mb-3">
            <h2>Services Required</h2>
            {['Service One', 'Service Two', 'Service Three'].map((service, index) => (
              <Form.Group as={Col} md="4" key={index} controlId={`service${index}`}>
                <Form.Check inline label={service} type="checkbox" id={`serviceCheckbox${index}`} />
              </Form.Group>
            ))}
          </Row>

          <Row className="mb-3">
            <h2>Additional Services</h2>
            {['Additional One', 'Additional Two', 'Additional Three'].map((service, index) => (
              <Form.Group as={Col} md="4" key={index} controlId={`additionalService${index}`}>
                <Form.Check inline label={service} type="checkbox" id={`additionalServiceCheckbox${index}`} />
              </Form.Group>
            ))}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <Form.Label>Type of Premises</Form.Label>
              <Form.Select required>
                <option>--Select--</option>
                <option value="1">Premises</option>
               
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Label>No. of Premises</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="No. of Premises"
                onChange={handlePremisesChange}
              />
            </Form.Group>
            </Row>

           

     
          <Button type="button" onClick={handleNext} className="me-2">
            Next
          </Button>
          <Button type="submit">Save & Continue</Button>
        </Form>
        
      ) : (
        <div>
          {currentPremisesIndex < numOfPremises && (
            <Premises key={currentPremisesIndex} onPrevious={handlePrevious} />
          )}

          <Button
            onClick={goToPreviousPremises}
            disabled={currentPremisesIndex === 0}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            onClick={goToNextPremises}
            disabled={currentPremisesIndex === numOfPremises - 1}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default Survey;
