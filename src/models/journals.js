module.exports = (sequelize, DataTypes) => {
  const Journals = sequelize.define('Journals', {
    type: {
      type: DataTypes.ENUM('transfers', 'repeat'),
    },
    repeatType: {
      type: DataTypes.ENUM('day', 'week', 'month', 'year'),
    },
    repeatAmount: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Journals.associate = ({ Users }) => {
    Journals.belongsTo(Users);
  };
  return Journals;
};
