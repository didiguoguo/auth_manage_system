/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    id: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    work_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    target_name: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    target_id: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    start_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    end_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    times: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'test'
  });
};
