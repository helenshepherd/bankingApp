const filepath = process.argv[2];
const csv = require("csv-parser");
const fs = require("fs");
const results = [];


const currentAccountType = "CURRENT";
const savingsAccountType = "SAVINGS";
const systemInitiatorType = "SYSTEM";


function processTransactions(transactions) {
    let currentAccount = 0;
    let savingsAccount = 0;

    transactions.sort(function compare(a,b){
      var dateA = new Date(a.DateTime);
      var dateB = new Date(b.DateTime);
      return dateA - dateB;
    });

    const output = [];
    function checkTransaction(transaction, index) {


      const currentAccountID = transactions.find(
        (element) => element.AccountType === currentAccountType
      ).AccountID;
      const savingsAccountID = transactions.find(
        (element) => element.AccountType === savingsAccountType
      ).AccountID;
      const transactionDateTime = new Date(transaction.DateTime);
      const endOfDay = new Date(transactionDateTime);

      endOfDay.setUTCHours(23, 59, 59);
     
      function createCurrentAccountTransaction(amount) {
        let newCurrentTransaction = {
          AccountID: currentAccountID,
          AccountType: currentAccountType,
          InitiatorType: systemInitiatorType,
          DateTime: endOfDay.toISOString().split('.')[0]+"Z",
          TransactionValue: amount.toFixed(2),
        };
        output.push(newCurrentTransaction);
      }
  
      function createSavingsAccountTransaction(amount) {
        let newSavingsTransaction = {
          AccountID: savingsAccountID,
          AccountType: savingsAccountType,
          InitiatorType: systemInitiatorType,
          DateTime: endOfDay.toISOString().split('.')[0]+"Z",
          TransactionValue: String(parseFloat(-amount).toFixed(2)),
        };
        output.push(newSavingsTransaction);
      }
  
      output.push(transaction);
  
      if (transaction.AccountType === currentAccountType) {
        currentAccount += parseFloat(transaction.TransactionValue);
      } else if (transaction.AccountType === savingsAccountType) {
        savingsAccount += parseFloat(transaction.TransactionValue);
      }
      function sameDay(date1, date2) {
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      }
  
      if (
        index + 1 === transactions.length || 
        ! sameDay(transactionDateTime, new Date(transactions[index + 1].DateTime))
      ) {
        if (currentAccount < 0) {
          amountOverdrawn = 0 - currentAccount;
  
          if (savingsAccount > amountOverdrawn) {
            savingsAccount -= amountOverdrawn;
            currentAccount += amountOverdrawn;

            createCurrentAccountTransaction(amountOverdrawn);
            createSavingsAccountTransaction(amountOverdrawn);
          }
          else if (savingsAccount > 0) {
            let newTransactionAmount = savingsAccount;
            currentAccount += savingsAccount;
            savingsAccount = 0;

            createCurrentAccountTransaction(newTransactionAmount);
            createSavingsAccountTransaction(newTransactionAmount);
          }
        }
      }
    }
  
    transactions.forEach(checkTransaction);
  
    return output;
}

fs.createReadStream(filepath)
  .pipe(csv({}))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const outputData = processTransactions(results);
    const ObjectsToCsv = require("objects-to-csv");
    (async () => {
      const outputCsv = new ObjectsToCsv(outputData);
      await outputCsv.toDisk("./output.csv");
      console.log(await "new file created ./output.csv");
    })();
  });