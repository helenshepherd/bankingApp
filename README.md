A banking application that reads a csv file of current & savings account transactions, checks the current account balance at the end of each day and, if the account is overdrawn, tranfers funds from savings to current (if available). The program then creates new transactions to show these transfers and outputs a csv file with these new transactions included.

# installation instructions
install node from https://nodejs.org/en/download/
```
node bankingApp.js secondTest.csv
```
replace secondTest.csv with name of .csv file

libraries used: npm object-to-csv and csv-parser

to install:
```
npm i object-to-csv
npm i csv-parser
```
