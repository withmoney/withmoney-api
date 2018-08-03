module.exports = {
  up: queryInterface => (
    queryInterface.renameColumn('Transactions', 'transationDate', 'transactionDate')
  ),
  down: queryInterface => (
    queryInterface.renameColumn('Transactions', 'transactionDate', 'transationDate')
  ),
};
