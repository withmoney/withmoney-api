module.exports = (sequelize, DataTypes) => {
  const Journals = sequelize.define('Journals', {
    type: {
      type: DataTypes.ENUM('transfers'),
    },
  }, {});
  Journals.associate = ({ Users }) => {
    Journals.belongsTo(Users);
  };
  return Journals;
};
