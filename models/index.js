"use strict";

const NODE_ENV = process.env.NODE_ENV;
const Sequelize = require("sequelize");
const databaseConfig = require("../config/mysqlConfig")[NODE_ENV];
const PostClass = require("../apps/post/postModel");

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig
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
