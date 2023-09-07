import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [repoName, setRepoName] = useState('');
    const [token, setToken] = useState('');
    const [owner, setOwner] = useState('');

    const listWorkflows = async () => {
        try {
            const response = await axios.post('http://localhost:80/listWorkflows', {
                token,
                repoName,
                owner
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)} />
            <input type="text" placeholder="Repo Name" onChange={e => setRepoName(e.target.value)} />
            <input type="password" placeholder="Token" onChange={e => setToken(e.target.value)} />
            <button onClick={listWorkflows}>List Workflows</button>
        </div>
    );
}

export default App;
