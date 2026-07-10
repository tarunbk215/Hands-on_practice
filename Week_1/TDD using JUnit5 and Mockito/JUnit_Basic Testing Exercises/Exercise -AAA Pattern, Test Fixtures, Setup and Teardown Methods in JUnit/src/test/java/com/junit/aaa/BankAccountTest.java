package com.junit.aaa;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.AfterClass;
import static org.junit.Assert.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * Comprehensive test class demonstrating AAA (Arrange-Act-Assert) pattern
 * with proper test fixtures, setup and teardown methods
 */
public class BankAccountTest {
    
    // Test fixtures - shared test data
    private BankAccount primaryAccount;
    private BankAccount secondaryAccount;
    private BigDecimal initialBalance;
    private String primaryAccountNumber;
    private String secondaryAccountNumber;
    
    // Class-level setup for expensive operations
    @BeforeClass
    public static void setUpClass() {
        System.out.println("=== STARTING BANK ACCOUNT TEST SUITE ===");
        System.out.println("Setting up test environment...");
        // This could include database connections, file system setup, etc.
    }
    
    // Method-level setup - runs before each test
    @Before
    public void setUp() {
        System.out.println("\n--- Setting up test fixtures ---");
        
        // Arrange common test data
        primaryAccountNumber = "ACC-001";
        secondaryAccountNumber = "ACC-002";
        initialBalance = new BigDecimal("1000.00");
        
        // Create fresh instances for each test
        primaryAccount = new BankAccount(primaryAccountNumber, "John Doe", initialBalance);
        secondaryAccount = new BankAccount(secondaryAccountNumber, "Jane Smith", new BigDecimal("500.00"));
        
        System.out.println("Test fixtures ready: Primary Account=" + primaryAccount.getBalance() + 
                          ", Secondary Account=" + secondaryAccount.getBalance());
    }
    
    // Method-level teardown - runs after each test
    @After
    public void tearDown() {
        System.out.println("--- Cleaning up test fixtures ---");
        
        // Clean up resources
        primaryAccount = null;
        secondaryAccount = null;
        initialBalance = null;
        
        System.out.println("Test fixtures cleaned up");
    }
    
    // Class-level teardown
    @AfterClass
    public static void tearDownClass() {
        System.out.println("\n=== BANK ACCOUNT TEST SUITE COMPLETED ===");
        System.out.println("Cleaning up test environment...");
    }
    
    /**
     * Test deposit functionality using AAA pattern
     */
    @Test
    public void testDeposit_ValidAmount_IncreasesBalance() {
        System.out.println("TEST: testDeposit_ValidAmount_IncreasesBalance");
        
        // ARRANGE
        BigDecimal depositAmount = new BigDecimal("250.00");
        BigDecimal expectedBalance = initialBalance.add(depositAmount);
        int initialTransactionCount = primaryAccount.getTransactionCount();
        
        // ACT
        primaryAccount.deposit(depositAmount);
        
        // ASSERT
        assertEquals("Balance should increase by deposit amount", 
                    expectedBalance, primaryAccount.getBalance());
        assertEquals("Transaction count should increase by 1", 
                    initialTransactionCount + 1, primaryAccount.getTransactionCount());
        assertTrue("Account should remain active", primaryAccount.isActive());
        
        System.out.println("✓ Deposit test passed");
    }
    
    /**
     * Test withdrawal functionality using AAA pattern
     */
    @Test
    public void testWithdraw_ValidAmount_DecreasesBalance() {
        System.out.println("TEST: testWithdraw_ValidAmount_DecreasesBalance");
        
        // ARRANGE
        BigDecimal withdrawAmount = new BigDecimal("300.00");
        BigDecimal expectedBalance = initialBalance.subtract(withdrawAmount);
        int initialTransactionCount = primaryAccount.getTransactionCount();
        
        // ACT
        primaryAccount.withdraw(withdrawAmount);
        
        // ASSERT
        assertEquals("Balance should decrease by withdrawal amount", 
                    expectedBalance, primaryAccount.getBalance());
        assertEquals("Transaction count should increase by 1", 
                    initialTransactionCount + 1, primaryAccount.getTransactionCount());
        assertTrue("Account should remain active", primaryAccount.isActive());
        
        System.out.println("✓ Withdrawal test passed");
    }
    
