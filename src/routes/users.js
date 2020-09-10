const { Router } = require('express');
const router = Router();

import {createUser, getUsers , deleteUser,updateUser, getOneUser} from '../controllers/user.controller'
// /api/users
router.post('/', createUser);
router.get('/', getUsers);

//api/roles/:id
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.get("/:id", getOneUser);
module.exports = router;