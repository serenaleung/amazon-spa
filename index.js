const DOMAIN = 'http://localhost:3000'
const API_TOKEN = 'SMCI7yFYD2ipdcfhzg24EhYs3wcktHyJmjS2QlRUsjs'

function getQuestions() {
return fetch('${DOMAIN}/api/v1/products?api_token=${API_TOKEN}')
	.then(function (res) {return res.json()})
}

function getQuestion (id) {
	return fetch(`${DOMAIN}/api/v1/questions/${id}?api_token=${API_TOKEN}`)
	.then(function (res) { return res.json() })
