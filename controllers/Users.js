var Sequelize = require('sequelize');
var sequelize = require('../connection');
var User = require('../models/user')(sequelize, Sequelize);

function getUser(req, res){
  const id = req.params.id;
  User.findOne({
    where:{ id:parseInt(id) }
  }).then(T => {
    res.status(200).send(T);
  }).catch(err => {
    res.status(500).send(err);
  })
}

function getUsers(req, res){
  User.findAll().then(T => {
    res.status(200).send(T)
  }).catch(err => {
    res.status(500).send(err);
  })
}

function postUser(req, res){
  let {username, email, password, type}  = req.body;
  User.create({
    username,
    email,
    password,
    type
  }).then(T => {
    res.status(200).send(T);
  }).catch(err => {
    res.status(500).send(err)
  })
}

function putUser(req, res){
  const id = req.params.id;
  const {username, email, password, type} = req.body;
  User.update({
    username, email, password, type
  }, {
    where:{
      id:parseInt(id)
    }
  }).then(T => {
    res.status(200).send(T);
  }).catch(err => {
    res.status(500).send(err);
  })
}

function deleteUser(req, res){
  const id = req.params.id;
  User.findById(id).then(T => {
    //res.status(200).send(T);
    return T.destroy()
  }).then(deleted => {
    res.status(200).send(deleted)
  }).catch(err => {
    res.status(500).send(err);
  })
}

function login(req, res){
  const {username, password} = req.body;
  User.findOne({
    where:{ username, password }
  }).then(U => res.status(200).send(U))
    .catch(err => res.status(500).send(err));
}

module.exports = {
  getUser,
  login,
  getUsers,
  deleteUser,
  postUser,
  putUser
}