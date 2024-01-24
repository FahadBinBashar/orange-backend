const sequelize = require('../utils/db');

const { DataTypes } = require('sequelize');

const UserData = sequelize.define('userData', {
  flowId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  flowName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  docsExpiryStatus: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  expired: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  deviceFingerprint: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  documents: {
    type: DataTypes.JSON,
  },
  steps: {
    type: DataTypes.JSON,
  },
  hasProblem: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = UserData;
