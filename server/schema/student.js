/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    student_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    id_card_num: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    phone_num: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    job_title: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    enter_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    class_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    class_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    practise_result: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    theory_result: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    }
  }, {
    tableName: 'student'
  });
};
