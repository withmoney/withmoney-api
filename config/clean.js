import models, { sequelize } from '../src/models';

async function truncate() {
  const deleteTables = await Promise.all(Object.keys(models).map((key) => {
    if (['sequelize', 'Sequelize'].includes(key)) return null;

    return models[key].destroy({ where: {}, force: true });
  }));

  const truncateTables = await Promise.all(Object.keys(models).map(async (key) => {
    if (['sequelize', 'Sequelize'].includes(key)) return null;
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    const model = await models[key].destroy({ where: {}, truncate: true, force: true });

    return model;
  }));

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  return Promise.all([deleteTables, truncateTables]);
}

truncate().then(() => {
  process.exit();
}).catch((err) => {
  console.error(err);
  process.exit();
});
