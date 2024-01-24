const express = require('express');
const app = express();

const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('dotenv').config();


app.use(cors())

const sequelize = require('./utils/db')

app.get('/wucapi',(req,res)=>{
  res.send('<p>TEST</p>')
})

app.use('/wucapi',require('./routes/mati-routes'));

const port = process.env.PORT || 3000;


sequelize.sync({
  force: false
}).then(() => {
  app.listen(port, () => {
    console.log('server is running on port: ' + port);
  });
  
})

