// App.js
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import Header from './components/Header';
import Account from './pages/account';
import Detail from './pages/detail';
import Home from './pages/home';
import SavedImage from './pages/savedimages';
import Search from './pages/search';
import Setting from './pages/setting';
import SplashScreen from './pages/splashscreen'; // Import SplashScreen

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        // Render splash screen while loading
        <SplashScreen />
      ) : (
        // Render the actual content of your app after loading
        <>
          <Header />
          <Router>
            <Routes>
              <Route exact path="/Search" element={<Search />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Account" element={<Account />} />
              <Route exact path="/SavedImages" element={<SavedImage />} />
              <Route exact path="/Setting" element={<Setting />} />
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
