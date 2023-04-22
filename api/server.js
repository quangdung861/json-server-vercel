// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server


// const auth = require('json-server-auth');
// const moment = require('moment');

// server.use(jsonServer.bodyParser);

// server.use((req, res, next) => {
//   if (req.method === 'POST') { 
//     req.body.createdAt = moment().valueOf();
//     req.body.updatedAt = moment().valueOf();
//   }

//   if (req.method === 'PUT') {
//     req.method = 'PATCH';
//   }

//   if (req.method === 'PATCH') {
//     req.body.updatedAt = moment().valueOf();
//   }

//   next()
// })

// server.use(auth);
