const request = require('supertest')
const app = require('./app')
const { matchers } =require('jest-json-schema');
expect.extend(matchers);

//HTTP 200
describe('Reply Endpoint', () => {
  it('should return a response', async () => {
    const res = await request(app)
      .get('/reply')
      .send({
        botId: "5f74865056d7bb000fcd39ff",
        message: "Bye"
      })
    expect(res.statusCode).toEqual(200)
  })
})

//Endpoint return a reply and not error
describe('Reply Endpoint', () => {
    it('validates my json',async () => {
        const res = await request(app)
        .get('/reply')
        .send({
          botId: "5f74865056d7bb000fcd39ff",
          message: "Bye"
        })
      
        const schema = {
          properties: {
            reply: { type: 'string' },
          },
          required: ['reply'],
        };
        expect({ reply: 'Test' }).toMatchSchema(schema);
      });
 
  })
  