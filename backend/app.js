const express = require('express')
const cors=require('cors')
const app = express()
const db=require('./untils/db');
const  routes  = require('./routes/routes');
const path=require('path')
const User=require('./model/users')
const Freelancer=require('./model/freelancer');
const Employee=require('./model/employee');
const Jobs=require('./model/job');
const Proposals=require('./model/proposal')
const favJob=require('./model/favJobs');

const port = 8000;

var corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'images')));
app.use('/',routes)


app.use((err, req, res, next) => {
    res.json({msg:err.data,flag:false})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
