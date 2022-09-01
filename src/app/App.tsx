import React, { ReactElement, useEffect } from 'react';
import './App.css';

export const App = (): ReactElement => {
  useEffect(() => {
    console.log('App page');

}, []);
  return (
    <div className="App">
    <div>
    Dans Pizza Orders
    </div>
        {/* <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="orders" element={<OrderScreen />} />
        </Routes> */}
    </div>
  );
}

export default App;
