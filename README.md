# Ultimate.ai Backend Challenge

## Introduction
This is a backend web server that exposes a single endpoint. This endpoint accepts a bot identifier and a visitor written message. It returns a single reply corresponding to the highest predicted intent above the confidence threshold. In order to retrieve the list of predicted intents for a given message you should use our publicly available AI API.

## Requirements
- Node ^16.10.0

## Installtion
You need to execute the following commands on the terminal screen so that you can run the project locally.

```sh
1. git clone git@github.com:pdimiropoulou/ultimate.ai.git
2. cd ultimate.ai
3. npm install
4. npm start
```
The application is running on [localhost](http://localhost:9000).

## Configuration
Configuration parameters on .env file are described below:
- PORT: The port of the web server, currently is 9000 but you can change it.
- API_KEY: The API key of publicly available AI API
- AI_URL: The AI API url
- THRESHOLD: The threshold of the confidence, if the confidence is above a certain threshold then the endpoint return a reply. Currently it is set to 0.8 but it is configurable.
- DB_URL: The URL of the Mongo db, for this project a cloud Mongo db was used
- DB_NAME: Tha name of the Mongo db
- COLLECTION: The collection that holds the replies based on the intent

### Data Structure
The data structure of mongo db documents that holds the replies is like the following
  
    [
	{
		"intent": "Greeting",
		"reply": "Hello :) How can I help you?"
	},
	{
		"intent": "Goodbye",
		"reply": "Goodbye, have a nice day!"
	},
	{
		"intent": "Affirmative",
		"reply": "Great!"
	}
	]

Every intent has its own reply.

## API

## Get reply
`GET /reply`
### Request
      curl --location --request GET 'http://localhost:9000/reply' 
    --header 'Content-Type: application/json' 
    --data-raw '
            { "botId": "5f74865056d7bb000fcd39ff",
            "message": "Hi"
            }'
  
### Response
Returns a json with the corresponding response

    {
        "reply": "Hello :) How can I help you?"
    }
If the confidence returned by the AI API is lower than the threshold , then the reposne is the follwing

    {
        "reply": "The AI could not give the correct answer"
    }
## Tests
Jest and supertest have been used for testing. The current written tests are checking if there is a valid response from the server (HTTP 200 and expected json format). In order to run the tests execute the following command within repository folder
```sh
 npm start run test
```

