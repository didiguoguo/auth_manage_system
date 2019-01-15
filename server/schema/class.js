/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class', {
    id: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    class_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    begin_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    end_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    begin_address: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    course_plan: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    tableName: 'class'
  });
};
