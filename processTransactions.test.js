
const processTransactions = require('./processTransactions');

//check if savings account has insufficient funds, doesn't transfer
//check if different time zone (causing different date)
const firstTestData = [{    
    AccountID: '123',
    AccountType: 'SAVINGS',
    InitiatorType: 'ACCOUNT-HOLDER',
    DateTime: '2018-12-05T09:23:00Z',
    TransactionValue: '100.00'
    },
    {
    AccountID: '789',
    AccountType: 'CURRENT',
    InitiatorType: 'ACCOUNT-HOLDER',
    DateTime: '2018-12-05T23:23:00-05:00',
    TransactionValue: '-50.00'        
    }];
    
const firstResults = [{
    AccountID: '123',
    AccountType: 'SAVINGS',
    InitiatorType: 'ACCOUNT-HOLDER',
    DateTime: '2018-12-05T09:23:00Z',
    TransactionValue: '100.00'
    },
    {
    AccountID: '789',
    AccountType: 'CURRENT',
    InitiatorType: 'ACCOUNT-HOLDER',
    DateTime: '2018-12-05T23:23:00-05:00',
    TransactionValue: '-50.00' 
    },
    {
    AccountID: '789',
    AccountType: 'CURRENT',
    InitiatorType: 'SYSTEM',
    DateTime: '2018-12-06T23:59:59Z',
    TransactionValue: '50.00'    
    },
    {
    AccountID: '123',
    AccountType: 'SAVINGS',
    InitiatorType: 'SYSTEM',
    DateTime: '2018-12-06T23:59:59Z',
    TransactionValue: '-50.00'
    },
]


test('First set of test data', () => {
    expect(processTransactions(firstTestData)).toStrictEqual(firstResults)
});

