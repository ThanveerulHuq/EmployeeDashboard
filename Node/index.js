const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const employee = require('./controllers/employeeController')



app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requeted-With, Content-Type, Accept, Authorization,RBR");
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
  });


  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      error: {
        message: error.message
      }
    });
  });

  app.use('/hello',(req,res,next)=>{
      return res.send('hello world');
  });

  app.use('',employee);
  
  const PORT = 4000;
  
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });