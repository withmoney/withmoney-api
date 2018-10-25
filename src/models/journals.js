module.exports = (sequelize, DataTypes) => {
  const Journals = sequelize.define('Journals', {
    type: {
      type: DataTypes.ENUM('transfers', 'repeat'),
      repeatAmount: DataTypes.INTEGER,
      repeatType: DataTypes.ENUM('day', 'week', 'month', 'year'),
    },
  }, {});
  Journals.associate = ({ Users }) => {
    Journals.belongsTo(Users);
  };
  return Journals;
};
