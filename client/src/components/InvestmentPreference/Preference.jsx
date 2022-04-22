import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"
import Axios from 'axios'

import { Container } from 'react-bootstrap'

import Box from '@mui/material/Box';

import 'bootstrap/dist/css/bootstrap.min.css';

function Preference() {

  const { currentUser } = useAuth()
  const userID = currentUser.uid

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState(0)
  const [wageMonthly, setWageMonthly] = useState(0)
  const [initialInvest, setinitialInvest] = useState(0)
  const [riskLevel, setRiskLevel] = useState(1) // 1: low; 2: medium; 3: high; 4: high

  const addUser = (event) => {
    event.preventDefault();
    
    Axios.post("http://localhost:3001/adduser", {
        userID: userID,
        firstName: firstName,
        lastName: lastName,
        age: age,
        wageMonthly: wageMonthly,
        initialInvest, initialInvest,
        riskLevel: riskLevel
    }).then(() => {
        console.log("success") // make good use of the userList without click, not applicable in this situation with ... destrcutor
    });
};

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "600px", maxHeight:"1000px" }}>
                <Card>
                    <Card.Body>
                    <h4 className="text-center mb-4">Personal Information Collection </h4>
                    
                    <Form>
                        <Form.Group id="first name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Input your name" required onChange={(event)=>{setFirstName(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group id="last name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Input your name" required onChange={(event)=>{setLastName(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group id="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Input your age" required onChange={(event)=>{setAge(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group id="wage">
                        <Form.Label>Your Monthly Wage (in USD)</Form.Label>
                        <Form.Control type="number" placeholder="Input your monthly salary" required onChange={(event)=>{setWageMonthly(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group id="investmentAmount">
                        <Form.Label>Initial investment amount (in USD)</Form.Label>
                        <Form.Control type="number" placeholder="Input your initial capital" required onChange={(event)=>{setinitialInvest(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group id="riskLevel">
                        <Form.Label>Risk acceptance level</Form.Label>
                        <div>
                            <select name="Risk acceptance level  " onChange={(event)=>{setRiskLevel(event.target.value)}}>
                                <option value={4}>Very High</option>
                                <option value={3}>High</option>
                                <option value={2}>Medium</option>
                                <option value={1}>Low</option>
                            </select>
                        </div>
                        </Form.Group>

                        <Button className="mt-3" type="submit" variant="primary" onClick={addUser}>
                          Save
                        </Button>
                    </Form>
                    </Card.Body>
                    <div className="w-100 text-center mt-2">
                      <Link to='/'>Go to dashboard</Link>
                    </div>
                </Card>
            </div>
      </Container>
    </>
  )
}

export default Preference;


