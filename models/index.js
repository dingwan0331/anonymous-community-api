"use strict";

const Sequelize = require("sequelize");
const database = require("../config/mysqlConfig");
const PostClass = require("../apps/post/postModel");

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  database
);

const Post = PostClass.init(sequelize);

// model 간 관계를 정의합니다.
Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

module.exports = {
  sequelize,
  Post,
};
