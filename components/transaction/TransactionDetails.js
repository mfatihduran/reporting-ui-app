import * as React from 'react';
import { useEffect } from 'react';
import useHttp from '@/hooks/useHttp';
import { useState } from 'react';
import NotificationBar from '../notification/NotificationBar';
import { Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import { transactionDetails } from './SampleData';

const initialRequestBody = {
    transactionId : ""
}

const TransactionDetails = () => {
    const [notification, setNotification] = useState({message: "", severity: "", open: false});
    const {postOperation} = useHttp();
    const [data, setData] = useState();
    const [requestBody, setRequestBody] = useState(initialRequestBody);

    const retrieveHandler = (event) => {
        event.preventDefault();
        postOperation({url: process.env.CLIENT_QUERY_URL, body: {...requestBody}}).then(
          response => {
            if (response === undefined) {
                setData(transactionDetails);
            }
            else if (response.success) {
                setData({ transactionDetails: { customerInfo: response.customerInfo, fx: response.fx, merchant: response.merchant, transaction: response.transaction }});
            } else {
              setNotification({open: true, severity: "error", message: "Client details could not be fetched"});
            }
          }
        ).catch(e => setNotification({open: true, severity: "error", message: "Client details could not be fetched due to:" + e}));
    }

    const clearScreen = () => {
        setData();
        setRequestBody(initialRequestBody);
    }

    return (
    <Container sx={{padding: 3}}>
        <Typography fontWeight="bold" variant="h6" paddingBottom={3}>Transaction Details</Typography>
        <Divider sx={{marginBottom: 3}}/>
        <NotificationBar open={notification.open} close={() => setNotification({...notification, open: false})} notification={notification} />
        <form onSubmit={retrieveHandler}>
        <Stack useFlexGap flexWrap="wrap" spacing={0.5} direction="row" marginY={3}>
            <TextField required value={requestBody.transactionId} size="small" sx={{width: 200}} id="transactionId" label="Transaction Id" InputLabelProps={{
                shrink: true,
            }} variant="outlined" onChange={(e) => setRequestBody({transactionId: e.target.value})} />
            <Button type="submit" size="small" variant="contained" sx={{fontWeight: "bold"}} color="primary">
                Search
            </Button>
            <Button size="small" variant="outlined" sx={{fontWeight: "bold"}} color="primary" onClick={() => clearScreen()}>
                Clear
            </Button>
        </Stack>
        </form>
        {data &&
          <div> 
            <Typography fontWeight="bold" variant="body2" paddingBottom={3}>Customer Information</Typography>
            <Stack useFlexGap flexWrap="wrap" spacing={1} direction="row" paddingBottom={3}>
            <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Id" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.id} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Cretated At" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.created_at} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Deleted At" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.deleted_at} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Number" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.number} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Expiry Month" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.expiryMonth} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Expiry Year" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.expiryYear} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Start Month" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.startMonth} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Start Year" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.startYear} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Issue Number" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.issueNumber} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Email" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.email} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Birthday" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.birthday} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Gender" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.gender} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Title" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingTitle} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing First Name" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingFirstName} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Last Name" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingLastName} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Company" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingCompany} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Address 1" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingAddress1} variant="outlined" />
             <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Address 2" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingAddress2} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing City" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingCity} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Postcode" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingPostcode} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing State" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingState} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Country" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingCountry} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Phone" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingPhone} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Fax" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.billingFax} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Title" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingTitle} variant="outlined" />
            <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping First Name" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingFirstName} variant="outlined" />
            <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Last Name" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingLastName} variant="outlined" />
            <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Company" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingCompany} variant="outlined" />
            <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Address 1" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingAddress1} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Address 2" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingAddress2} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping City" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingCity} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Postcode" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingPostcode} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping State" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingState} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Country" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingCountry} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Phone" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingPhone} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Fax" InputLabelProps={{
            shrink: true,
          }} value={data?.customerInfo?.shippingFax} variant="outlined" />
        </Stack>
        <Divider sx={{marginBottom: 3}}/>
        <Typography fontWeight="bold" variant="body2" paddingBottom={3}>FX Information</Typography>
        <Stack useFlexGap flexWrap="wrap" spacing={1} direction="row">
            <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Original Amount" InputLabelProps={{
            shrink: true,
          }} value={data.fx.merchant.originalAmount} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Oriiginal Currency" InputLabelProps={{
            shrink: true,
          }} value={data.fx.merchant.originalCurrency} variant="outlined" />
        </Stack>
        <Divider sx={{marginTop: 3,  marginBottom: 3}}/>
        <Typography fontWeight="bold" variant="body2" paddingBottom={3}>Merchant</Typography>
        <Stack useFlexGap flexWrap="wrap" spacing={1} direction="row">
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Name" InputLabelProps={{
            shrink: true,
          }} value={data.merchant.name} variant="outlined" />
        </Stack>
        <Divider sx={{marginTop: 3, marginBottom: 3}}/>
        <Typography fontWeight="bold" variant="body2" paddingBottom={3}>Transaction</Typography>
        <Stack useFlexGap flexWrap="wrap" spacing={1} direction="row" paddingBottom={5}>
          <TextField size="small" sx={{width: 250}} id="outlined-basic" label="Merchant Reference No" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.referenceNo} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Merchant Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.merchantId} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Status" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.status} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Channel" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.channel} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Custom Data" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.customData} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Chain Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.chainId} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Agent Info Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.agentInfoId} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Operation" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.operation} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Fx Transaction Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.fxTransactionId} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Updated At" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.updated_at} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Created At" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.created_at} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.id} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Acquirer Transaction Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.acquirerTransactionId} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Code" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.code} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Message" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.message} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Transaction Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.transactionId} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Agent Id" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.agent?.id} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Customer Ip" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.agent?.customerIp} variant="outlined" />
          <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Customer User Agent" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.agent?.customerUserAgent} variant="outlined" />
           <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Merchant Ip" InputLabelProps={{
            shrink: true,
          }} value={data?.transaction?.merchant?.agent?.merchantIp} variant="outlined" />
        </Stack>
        </div>
        }
    </Container>
  );
}

export default TransactionDetails;
