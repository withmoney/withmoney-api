export const listDefaultOptions = {
  where: {},
  filter: null,
};

export const getModelAlias = (aliasDatabase, db) => (model) => {
  const aliasList = Object.keys(aliasDatabase);

  if (aliasList.includes(model)) {
    const alias = aliasList[aliasList.indexOf(model)];

    return {
      model: db[aliasDatabase[alias]],
      as: model,
    };
  }

  return {
    model: db[model],
  };
};
