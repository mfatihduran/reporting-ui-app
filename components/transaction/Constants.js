export const transactionsReportColumns = [
  { field: 'count', headerName: 'Count', width: 150, editable: false },
  { field: 'total', headerName: 'Total', width: 150, editable: false },
  { field: 'currency', headerName: 'Currency', width: 150, editable: false }
];


      data:[{
      fx:{
        merchant:{
          originalAmount: 5,
          originalCurrency: "EUR"
        }
      },
      customerInfo:{
        number: "448574XXXXXX3395",
        email: "aykut.aras@bumin.com.tr",
        billingFirstName: "Aykut",
        billingLastName: "Aras"
      },
      merchant:{
        id: 3,
        name: "Dev-Merchant"
      },
      ipn:{ received: true },
      transaction:{
        merchant:{
          referenceNo: "api_560a4a9314208",
          status: "APPROVED",
          operation: "3DAUTH",
          message: "Auth3D is APPROVED",
          created_at: "2015-09-29 08:24:42",
          transactionId: "2827-1443515082-3"
        }
      },
      acquirer:{
      id: 12,
      name: "Mergen Bank",
      code: "MB",
      type: "CREDITCARD"
      },
      refundable: true
      }]



export const transactionsListColumns = [
  { field: 'originalAmount', headerName: 'FX Original Amount', width: 150, editable: false },
  { field: 'originalCurrency', headerName: 'FX Original Currency', width: 150, editable: false },
  { field: 'merchantName', headerName: 'Merchant Name', width: 150, editable: false },
  { field: 'merchantId', headerName: 'Merchant Id', width: 150, editable: false },
  { field: 'ipn', headerName: 'ipn', width: 150, editable: false },
  { field: 'referenceNo', headerName: 'Reference No', width: 150, editable: false },
  { field: 'status', headerName: 'Status', width: 150, editable: false },
  { field: 'operation', headerName: 'Operation', width: 150, editable: false },
  { field: 'message', headerName: 'Message', width: 150, editable: false },
  { field: 'createdAt', headerName: 'Created At', width: 150, editable: false },
  { field: 'transactionId', headerName: 'Transaction Id', width: 150, editable: false },
  { field: 'acqId', headerName: 'Acquirer Id', width: 150, editable: false },
  { field: 'acqName', headerName: 'Acquirer Name', width: 150, editable: false },
  { field: 'acqCode', headerName: 'Acquirer Code', width: 150, editable: false },
  { field: 'acqType', headerName: 'Acquirer Type', width: 150, editable: false },
  { field: 'refundable', headerName: 'Refundable', width: 150, editable: false }
];


export const statusOptions = [
  { key: "APPROVED", value: "APPROVED"},
  { key: "WAITING", value: "WAITING"},
  { key: "DECLINED", value: "DECLINED"},
  { key: "ERROR", value: "ERROR"}
]

// "DIRECT", "REFUND", "3D", "3DAUTH", "STORED"
export const operationOptions = [
  { key: "DIRECT", value: "DIRECT"},
  { key: "REFUND", value: "REFUND"},
  { key: "3D", value: "3D"},
  { key: "3DAUTH", value: "3DAUTH"},
  { key: "STORED", value: "STORED"}
]

//"CREDITCARD", "CUP", "IDEAL", "GIROPAY", "MISTERCASH", "STORED", "PAYTOCARD", "CEPBANK", "CITADEL"
export const paymentOptions = [
  { key: "CREDITCARD", value: "CREDITCARD"},
  { key: "CUP", value: "CUP"},
  { key: "IDEAL", value: "IDEAL"},
  { key: "GIROPAY", value: "GIROPAY"},
  { key: "MISTERCASH", value: "MISTERCASH"},
  { key: "STORED", value: "STORED"},
  { key: "PAYTOCARD", value: "PAYTOCARD"},
  { key: "CEPBANK", value: "CEPBANK"},
  { key: "CITADEL", value: "CITADEL"}
]

// "Do not honor", "Invalid Transaction", "Invalid Card", "Not sufficient funds", "Incorrect PIN","Invalid country association", "Currency not allowed", "3-D Secure Transport Error", "Transaction not permitted to cardholder"
export const errorOptions = [
  { key: "HONOR", value: "Do not honor"},
  { key: "INV_TRAN", value: "Invalid Transaction"},
  { key: "IV_CARD", value: "Invalid Card"},
  { key: "NOT_SUF_FUNDS", value: "Not sufficient funds"},
  { key: "INC_PIN", value: "Incorrect PIN"},
  { key: "INV_CNTRY", value: "Invalid country association"},
  { key: "CUR_NOT_ALLOWED", value: "Currency not allowed"},
  { key: "3D_ERR", value: "3-D Secure Transport Error"},
  { key: "TRAN_NOT_PRMT", value: "Transaction not permitted to cardholder"}
]

//{ "Transaction UUID", "Customer Email", "Reference No", "Custom Data", "Card PAN" }
export const filterOptions = [
  { key: "TRAN_UUID", value: "Transaction UUID"},
  { key: "CST_EMAIL", value: "Customer Email"},
  { key: "REF_NO", value: "Reference No"},
  { key: "CUSTOM_DATA", value: "Custom Data"},
  { key: "CARD_PAN", value: "Card PAN"}
]