import {InMemoryTransactionRepository} from "../../src/inMemoryTransactionRepository";
import {aDeposit, aWithdrawal, date} from "../helpers";

describe('inMemory transaction repository', () => {
  let repository;

  beforeEach(() => {
    repository = new InMemoryTransactionRepository();
  });

  test('should save a transaction', () => {
    const transaction = aDeposit(100, date(2022, 6, 8));

    repository.save(transaction);

    expect(repository.getAll()).toStrictEqual([transaction]);
  });

  test('should add a transaction', () => {
    const transaction = aDeposit(100, date(2022, 6, 8));
    writeTransactions([transaction]);
    const newTransaction = aDeposit(200, date(2022, 6, 9));

    repository.save(newTransaction);

    expect(repository.getAll()).toStrictEqual([transaction, newTransaction]);
  });

  test('should get empty list of transactions if none saved', () => {
    const retrievedTransactions = repository.getAll();

    expect(retrievedTransactions).toStrictEqual([])
  });

  test('should get all transactions', () => {
    const transactions = [
      aDeposit(100, date(2022, 6, 8)),
      aWithdrawal(200, date(2022, 6, 9))
    ];
    writeTransactions(transactions);

    const retrievedTransactions = repository.getAll();

    expect(retrievedTransactions).toStrictEqual(transactions)
  });

  function writeTransactions(transactions) {
    transactions.forEach(t => repository.save(t));
  }
});


