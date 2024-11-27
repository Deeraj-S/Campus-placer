const express = require('express');
const {
    InsertRole,
    GetAllRoles,
    UpdateRole,
    DeleteRole,
    GetRoleById,
} = require('../controller/roleController');

const routes = express.Router();


routes.post('/insert', InsertRole);
routes.get('/get', GetAllRoles);
routes.get('/get/:id', GetRoleById)
routes.put('/update/:id', UpdateRole);
routes.delete('/delete/:id', DeleteRole);

module.exports = routes;
