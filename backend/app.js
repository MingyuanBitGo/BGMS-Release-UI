const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post('/listWorkflows', async (req, res) => {
    const { token, repoName, owner } = req.body;
    
    const config = {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    };
    
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/actions/workflows`, config);
        console.log('GitHub API Response:', response.data); 
        res.json(response.data);
      } catch (error) {
        console.error(error); 
        res.status(500).send(error.toString());
      }
});

app.listen(80);
