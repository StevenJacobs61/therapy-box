const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())
const Papa = require('papaparse');
const request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Server is live on port 3000");
})

app.get('/news', (req, res) => {
    request('http://feeds.bbci.co.uk/news/rss.xml', (error, response, body) => {
    if (!error) {
      res.set('Content-Type', 'text/xml');
      res.send(body);
    } else {
      res.status(500).send(error);
    }
  });
})
app.get('/clothes', (req, res) => {
    const options = {
        url: 'https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil',
        rejectUnauthorized: false
      };
    request(options, (error, response, body) => {
    if (!error) {
        console.log(body);
      res.set('Content-Type', 'application/json');
      res.send(body);
    } else {
      res.status(500).send(error);
    }
  });
})
app.post('/image', (req, res) => {
    const linkUrl = req.body.linkUrl;
    request(linkUrl, (error, response, body) => {
        if (!error) {
            res.set('Content-Type', 'application/json')
            res.status(200).send(body)
        } else if (error){
            res.status(500).send(error)
        }
    })
})
app.post('/sport', (req, res) => {
    const linkUrl = req.body.linkUrl;
    request(linkUrl, (error, response, body) => {
      if (!error) {
        console.log(response.headers);
        const results = Papa.parse(body, { header: true }); 
        res.send(results.data);
      } else {
        console.error(error);
        res.status(500).send('Failed to fetch CSV data');
      }
    });
  });
