import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Envelope, Lock, Check } from 'react-bootstrap-icons';

const AddInventoryForm = () => {
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    checkMeOut: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add Inventory</h2>
      <Form onSubmit={handleSubmit} className="space-y-6">
        <Row className="mb-4">
          <Col>
            <Form.Label>Email</Form.Label>
            <div className="relative">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="userid"
                value={formData.userid}
                onChange={handleChange}
                className="py-3 pl-10 pr-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </Col>
          <Col>
            <Form.Label>Password</Form.Label>
            <div className="relative">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="py-3 pl-10 pr-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="py-3 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="py-3 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </Form.Group>

        <Row className="mb-4">
          <Col>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="py-3 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </Col>
          <Col>
            <Form.Label>State</Form.Label>
            <Form.Select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="py-3 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="py-3 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </Col>
        </Row>

        <Form.Group className="mb-6 flex items-center space-x-3">
          <Form.Check
            type="checkbox"
            label="Check me out"
            name="checkMeOut"
            checked={formData.checkMeOut}
            onChange={handleCheckboxChange}
          />
          <Check className="text-gray-600" />
        </Form.Group>

        <div className="flex justify-center">
          <Button type="submit" className="py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold focus:ring-2 focus:ring-blue-500">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddInventoryForm;
