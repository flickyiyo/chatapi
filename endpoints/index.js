var router = require('express').Router();
var Users = require('../controllers/Users');
var Rooms = require('../controllers/Rooms');

router.get('/users', Users.getUsers);
router.get('/users/:id', Users.getUser);
router.post('/users', Users.postUser);
router.put('/users/:id', Users.putUser);
router.delete('/users/:id', Users.deleteUser);
router.post('/login', Users.login);

router.get('/rooms/', Rooms.getRoom);
router.get('/rooms/:id', Rooms.getUserRooms);
router.post('/rooms', Rooms.postRoom);
router.put('/rooms', Rooms.putRoom);
router.delete('/rooms/:id', Rooms.deleteRoom);

module.exports = router;
