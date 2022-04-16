import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import { Container } from 'react-bootstrap'

export default function Preference() {
  const ageRef = useRef()
  const wageRef = useRef()
  const amountRef = useRef()
  const riskLevelRef = useRef()
  const nameRef = useRef()
  const { setup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      //await setup(amountRef.current.value, nameRef.current.value, riskLevelRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "600px", maxHeight:"1000px" }}>
                <Card>
                    <Card.Body>
                    <h4 className="text-center mb-4">Personal Information Collection </h4>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Input your name" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group id="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Input your age" ref={ageRef} required />
                        </Form.Group>
                        <Form.Group id="wage">
                        <Form.Label>Wage (in annual)</Form.Label>
                        <Form.Control type="number" placeholder="Input your annual salary" ref={wageRef} required />
                        </Form.Group>
                        <Form.Group id="investmentAmount">
                        <Form.Label>Initial investment amount (in USD)</Form.Label>
                        <Form.Control type="number" placeholder="Input your initial capital" ref={amountRef} required />
                        </Form.Group>
                        <Form.Group id="riskLevel">
                        <Form.Label>Risk acceptance level</Form.Label>
                        <div>
                            <select name="Risk acceptance level  ">
                                <option>Very High</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                        Save
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
            </div>
      </Container>
    </>
  )
}
