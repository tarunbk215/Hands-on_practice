package com.junit.aaa;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

/**
 * A BankAccount class to demonstrate AAA pattern testing
 */
public class BankAccount {
    private String accountNumber;
    private String accountHolderName;
    private BigDecimal balance;
    private boolean isActive;
    private List<String> transactionHistory;
    
    public BankAccount(String accountNumber, String accountHolderName) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = BigDecimal.ZERO;
        this.isActive = true;
        this.transactionHistory = new ArrayList<>();
        addTransaction("Account opened with balance: $0.00");
    }
    
    public BankAccount(String accountNumber, String accountHolderName, BigDecimal initialBalance) {
        this(accountNumber, accountHolderName);
        if (initialBalance.compareTo(BigDecimal.ZERO) > 0) {
            this.balance = initialBalance.setScale(2, RoundingMode.HALF_UP);
            addTransaction("Initial deposit: $" + this.balance.toString());
        }
    }
    
    public void deposit(BigDecimal amount) {
        if (!isActive) {
            throw new IllegalStateException("Cannot deposit to inactive account");
        }
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        
        BigDecimal roundedAmount = amount.setScale(2, RoundingMode.HALF_UP);
        balance = balance.add(roundedAmount);
        addTransaction("Deposit: $" + roundedAmount.toString() + " | Balance: $" + balance.toString());
    }
    
    public void withdraw(BigDecimal amount) {
        if (!isActive) {
            throw new IllegalStateException("Cannot withdraw from inactive account");
        }
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount.compareTo(balance) > 0) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        
        BigDecimal roundedAmount = amount.setScale(2, RoundingMode.HALF_UP);
        balance = balance.subtract(roundedAmount);
        addTransaction("Withdrawal: $" + roundedAmount.toString() + " | Balance: $" + balance.toString());
    }
    
    public void transfer(BankAccount targetAccount, BigDecimal amount) {
        if (!isActive) {
            throw new IllegalStateException("Cannot transfer from inactive account");
        }
        if (!targetAccount.isActive()) {
            throw new IllegalStateException("Cannot transfer to inactive account");
        }
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Transfer amount must be positive");
        }
        if (amount.compareTo(balance) > 0) {
            throw new IllegalArgumentException("Insufficient funds for transfer");
        }
        
        BigDecimal roundedAmount = amount.setScale(2, RoundingMode.HALF_UP);
        
        // Withdraw from source account
        this.withdraw(roundedAmount);
        // Deposit to target account
        targetAccount.deposit(roundedAmount);
        
        // Update transaction history
        addTransaction("Transfer out: $" + roundedAmount.toString() + " to " + targetAccount.getAccountNumber());
        targetAccount.addTransaction("Transfer in: $" + roundedAmount.toString() + " from " + this.accountNumber);
    }
    
    public void closeAccount() {
        if (balance.compareTo(BigDecimal.ZERO) != 0) {
            throw new IllegalStateException("Cannot close account with non-zero balance");
        }
        isActive = false;
        addTransaction("Account closed");
    }
    
    public BigDecimal getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public String getAccountHolderName() {
        return accountHolderName;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public List<String> getTransactionHistory() {
        return new ArrayList<>(transactionHistory);
    }
    
    public int getTransactionCount() {
        return transactionHistory.size();
    }
    
    private void addTransaction(String transaction) {
        transactionHistory.add(transaction);
    }
    
    @Override
    public String toString() {
        return String.format("BankAccount{accountNumber='%s', accountHolderName='%s', balance=%s, active=%s}", 
                           accountNumber, accountHolderName, balance, isActive);
    }
}
