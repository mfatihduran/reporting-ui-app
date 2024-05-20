import useHttp from "@/hooks/useHttp";
import { useState } from "react";
import { Box, Button, Container, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NotificationBar from "../notification/NotificationBar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { errorOptions, filterOptions, operationOptions, paymentOptions, statusOptions, transactionsListColumns } from "./Constants";
import { transactionsList } from "./SampleData";

const initialRequestBody = {
    fromDate : null,
    toDate: null,
    status: null,
    merchantId: '',
    acquirerId: '',
    operation: null,
    paymentMethod: null,
    errorCode: null,
    filterField: null,
    filterValue: '',
    page: null,
}

const TransactionsList = () => {

    const [notification, setNotification] = useState({message: "", severity: "", open: false});
    const {postOperation} = useHttp();
    const [data, setData] = useState({data: []});
    const [requestBody, setRequestBody] = useState(initialRequestBody);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const retrieveReport = (event) => {
        event.preventDefault(); 
        let reqBody = {...requestBody}; 

        if (fromDate) {
            reqBody = {...reqBody, fromDate: fromDate.format("YYYY-MM-DD")};
        }
        if (toDate) {
            reqBody = {...reqBody, toDate: toDate.format("YYYY-MM-DD")};
        }

        postOperation({url: process.env.TRANSACTIONS_LIST_URL, body: {...reqBody}}).then(
          apiResponse => {
            if (apiResponse === undefined) {
                setData(transactionsList);
            }
            else if (apiResponse.success) {
                setData({ status: apiResponse.status, response: apiResponse.response});
            } else {
              setNotification({open: true, severity: "error", message: "Client details could not be fetched"});
            }
          }
        ).catch(e => setNotification({open: true, severity: "error", message: "Client details could not be fetched due to:" + e}));
    };

    const clearFilters = () => {
        setData({data: []});
        setRequestBody(initialRequestBody);
        setFromDate(null);
        setToDate(null);
    }

    return (
        <Container>
            <Typography fontWeight="bold" variant="h6" paddingBottom={3}>Transactions List</Typography>
            <Divider sx={{marginBottom: 3}}/>
            <form onSubmit={retrieveReport}>
            <NotificationBar open={notification.open} close={() => setNotification({...notification, open: false})} notification={notification} />
            <Box sx={{ height: 400, width: '100%' }}>
                <Stack useFlexGap flexWrap="wrap" spacing={1} direction="row" marginY={2}>
                    <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="YYYY/MM/DD" key="fromDate" slotProps={{ textField: { size: "small" } }} value={fromDate} label="From Date" onChange={(e) => setFromDate(e)} />
                    </LocalizationProvider>
                    </FormControl>
                    <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="YYYY/MM/DD" key="toDate" slotProps={{ textField: { size: "small" } }} value={toDate} label="To Date" onChange={(e) => setToDate(e)} />
                    </LocalizationProvider>
                    </FormControl>
                    <FormControl size="small" sx={{maxWidth:240}} variant="outlined" >
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select sx={{width: 140}} id="status" label="Status"
                            value={requestBody.status}
                            onChange={(e) => setRequestBody((prevState) => { return {...prevState, status: e.target.value}; })}
                            size="small">
                            {statusOptions.map((item) => <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{maxWidth:240}} variant="outlined" >
                        <InputLabel htmlFor="operation">Operation</InputLabel>
                        <Select sx={{width: 140}} id="operation" label="Operation"
                            value={requestBody.operation}
                            onChange={(e) => setRequestBody((prevState) => { return {...prevState, operation: e.target.value}; })}
                            size="small">
                            {operationOptions.map((item) => <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField value={requestBody.merchantId} size="small" sx={{width: 200}} id="merchantId" type="number" label="Merchant" InputLabelProps={{
                        shrink: true,
                    }} variant="outlined" onChange={(e) => setRequestBody((prevState) =>{ return {...prevState, merchantId: e.target.valueAsNumber}; })} />
                    <TextField value={requestBody.acquirerId} size="small" sx={{width: 200}} id="acquirerId" type="number" label="Acquirer" InputLabelProps={{
                        shrink: true,
                    }} variant="outlined" onChange={(e) => setRequestBody((prevState) =>{ return {...prevState, acquirerId: e.target.valueAsNumber}; })} />
                    <FormControl size="small" sx={{maxWidth:240}} variant="outlined" >
                        <InputLabel htmlFor="paymentMethod">Payment Method</InputLabel>
                        <Select sx={{width: 200}} id="paymentMethod" label="Payment Method"
                            value={requestBody.paymentMethod}
                            onChange={(e) => setRequestBody((prevState) => { return {...prevState, paymentMethod: e.target.value}; })}
                            size="small">
                            {paymentOptions.map((item) => <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" variant="outlined" >
                        <InputLabel htmlFor="errorCode">Error Code</InputLabel>
                        <Select sx={{width: 350}} id="errorCode" label="Error Code"
                            onChange={(e) => setRequestBody((prevState) => { return {...prevState, errorCode: e.target.value}; })}
                            value={requestBody.errorCode}
                            size="small">
                            {errorOptions.map((item) => <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{maxWidth:240}} variant="outlined" >
                        <InputLabel htmlFor="filterField">Filter Field</InputLabel>
                        <Select sx={{width: 200}} id="filterField" label="Filter Field"
                            onChange={(e) => setRequestBody((prevState) => { return {...prevState, filterField: e.target.value}; })}
                            value={requestBody.filterField}
                            size="small">
                            {filterOptions.map((item) => <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField size="small" sx={{width: 200}} id="filterValue" label="Filter Value" value={requestBody.filterValue} InputLabelProps={{
                        shrink: true,
                    }} variant="outlined" onChange={(e) => setRequestBody((prevState) =>{ return {...prevState, filterValue: e.target.value}; })} />
                </Stack>
                <Stack useFlexGap flexWrap="wrap" spacing={0.5} direction="row" marginY={1}>
                    <Button type="submit" size="small" variant="contained" sx={{fontWeight: "bold"}} color="primary">
                        List
                    </Button>
                    <Button size="small" variant="outlined" sx={{fontWeight: "bold"}} color="primary" onClick={() => clearFilters()}>
                        Clear
                    </Button>
                </Stack>
                <DataGrid
                    rows={data.data?.map((item, index) => ({ id:index,  originalAmount: item.fx?.merchant?.originalAmount, originalCurrency: item.fx?.merchant?.originalCurrency,
                        merchantId: item.merchant?.id, merchantName: item.merchant?.name, ipn: item.ipn?.received, referenceNo: item.transaction?.merchant?.referenceNo,
                        status: item.transaction?.merchant?.status, operation: item.transaction?.merchant?.operation, message: item.transaction?.merchant?.message, createdAt: item.transaction?.merchant?.created_at,
                        transactionId: item.transaction?.merchant?.transactionId, acqId: item.acquirer?.id, acqName: item.acquirer?.name, acqCode: item.acquirer?.code, acqType: item.acquirer?.type, refundable: item.refundable
                        })
                    )}
                    columns={transactionsListColumns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
            </form>
        </Container>
    );

}

export default TransactionsList;