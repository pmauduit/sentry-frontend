const express = require('express');
const fs = require('fs');

const app = express();
const port = 5000;

const sampleData = fs.readFileSync("src/sampleData.json");
const sampleDataSingleIssue = fs.readFileSync("src/sampleDataSingleIssue.json");
const sampleDataSingleIssueTag = fs.readFileSync("src/sampleDataSingleIssueTag.json");


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/issues', (req, res) => {
  res.send(sampleData);
});

app.get('/issues/:issueId', (req, res) => {
  res.send(sampleDataSingleIssue);
});

app.get('/issues/:issueId/tags/:tagKey', (req, res) => {
  res.send(sampleDataSingleIssueTag);
});


