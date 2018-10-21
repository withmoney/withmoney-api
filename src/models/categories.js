module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('in', 'out'),
  }, {});
  Categories.associate = ({ Users, Transactions }) => {
    Categories.belongsTo(Users);
    Categories.hasMany(Transactions);
  };
  return Categories;
};
