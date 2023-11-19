import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BottomNavBar from "./components/BottomNavBar";
import Header from "./components/Header";
import Account from "./pages/account";
import Detail from "./pages/detail";
import Home from "./pages/home";
import Search from "./pages/search";
import Setting from "./pages/setting";

function App() {
  return (
    <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route exact path="/Search" element={<Search />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Account" element={<Account />} />
            <Route exact path="/Setting" element={<Setting />} />
            <Route exact path="/detail/:imageUrl" element={<Detail />} />
          </Routes>
          <BottomNavBar/>
        </Router>
    </div>
  );
}

export default App;
