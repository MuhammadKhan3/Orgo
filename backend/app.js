const express = require('express')
const cors=require('cors')
const app = express()
const db=require('./untils/db');
const User=require('./model/users')
const  routes  = require('./routes/routes');
const port = 8000;
var corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.json())
app.use(cors(corsOptions))
app.use('/',routes)

app.use((err, req, res, next) => {
    console.log(err);
    res.json({msg:err.data,flag:false})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
