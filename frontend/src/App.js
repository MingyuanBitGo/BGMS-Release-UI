import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Container } from 'react-bootstrap';

function App() {
  const [repoName, setRepoName] = useState('');
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [workflows, setWorkflows] = useState([]);

  const listWorkflows = async () => {
    try {
      const response = await axios.post('http://localhost:80/listWorkflows', {
        token,
        repoName,
        owner
      });
      setWorkflows(response.data.workflows);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>GitHub Workflows</h1>
      <Form>
        <Form.Group controlId="formOwner">
          <Form.Label>Owner</Form.Label>
          <Form.Control type="text" placeholder="Enter owner" onChange={e => setOwner(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formRepoName">
          <Form.Label>Repository</Form.Label>
          <Form.Control type="text" placeholder="Enter repository name" onChange={e => setRepoName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formToken">
          <Form.Label>Token</Form.Label>
          <Form.Control type="password" placeholder="Enter token" onChange={e => setToken(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={listWorkflows}>
          List Workflows
        </Button>
      </Form>

      {(
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map(workflow => (
              <tr key={workflow.id}>
                <td>{workflow.id}</td>
                <td>{workflow.name}</td>
                <td>{workflow.state}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default App;
