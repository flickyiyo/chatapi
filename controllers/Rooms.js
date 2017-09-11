var Sequelize = require('sequelize');
var sequelize = require('../connection');
var Room = require('../models/room')(sequelize, Sequelize);
var uuid = require('uuid/v1');
function getUserRooms(req, res){
  const {id} = req.params;
  Room.findAll({
    where:{
      id_user:parseInt(id)
    }
  }).then(T => res.status(200).send(T) )
    .catch(err => res.status(500).send(err) )
}

function getRoom(req, res){


}

function postRoom(req, res){
  let {users, name} = req.body;
  console.log(users+name);
  console.log(req.body);
  let id = uuid();
  let response = [];
  users.map(user => {
    Room.create({
      uuid:id,
      name,
      id_user:parseInt(user)
    }).then(T=>{
      response.push(T);
    }).catch(err => {
      res.status(500).send(err);
    })
  })
  res.end();
}

function putRoom(req, res){

}

function deleteRoom(req, res){

}

module.exports = {
  getRoom,
  getUserRooms,
  deleteRoom,
  postRoom,
  putRoom
}