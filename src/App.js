// App.js
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import Animal from './components/CategoriesPage/CategoryPage/animal';
import Architecture from './components/CategoriesPage/CategoryPage/architecture';
import City from './components/CategoriesPage/CategoryPage/city';
import Food from './components/CategoriesPage/CategoryPage/food';
import Nature from './components/CategoriesPage/CategoryPage/nature';
import Space from './components/CategoriesPage/CategoryPage/space';
import Sports from './components/CategoriesPage/CategoryPage/sports';
import Street from './components/CategoriesPage/CategoryPage/street';
import Travel from './components/CategoriesPage/CategoryPage/travel';
import Header from './components/Header';
import About from './pages/about';
import Account from './pages/account';
import Categories from './pages/categories';
import Detail from './pages/detail';
import Home from './pages/home';
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
              <Route path="/Search" element={<Search />} />
              <Route path="/" element={<Home />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/About" element={<About />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Categories/Animal" element={<Animal />} />
              <Route path="/Categories/City" element={<City />} />
              <Route path="/Categories/Architecture" element={<Architecture />} />
              <Route path="/Categories/Food" element={<Food />} />
              <Route path="/Categories/Nature" element={<Nature />} />
              <Route path="/Categories/Space" element={<Space />} />
              <Route path="/Categories/Sports" element={<Sports />} />
              <Route path="/Categories/Street Photography" element={<Street />} />
              <Route path="/Categories/Travel" element={<Travel />} />
            </Routes>
            <BottomNavBar />
          </Router>
        </>
      )}
    </div>
  );
}

export default App;