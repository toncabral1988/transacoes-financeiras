import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.totalIncomes;

    const outcome = this.totalOutcomes;

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  private get totalIncomes(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(income => income.value)
      .reduce((currentValue, total) => currentValue + total, 0);
  }

  private get totalOutcomes(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(income => income.value)
      .reduce((currentValue, total) => currentValue + total, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
