module.exports = (sequelize, DataTypes) => {
  const Journals = sequelize.define('Journals', {
    type: {
      type: DataTypes.ENUM('transfers', 'repeat'),
    },
    repeatType: {
      type: DataTypes.ENUM('day', 'week', 'month', 'year'),
      defaultValue: null,
    },
    repeatAmount: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  }, {});
  Journals.associate = ({ Users }) => {
    Journals.belongsTo(Users);
  };
  return Journals;
};
