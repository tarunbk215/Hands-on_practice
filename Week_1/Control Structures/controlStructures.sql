CREATE TABLE Customers (
    CustomerID int PRIMARY KEY,
    CustomerName varchar(50),
    Age int,
    Balance int,
    IsVIP varchar(5)
);

CREATE TABLE Loans (
    LoanID int PRIMARY KEY,
    CustomerID varchar(50),
    InterestRate int,
    DueDate DATE,
    FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);