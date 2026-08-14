import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import About from './pages/About';
import Apartments from './pages/Apartments';
import Attractions from './pages/Attractions';
import Rules from './pages/Rules';
import Contact from './pages/Contact';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/domki" element={<Apartments />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/atrakcje" element={<Attractions />} />
            <Route path="/regulamin" element={<Rules />} />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
