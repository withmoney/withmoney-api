// import { TransactionType } from '../types/Enum';

type TransactionType = 'Income' | 'Expense';

export const accountsSeed = {
  ptBR: ['Pessoal', 'Empresa'],
  enUS: ['Individual', 'Corporate'],
};

type categoriesSeedType = {
  [key: string]: [string, TransactionType][];
};

export const categoriesSeed: categoriesSeedType = {
  ptBR: [
    ['Salário', 'Income'],
    ['Freelance', 'Income'],
    ['Emprestimo', 'Income'],
    ['FGTS', 'Income'],
    ['Ifood', 'Expense'],
    ['Compras', 'Expense'],
    ['Movéis', 'Expense'],
    ['Serviços de Internet', 'Expense'],
    ['Eletrônicos', 'Expense'],
    ['Companhia de Luz', 'Expense'],
    ['Companhia de Água', 'Expense'],
    ['Companhia de Gás', 'Expense'],
    ['Companhia de Internet', 'Expense'],
    ['Companhia de Telefone', 'Expense'],
    ['Recarga de celular', 'Expense'],
    ['Gasolina', 'Expense'],
    ['Seguro do Carro', 'Expense'],
    ['Seguro da Moto', 'Expense'],
    ['Alimentação', 'Expense'],
    ['Gastos', 'Expense'],
    ['Lanchonete', 'Expense'],
    ['Desconhecido', 'Expense'],
    ['Produto', 'Income'],
    ['Serviço', 'Income'],
    ['Imposto DAS', 'Expense'],
    ['Imposto GPS', 'Expense'],
    ['Imposto IRRS', 'Expense'],
    ['Folha de pagamentos', 'Expense'],
  ],
  enUS: [
    ['Salary', 'Income'],
    ['Freelance', 'Income'],
    ['Loan', 'Income'],
    ['Shopping', 'Expense'],
    ['Furniture', 'Expense'],
    ['Internet services', 'Expense'],
    ['Electronics', 'Expense'],
    ['Light Company', 'Expense'],
    ['Water Company', 'Expense'],
    ['Gas Company', 'Expense'],
    ['Internet Company', 'Expense'],
    ['Telephone Company', 'Expense'],
    ['Cell phone recharge', 'Expense'],
    ['Gasoline', 'Expense'],
    ['Car Insurance', 'Expense'],
    ['Motorcycle Insurance', 'Expense'],
    ['Food', 'Expense'],
    ['Spending', 'Expense'],
    ['Snack bar', 'Expense'],
    ['Unknown', 'Expense'],
    ['Product', 'Income'],
    ['Service', 'Income'],
    ['Acquisition of assets', 'Expense'],
    ['Tax', 'Expense'],
    ['Payroll', 'Expense'],
  ],
};