    /**
     * Test insufficient funds scenario using AAA pattern
     */
    @Test(expected = IllegalArgumentException.class)
    public void testWithdraw_InsufficientFunds_ThrowsException() {
        System.out.println("TEST: testWithdraw_InsufficientFunds_ThrowsException");
        
        // ARRANGE
        BigDecimal withdrawAmount = new BigDecimal("1500.00"); // More than balance
        BigDecimal balanceBeforeAttempt = primaryAccount.getBalance();
        
        // ACT & ASSERT (exception expected)
        try {
            primaryAccount.withdraw(withdrawAmount);
            fail("Should have thrown IllegalArgumentException for insufficient funds");
        } catch (IllegalArgumentException e) {
            // ASSERT - verify state unchanged after failed operation
            assertEquals("Balance should remain unchanged after failed withdrawal", 
                        balanceBeforeAttempt, primaryAccount.getBalance());
            assertTrue("Account should remain active", primaryAccount.isActive());
            System.out.println("✓ Insufficient funds test passed - exception thrown as expected");
            throw e; // Re-throw for @Test(expected)
        }
    }
    
    /**
     * Test transfer functionality using AAA pattern
     */
    @Test
    public void testTransfer_ValidAmount_UpdatesBothAccounts() {
        System.out.println("TEST: testTransfer_ValidAmount_UpdatesBothAccounts");
        
        // ARRANGE
        BigDecimal transferAmount = new BigDecimal("200.00");
        BigDecimal expectedPrimaryBalance = primaryAccount.getBalance().subtract(transferAmount);
        BigDecimal expectedSecondaryBalance = secondaryAccount.getBalance().add(transferAmount);
        int primaryInitialTransactions = primaryAccount.getTransactionCount();
        int secondaryInitialTransactions = secondaryAccount.getTransactionCount();
        
        // ACT
        primaryAccount.transfer(secondaryAccount, transferAmount);
        
        // ASSERT
        // Verify source account
        assertEquals("Primary account balance should decrease", 
                    expectedPrimaryBalance, primaryAccount.getBalance());
        assertEquals("Primary account should have additional transactions", 
                    primaryInitialTransactions + 2, primaryAccount.getTransactionCount()); // withdraw + transfer out
        
        // Verify target account
        assertEquals("Secondary account balance should increase", 
                    expectedSecondaryBalance, secondaryAccount.getBalance());
        assertEquals("Secondary account should have additional transactions", 
                    secondaryInitialTransactions + 2, secondaryAccount.getTransactionCount()); // deposit + transfer in
        
        // Verify both accounts remain active
        assertTrue("Primary account should remain active", primaryAccount.isActive());
        assertTrue("Secondary account should remain active", secondaryAccount.isActive());
        
        System.out.println("✓ Transfer test passed");
    }
    
    /**
     * Test account creation using AAA pattern
     */
    @Test
    public void testAccountCreation_ValidData_CreatesActiveAccount() {
        System.out.println("TEST: testAccountCreation_ValidData_CreatesActiveAccount");
        
        // ARRANGE
        String accountNumber = "ACC-999";
        String holderName = "Test User";
        BigDecimal initialAmount = new BigDecimal("750.00");
        
        // ACT
        BankAccount newAccount = new BankAccount(accountNumber, holderName, initialAmount);
        
        // ASSERT
        assertNotNull("Account should be created", newAccount);
        assertEquals("Account number should match", accountNumber, newAccount.getAccountNumber());
        assertEquals("Account holder name should match", holderName, newAccount.getAccountHolderName());
        assertEquals("Initial balance should match", initialAmount, newAccount.getBalance());
        assertTrue("New account should be active", newAccount.isActive());
        assertTrue("Should have at least 2 transactions (opening + initial deposit)", 
                  newAccount.getTransactionCount() >= 2);
        
        System.out.println("✓ Account creation test passed");
    }
    
