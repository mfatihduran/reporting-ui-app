import * as React from 'react';
import useHttp from '@/hooks/useHttp';
import { useState } from 'react';
import NotificationBar from '../notification/NotificationBar';
import { Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import { customerInfo } from './Constants';

const initialRequestBody = {
    transactionId : ""
}

const ClientDetails = () => {
    const [notification, setNotification] = useState({message: "", severity: "", open: false});
    const {postOperation} = useHttp();
    const [data, setData] = useState();
    const [requestBody, setRequestBody] = useState(initialRequestBody);

    const retrieveHandler = (event) => {
        event.preventDefault();
        postOperation({url: process.env.CLIENT_QUERY_URL, body: {...requestBody}}).then(
          response => {
            if (response === undefined) {
                setData(customerInfo);
            }
            else if (response.success) {
                setData(response.customerInfo);
            } else {
              setNotification({open: true, severity: "error", message: "Client details could not be fetched"});
            }
          }
        ).catch(e => setNotification({open: true, severity: "error", message: "Client details could not be fetched due to:" + e}));
    };

    const clearScreen = () => {
        setData();
        setRequestBody(initialRequestBody);
    }

    return (
    <Container>
        <Typography fontWeight="bold" variant="h6" paddingBottom={3}>Client Details</Typography>
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
                <Stack useFlexGap flexWrap="wrap" spacing={1} direction="row">
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Id" InputLabelProps={{
                shrink: true,
                }} value={data.id} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Cretated At" InputLabelProps={{
                    shrink: true,
                }} value={data.created_at} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Deleted At" InputLabelProps={{
                    shrink: true,
                }} value={data.deleted_at} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Number" InputLabelProps={{
                    shrink: true,
                }} value={data.number} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Expiry Month" InputLabelProps={{
                    shrink: true,
                }} value={data.expiryMonth} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Expiry Year" InputLabelProps={{
                    shrink: true,
                }} value={data.expiryYear} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Start Month" InputLabelProps={{
                    shrink: true,
                }} value={data.startMonth} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Start Year" InputLabelProps={{
                    shrink: true,
                }} value={data.startYear} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Issue Number" InputLabelProps={{
                    shrink: true,
                }} value={data.issueNumber} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Email" InputLabelProps={{
                    shrink: true,
                }} value={data.email} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Birthday" InputLabelProps={{
                    shrink: true,
                }} value={data.birthday} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Gender" InputLabelProps={{
                    shrink: true,
                }} value={data.gender} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Title" InputLabelProps={{
                    shrink: true,
                }} value={data.billingTitle} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing First Name" InputLabelProps={{
                    shrink: true,
                }} value={data.billingFirstName} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Last Name" InputLabelProps={{
                    shrink: true,
                }} value={data.billingLastName} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Company" InputLabelProps={{
                    shrink: true,
                }} value={data.billingCompany} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Address 1" InputLabelProps={{
                    shrink: true,
                }} value={data.billingAddress1} variant="outlined" />
                    <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Address 2" InputLabelProps={{
                    shrink: true,
                }} value={data.billingAddress2} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing City" InputLabelProps={{
                    shrink: true,
                }} value={data.billingCity} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Postcode" InputLabelProps={{
                    shrink: true,
                }} value={data.billingPostcode} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing State" InputLabelProps={{
                    shrink: true,
                }} value={data.billingState} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Country" InputLabelProps={{
                    shrink: true,
                }} value={data.billingCountry} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Phone" InputLabelProps={{
                    shrink: true,
                }} value={data.billingPhone} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Billing Fax" InputLabelProps={{
                    shrink: true,
                }} value={data.billingFax} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Title" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingTitle} variant="outlined" />
                    <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping First Name" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingFirstName} variant="outlined" />
                    <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Last Name" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingLastName} variant="outlined" />
                    <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Company" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingCompany} variant="outlined" />
                    <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Address 1" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingAddress1} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Address 2" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingAddress2} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping City" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingCity} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Postcode" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingPostcode} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping State" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingState} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Country" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingCountry} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Phone" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingPhone} variant="outlined" />
                <TextField size="small" sx={{width: 200}} id="outlined-basic" label="Shipping Fax" InputLabelProps={{
                    shrink: true,
                }} value={data.shippingFax} variant="outlined" />
                </Stack>
            </div>
        }
    </Container>
    
  );
}

export default ClientDetails;
