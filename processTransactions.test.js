const processTransactions = require("./processTransactions");


const firstTestData = [
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-05T09:23:00Z",
    TransactionValue: "100.00",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-05T23:23:00-05:00",
    TransactionValue: "-50.00",
  },
];

const firstResults = [
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-05T09:23:00Z",
    TransactionValue: "100.00",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-05T23:23:00-05:00",
    TransactionValue: "-50.00",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "SYSTEM",
    DateTime: "2018-12-06T23:59:59Z",
    TransactionValue: "50.00",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "SYSTEM",
    DateTime: "2018-12-06T23:59:59Z",
    TransactionValue: "-50.00",
  },
];

const secondTestData = [
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T09:10:00Z",
    TransactionValue: "50.00",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T10:15:30Z",
    TransactionValue: "100.50",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T22:10:00Z",
    TransactionValue: "50.25",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T23:20:00Z",
    TransactionValue: "-77.43",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-01-01T07:20:00Z",
    TransactionValue: "-20.23",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-01-01T09:10:00Z",
    TransactionValue: "10.56",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-02-01T09:20:00Z",
    TransactionValue: "200.23",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-02-03T10:20:15Z",
    TransactionValue: "100.23",
  },
];

const secondResults = [
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T09:10:00Z",
    TransactionValue: "50.00",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T10:15:30Z",
    TransactionValue: "100.50",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T22:10:00Z",
    TransactionValue: "50.25",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2018-12-30T23:20:00Z",
    TransactionValue: "-77.43",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "SYSTEM",
    DateTime: "2018-12-30T23:59:59Z",
    TransactionValue: "27.43",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "SYSTEM",
    DateTime: "2018-12-30T23:59:59Z",
    TransactionValue: "-27.43",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-01-01T07:20:00Z",
    TransactionValue: "-20.23",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-01-01T09:10:00Z",
    TransactionValue: "10.56",
  },  
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "SYSTEM",
    DateTime: "2019-01-01T23:59:59Z",
    TransactionValue: "20.23",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "SYSTEM",
    DateTime: "2019-01-01T23:59:59Z",
    TransactionValue: "-20.23",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-02-01T09:20:00Z",
    TransactionValue: "200.23",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2019-02-03T10:20:15Z",
    TransactionValue: "100.23",
  },
];

const thirdTestData = [
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2021-01-04T16:38:48Z",
    TransactionValue: "-27.50",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2021-01-03T10:10:00Z",
    TransactionValue: "12.50",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2021-01-03T13:34:28Z",
    TransactionValue: "-30.00",
  },
]

const thirdResults = [
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2021-01-03T10:10:00Z",
    TransactionValue: "12.50",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2021-01-03T13:34:28Z",
    TransactionValue: "-30.00",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "SYSTEM",
    DateTime: "2021-01-03T23:59:59Z",
    TransactionValue: "12.50",
  },
  {
    AccountID: "123",
    AccountType: "SAVINGS",
    InitiatorType: "SYSTEM",
    DateTime: "2021-01-03T23:59:59Z",
    TransactionValue: "-12.50",
  },
  {
    AccountID: "789",
    AccountType: "CURRENT",
    InitiatorType: "ACCOUNT-HOLDER",
    DateTime: "2021-01-04T16:38:48Z",
    TransactionValue: "-27.50",
  },
];

test("First set of test data, testing timezones", () => {
  expect(processTransactions(firstTestData)).toStrictEqual(firstResults);
});

test("Second set of test data, testing inputted transactions", () => {
  expect(processTransactions(secondTestData)).toStrictEqual(secondResults);
});

test("Third set of test data, testing saving less than overdrawn amount", () => {
  expect(processTransactions(thirdTestData)).toStrictEqual(thirdResults);
});


