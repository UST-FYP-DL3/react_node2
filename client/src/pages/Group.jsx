import React, {useEffect, useState} from 'react'

import Table from '../components/table/Table'

import Axios from 'axios'

import customerList from '../assets/JsonData/customers-list.json'

import { Container, Card, Tabs, Tab, Row, Col, InputGroup, FormControl, Button, Form, Nav } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import PropTypes from 'prop-types';
import TabsMUI from '@mui/material/Tabs';
import TabMUI from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
    {value === index && (
        <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
        </Box>
    )}
    </div>
);
}

TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

function Group() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [isINGroup, setisINGroup] = useState();

    const [idHeader, setIdHeader] = useState( () => {return <h5>{joinGroup === false? "You have not joined any group" : "Your Group ID: 001"}</h5>} )

    // function Header() {
    //     return <h5>{joinGroup === false? "You have not joined any group" : "Your Group ID: 001"}</h5>
    // }

    // useEffect( () => {
    //     setisINGroup(true);
    // });

    function quitGroup() {
        setisINGroup(false);
        setIdHeader(() => {return <h5>You have not joined any group</h5>});
    }

    function joinGroup() {
        setisINGroup(true);
        setIdHeader(() => {return <h5>Your Group ID: 001</h5>});
    }

    // team members table data
    const teamMembersGroup = {
        head: ["Name", "Investment", "Percentage"],
        body: [{
            "name": "Eric Ma",
            "Investment": 10000,
            "Percentage": "25%"
        },
        {
            "name": "Samson Fung",
            "Investment": 10000,
            "Percentage": "25%"
        },
        {
            "name": "Ryan Ling",
            "Investment": 20000,
            "Percentage": "50%"
        }
    ]}
    
    const renderTableHead = (item, index) => (
    <th key={index}>{item}</th>
    )
    const renderteamMembersGroupBody = (item, index) => (
    <tr key={index}>
        <td>{item.name}</td>
        <td>{item.Investment}</td>
        <td>{item.Percentage}</td>
    </tr>
    )

    return (
        <div>
            {/* <h2 className='container-div'>Group</h2> joinGroup === false)? <h3>You have not joined any group.</h3> : <h3>Y</h3>  */}
            {/* <h5>{joinGroup === false? "You have not joined any group" : "Your Group ID: 001"}</h5> */}
            {idHeader}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabsMUI value={value} onChange={handleChange} aria-label="basic tabs example" variant='fullWidth'>
                    <TabMUI label="Group Management" {...a11yProps(0)} />
                    <TabMUI label="Check your Group Investment" {...a11yProps(1)} disabled={isINGroup === false? true : false} />                   
                </TabsMUI>
            </Box>
            <TabPanel value={value} index={0}>
                <Row className='card full-height'>
                    <Tabs defaultActiveKey="Create by your own" id="uncontrolled-tab-example" className="col-12">
                        <Tab eventKey="Create by your own" title="Create by your own">
                            <Box variant='full-width' sx={{height: '15vh'}} />
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Group Name: </InputGroup.Text>
                                <FormControl placeholder="Username" />
                            </InputGroup>
                            <Button variant="primary" type="submit" style={{width: '15%'}} onClick={joinGroup}>
                                Submit
                            </Button>
                            <Box sx={{height: '20vh'}} />
                        </Tab>
                        <Tab eventKey="Join group by group ID" title="Join group by group ID">
                            <Box variant='full-width' sx={{height: '15vh'}} />
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon2">Group ID: </InputGroup.Text>
                                <FormControl placeholder="Group ID" />
                            </InputGroup>
                            <Button variant="primary" type="submit" style={{width: '15%'}} onClick={joinGroup}>
                                Submit
                            </Button>
                            <Box sx={{height: '20vh'}} />
                        </Tab>
                        <Tab eventKey="Ouit your group" title="Ouit your group" disabled={isINGroup === false? true : false}>
                            <Box variant='full-width' sx={{height: '15vh'}} />
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon3">Quit the group</InputGroup.Text>
                            </InputGroup>
                            <Button variant="danger" type="submit" style={{width: '15%'}} onClick={quitGroup}>
                                Quit
                            </Button>
                            <Box sx={{height: '20vh'}} />
                        </Tab>
                    </Tabs>
               </Row>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Row className='card full-height'>
                    <Col className='card__header'>
                        <h4>Team Members</h4>
                    </Col>
                    <Col>
                        <Table
                            headData={teamMembersGroup.head}
                            renderHead={(item, index) => renderTableHead(item, index)}
                            bodyData={teamMembersGroup.body}
                            renderBody={(item, index) => renderteamMembersGroupBody(item, index)}
                        />  
                    </Col>
                </Row>
                <Row className='card full-height'>
                    <h4 className='mb-3'>Action</h4>
                    <Col>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="first">Portfolio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="second">New Member</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                <Card>                                    
                                    <Card.Body>
                                    <Card.Title>Confirm Next Week's Portfolio</Card.Title>
                                        <Card.Text>
                                        Please check the recommendation 
                                        </Card.Text>
                                        <Button variant="primary">Confirm</Button>
                                    </Card.Body>
                                </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                <Card>                                    
                                    <Card.Body>
                                    <Card.Title>Request</Card.Title>
                                        <Card.Text>
                                        KC NG wants to join
                                        </Card.Text>
                                        <Button variant="primary">Accept</Button>
                                    </Card.Body>
                                </Card>                                
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                        </Tab.Container> 
                    </Col>
                </Row>
            </TabPanel>
        </div>
    )
}

// https://www.youtube.com/watch?v=re3OIOr9dJI 1:11:48
// ...userList in then() of Axios.get ... is destructor

export default Group


// using react-bootstrap
{/* <Tabs defaultActiveKey="Join a Group" id="uncontrolled-tab-example" className="col-12">
<Tab eventKey="Join a Group" title="Join a Group">

</Tab>
<Tab eventKey="Create a Group" title="Create a Group">

</Tab>
</Tabs> */}