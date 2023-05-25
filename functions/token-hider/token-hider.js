const process = require('process')

const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  console.log('API_PARAMS', API_PARAMS)
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { API_TOKEN, API_URL } = process.env
  const URL = `${API_URL}?key=${API_TOKEN}&libraries=places&callback=initMap`

  console.log('Constructed URL is ...', URL)

  try {
    const { data } = await axios.get(URL, { headers: { Accept: "application/json" }})
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    return {
      statusCode: 200,
      body: JSON.stringify({
        API_TOKEN: process.env.API_TOKEN,
        API_URL: process.env.API_URL,
      }),
    }
  } catch (error) {
    const { data, headers, status, statusText } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}

module.exports = { handler }
