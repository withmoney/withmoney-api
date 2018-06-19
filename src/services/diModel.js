const DiModel = model => ({
  findById: (...args) => model.findById(...args),
});

export default DiModel;
