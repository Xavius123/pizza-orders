import axios from 'axios';
import React, { ReactElement, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

export const App = (): ReactElement => {

  const payload = {
    username: 'test',
    password: 'test'
};

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
      {/* <Routes>
          {/* <Route path="/" element={<LoginPage />} /> 
          {/* <Route path="/layout" element={<Layout />} />
          <Route path="orders" element={<OrderScreen />} /> 
        </Routes> */}
    </div>
  );
}

export default App;
