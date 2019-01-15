/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('token', {
    token: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'token'
  });
};
