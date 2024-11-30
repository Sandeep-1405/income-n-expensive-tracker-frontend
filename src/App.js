import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import React, { lazy, Suspense } from 'react';

// Lazy load components
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Home = lazy(() => import('./components/Home'));
const Add = lazy(() => import('./components/Add'));
const Update = lazy(() => import('./components/Update'));
const Expens = lazy(() => import('./components/expens'));
const Income = lazy(() => import('./components/Income'));
const Notes = lazy(()=> import('./components/Notes'))

function App() {
  const location = useLocation();

  // Paths where Navbar should not appear
  const noNav = ['/login', '/signup'];

  return (
    <>
      {/* Conditionally render Navbar */}
      {!noNav.includes(location.pathname) && <Navbar />}

      {/* Wrap Routes with Suspense for lazy loading */}
      <Suspense fallback={<div className='text-center text-primary'><h1>Loading...</h1></div>}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/expens" element={<Expens />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="/income" element={<Income />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
