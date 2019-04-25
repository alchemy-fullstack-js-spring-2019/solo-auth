## Token Based Authentication

* cross-origin resource sharing (CORS)

*  cross-site request forgery (CSRF)

* Token based authentication is stateless. We are not storing any information about our user on the server or in a session.

* 
    1. User Requests Access with Username / Password
    1. Application validates credentials
    1. Application provides a signed token to the client
    1. Client stores that token and sends it along with every request
    1. Server verifies token and responds with data
* token should be sent in the HTTP header so that we keep with the idea of stateless HTTP requests.

* 