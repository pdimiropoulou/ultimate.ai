const express = require('express')
const app = express()
const router = express.Router();
const morgan = require("morgan");
var cors = require('cors');
const { default: axios } = require('axios');
const env = require('dotenv').config()
const port = process.env.PORT || 9000
const reply = require('./reply')
const collection = process.env.COLLECTION

app.use(morgan('dev'))
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.get('/reply',async (request,response) => {
    try{
        //CAll API to get the intent
        const options = {
            method: 'post',
            url: `${process.env.AI_URL}`,
            headers: {
                'accept': 'application/json' ,
                'authorization':  `${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: {"botId":request.body.botId,
                    "message":request.body.message
            }
          };
          
          let resp = await axios(options);
          let intents = resp.data.intents;

          //Check if the response is valid and above a certain threshold
          if(resp.status=200 && Object.keys(intents).length>0 
          && (parseFloat(intents[0].confidence)>parseFloat(process.env.THRESHOLD))){
                //Find answer based on the intent from the API
                reply.find(collection, {"intent":intents[0].name}, (err, res) => {
                    response.json({ reply:  res[0].reply })
                });
            }
            else{
                response.json({ reply: "The AI could not give the correct answer" })
            }
           
          }
        
    catch (err) {
        console.log(err)
        response.json({ error: err });   
    }
   
});

app.use("/", router);

app.listen(port, () => {})


module.exports = app