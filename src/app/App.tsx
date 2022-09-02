import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { Orders } from '../models';
import './App.scss';

export const App = (): ReactElement => {
  const testOrders = [
    {
        Crust: "NORMAL",
        Flavor: "BEEF-NORMAL",
        Order_ID: 1,
        Size: "M",
        Table_No: 1,
        Timestamp: "2019-12-03T18:21:08.669365"
    },
    {
        Crust: "NORMAL",
        Flavor: "CHICKEN-FAJITA",
        Order_ID: 3,
        Size: "L",
        Table_No: 3,
        Timestamp: "2019-12-03T18:21:08.710006"
    },
    {
        Crust: "Thin",
        Flavor: "Beef",
        Order_ID: 4,
        Size: "M",
        Table_No: 9,
        Timestamp: "2022-09-01T22:02:41.548984"
    }
  ];
const [orders, setOrders] = useState(testOrders)
const [searchValue, setSearchValue] = useState("")
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

const onOrderDelete = (e:any) => {
  console.log(e)
}

const handleSearch = (e:any) => {
  console.log(e)
}

// const headers = {
//   'Access-Control-Allow-Origin': 'http://localhost:3000/'
// };

  useEffect(() => {
    console.log('App page');
    // axios({
    //     baseURL: 'https://order-pizza-api.herokuapp.com/api/',
    //     url: 'auth',
    //     method: "post",
    //     data: payload,
    //     withCredentials: true,
    //     responseType: 'json'
    // })
    //     .then((response: any) => {
    //       console.log(response)
    //     })
    //     .catch((error: any) => error);
  }, []);

  return (
       <div className="App">
          <div>
        Dans Pizza Orders
         </div>
          {/* <Routes>
          {/* <Route path="/" element={<LoginPage />} /> 
          {/* <Route path="/layout" element={<Layout />} />
          <Route path="orders" element={<OrderScreen />} /> 
        </Routes> */}
         <div className="login">
         <TextField className="textField"  label="Username" variant="standard" />
         <TextField className="textField"  label="Password" variant="standard" />
         <Button variant="contained" size="medium" onClick={(e):void => onLogin(e)}>Login</Button>
         </div>
         <div className="orderForm">
         <TextField className="textField"  label="Crust" variant="standard" />
         <TextField className="textField"  label="Flavor" variant="standard" />
         <TextField className="textField"  label="Size" variant="standard" />
         <TextField  label="Table" variant="standard" />
         <Button variant="contained" size="medium" onClick={(e):void => onOrderSubmit(e)}>Submit</Button>
         </div>
        <div className="search">
        <TextField className="textField" value={searchValue} onChange={(e):void => handleSearch(e)}  label="Size" variant="standard" />
        </div>
        <div className="orders">
        {orders?.map((order: Orders) => (
        <div key={order.Order_ID} className="order">
        <div className="order__item"> <div className="order__name">Crust</div> {order.Crust}</div>
        <div className="order__item"> <div className="order__name">Flavor</div> {order.Flavor}</div>
        <div className="order__item"> <div className="order__name">Order Number</div> {order.Order_ID}</div>
        <div className="order__item"> <div className="order__name">Size</div> {order.Size}</div>
        <div className="order__item"> <div className="order__name">Table</div> {order.Table_No}</div>
        <div className="order__item"> <div className="order__name">Time</div> {order.Timestamp}</div>
        <Button variant="outlined" size="small" onClick={(e):void => onOrderDelete(e)}>X</Button>
        </div>
        ))}         
        </div>
    </div>
  );
}

export default App;
