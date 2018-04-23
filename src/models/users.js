module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
  }, {});
  Users.associate = (models) => {
    Users.hasMany(models.Accounts);
  };
  return Users;
};
