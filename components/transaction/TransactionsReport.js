import useHttp from "@/hooks/useHttp";
import { useState } from "react";
import { transactionsReportColumns } from "./Constants";
import { Box, Button, Container, Divider, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NotificationBar from "../notification/NotificationBar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { transactionsReport } from "./SampleData";

const initialRequestBody = {
    fromDate : null,
    toDate: null,
    merchantId: '',
    acquirerId: '',
}

const TransactionsReport = () => {
    const [notification, setNotification] = useState({message: "", severity: "", open: false});
    const {postOperation} = useHttp();
    const [data, setData] = useState({status: "", response: []});
    const [requestBody, setRequestBody] = useState(initialRequestBody);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const retrieveReport = (event) => {
        event.preventDefault(); 

        if (fromDate === null || toDate === null) {
            return;
        }

        postOperation({url: process.env.TRANSACTIONS_REPORT_URL, body: {...requestBody, fromDate: fromDate.format("YYYY-MM-DD"), toDate: toDate.format("YYYY-MM-DD")}}).then(
          apiResponse => {
            if (apiResponse === undefined) {
                setData(transactionsReport);
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
        setData({status: "", response: []});
        setRequestBody(initialRequestBody);
        setFromDate(null);
        setToDate(null);
    }

    return (
        <Container>
            <Typography fontWeight="bold" variant="h6" paddingBottom={3}>Transactions Report</Typography>
            <Divider sx={{marginBottom: 3}}/>
            <form onSubmit={retrieveReport}>
            <NotificationBar open={notification.open} close={() => setNotification({...notification, open: false})} notification={notification} />
            <Box sx={{ height: 400, width: '100%' }}>
                <Stack useFlexGap flexWrap="wrap" spacing={1} direction="row" marginY={2}>
                    <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="YYYY/MM/DD" key="fromDate" slotProps={{ textField: { size: "small" } }} value={fromDate} label="From Date" onChange={(e) => setFromDate(e)} />
                    </LocalizationProvider>
                    <FormHelperText sx={{visibility: fromDate === null ? "visible" : "hidden"}}>This field is required</FormHelperText>
                    </FormControl>
                    <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="YYYY/MM/DD" key="toDate" slotProps={{ textField: { size: "small" } }} value={toDate} label="To Date" onChange={(e) => setToDate(e)} />
                    </LocalizationProvider>
                    <FormHelperText sx={{visibility: toDate === null ? "visible" : "hidden"}}>This field is required</FormHelperText>
                    </FormControl>
                    <TextField value={requestBody.merchantId} size="small" sx={{width: 200}} id="merchantId" type="number" label="Merchant" InputLabelProps={{
                        shrink: true,
                    }} variant="outlined" onChange={(e) => setRequestBody({...requestBody, merchantId: e.target.valueAsNumber})} />
                    <TextField value={requestBody.acquirerId} size="small" sx={{width: 200}} id="acquirerId" type="number" label="Acquirer" InputLabelProps={{
                        shrink: true,
                    }} variant="outlined" onChange={(e) => setRequestBody({...requestBody, acquirerId: e.target.valueAsNumber})} />
                    
                </Stack>
                <Stack useFlexGap flexWrap="wrap" spacing={0.5} direction="row" marginY={1}>
                    <Button type="submit" size="small" variant="contained" sx={{fontWeight: "bold"}} color="primary">
                        Report
                    </Button>
                    <Button size="small" variant="outlined" sx={{fontWeight: "bold"}} color="primary" onClick={() => clearFilters()}>
                        Clear
                    </Button>
                </Stack>
                <DataGrid
                    rows={data.response}
                    columns={transactionsReportColumns}
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

export default TransactionsReport;