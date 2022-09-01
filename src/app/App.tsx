import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Orders } from '../models';
import './App.scss';

export const App = (): ReactElement => {
const [orders, setOrders] = useState([])
  const payload = {
    username: 'test',
    password: 'test'
};

const onLogin = (e:any) => {
  console.log(e)
}

const onOrderSubmit = (e:any) => {
  console.log(e)
}

// const headers = {
//   'Access-Control-Allow-Origin': 'http://localhost:3000/'
// };

  useEffect(() => {
    console.log('App page');
    axios({
        baseURL: 'https://order-pizza-api.herokuapp.com/api/',
        url: 'auth',
        method: "post",
        data: payload,
        withCredentials: true,
        responseType: 'json'
    })
        .then((response: any) => {
          console.log(response)
        })
        .catch((error: any) => error);
  }, []);

  return (
       <div className="App">
          <div>
        Dans Pizza Orders
         </div>
         <div className="login">
         <TextField className="textField" id="standard-basic" label="Username" variant="standard" />
         <TextField className="textField" id="standard-basic" label="Password" variant="standard" />
         <Button variant="contained" onClick={(e):void => onLogin(e)}>Login</Button>
         </div>
         <div className="orderForm">
         <TextField className="textField" id="standard-basic" label="Crust" variant="standard" />
         <TextField className="textField" id="standard-basic" label="Flavor" variant="standard" />
         <TextField className="textField" id="standard-basic" label="Size" variant="standard" />
         <TextField id="standard-basic" label="Table" variant="standard" />
         <Button variant="contained" onClick={(e):void => onOrderSubmit(e)}>Submit</Button>
         </div>
      {/* <Routes>
          {/* <Route path="/" element={<LoginPage />} /> 
          {/* <Route path="/layout" element={<Layout />} />
          <Route path="orders" element={<OrderScreen />} /> 
        </Routes> */}
        <div className="search">
        <TextField className="textField" id="standard-basic" label="Size" variant="standard" />
        </div>
        <div className="orders">
        {orders.map((order: Orders) => (
        <div key={order.Order_ID}>
        <div>{order.Crust}</div>
        <div>{order.Flavor}</div>
        <div>{order.Order_ID}</div>
        <div>{order.Size}</div>
        <div>{order.Table_No}</div>
        <div>{order.Timestamp}</div>
        </div>
        ))}         
        </div>
    </div>
  );
}

export default App;
