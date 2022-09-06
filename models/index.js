"use strict";

const Sequelize = require("sequelize");
const config = require("../config/mysqlConfig");
const environment = "production";
const databaseConfig = config[environment];

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig
);

// model 간 관계를 정의합니다.
Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

module.exports = {
  sequelize,
};