    /**
     * Test account closure using AAA pattern
     */
    @Test
    public void testCloseAccount_ZeroBalance_ClosesSuccessfully() {
        System.out.println("TEST: testCloseAccount_ZeroBalance_ClosesSuccessfully");
        
        // ARRANGE
        // Create account with zero balance
        BankAccount zeroBalanceAccount = new BankAccount("ACC-CLOSE", "Close Test");
        assertTrue("Account should start active", zeroBalanceAccount.isActive());
        assertEquals("Account should start with zero balance", 
                    BigDecimal.ZERO, zeroBalanceAccount.getBalance());
        
        // ACT
        zeroBalanceAccount.closeAccount();
        
        // ASSERT
        assertFalse("Account should be inactive after closing", zeroBalanceAccount.isActive());
        assertEquals("Balance should remain zero", BigDecimal.ZERO, zeroBalanceAccount.getBalance());
        
        System.out.println("✓ Account closure test passed");
    }
    
    /**
     * Test invalid deposit using AAA pattern
     */
    @Test(expected = IllegalArgumentException.class)
    public void testDeposit_NegativeAmount_ThrowsException() {
        System.out.println("TEST: testDeposit_NegativeAmount_ThrowsException");
        
        // ARRANGE
        BigDecimal negativeAmount = new BigDecimal("-50.00");
        BigDecimal balanceBeforeAttempt = primaryAccount.getBalance();
        
        // ACT & ASSERT
        try {
            primaryAccount.deposit(negativeAmount);
            fail("Should have thrown IllegalArgumentException for negative deposit");
        } catch (IllegalArgumentException e) {
            // ASSERT - verify state unchanged
            assertEquals("Balance should remain unchanged after failed deposit", 
                        balanceBeforeAttempt, primaryAccount.getBalance());
            System.out.println("✓ Negative deposit test passed - exception thrown as expected");
            throw e; // Re-throw for @Test(expected)
        }
    }
    
    /**
     * Test transaction history using AAA pattern
     */
    @Test
    public void testTransactionHistory_MultipleOperations_RecordsAllTransactions() {
        System.out.println("TEST: testTransactionHistory_MultipleOperations_RecordsAllTransactions");
        
        // ARRANGE
        int initialTransactionCount = primaryAccount.getTransactionCount();
        BigDecimal depositAmount = new BigDecimal("100.00");
        BigDecimal withdrawAmount = new BigDecimal("50.00");
        
        // ACT
        primaryAccount.deposit(depositAmount);
        primaryAccount.withdraw(withdrawAmount);
        
        // ASSERT
        List<String> history = primaryAccount.getTransactionHistory();
        assertEquals("Should have 2 additional transactions", 
                    initialTransactionCount + 2, history.size());
        
        // Verify transaction details
        assertTrue("Should contain deposit transaction", 
                  history.get(history.size() - 2).contains("Deposit: $100.00"));
        assertTrue("Should contain withdrawal transaction", 
                  history.get(history.size() - 1).contains("Withdrawal: $50.00"));
        
        System.out.println("✓ Transaction history test passed");
    }
    
    /**
     * Test edge case: operations on inactive account using AAA pattern
     */
    @Test(expected = IllegalStateException.class)
    public void testDeposit_InactiveAccount_ThrowsException() {
        System.out.println("TEST: testDeposit_InactiveAccount_ThrowsException");
        
        // ARRANGE
        BankAccount inactiveAccount = new BankAccount("ACC-INACTIVE", "Inactive User");
        inactiveAccount.closeAccount(); // Make account inactive
        BigDecimal depositAmount = new BigDecimal("100.00");
        
        // ACT & ASSERT
        try {
            inactiveAccount.deposit(depositAmount);
            fail("Should have thrown IllegalStateException for inactive account");
        } catch (IllegalStateException e) {
            // ASSERT
            assertFalse("Account should remain inactive", inactiveAccount.isActive());
            assertEquals("Balance should remain zero", BigDecimal.ZERO, inactiveAccount.getBalance());
            System.out.println("✓ Inactive account test passed - exception thrown as expected");
            throw e; // Re-throw for @Test(expected)
        }
    }
}
