// App.js
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import Header from './components/Header';
import About from './pages/about';
import Account from './pages/account';
import Detail from './pages/detail';
import Home from './pages/home';
import SavedImage from './pages/savedimages';
import Search from './pages/search';
import SplashScreen from './pages/splashscreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          <Header />
          <Router>
            <Routes>
              <Route exact path="/Search" element={<Search />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Account" element={<Account />} />
              <Route exact path="/SavedImages" element={<SavedImage />} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/detail/:imageUrl" element={<Detail />} />
            </Routes>
            <BottomNavBar />
          </Router>
        </>
      )}
    </div>
  );
}

export default App;