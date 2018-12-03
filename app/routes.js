const routes = module.exports = require('next-routes')();

routes
    .add('createProfile', '/', 'index')
    .add('getProfile', '/armory/wow/profile/:id+', 'ProfileContainer');