import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import React, { lazy, Suspense } from 'react';
import AddCategory from './components/AddCategory';
import AddNotes from './components/AddNotes';

// Lazy load components
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Home = lazy(() => import('./components/Home'));
const Add = lazy(() => import('./components/Add'));
const Update = lazy(() => import('./components/Update'));
const Expens = lazy(() => import('./components/expens'));
const Income = lazy(() => import('./components/Income'));
const Notes = lazy(()=> import('./components/Notes'));
const Profile = lazy(()=> import('./components/Profile'));

function App() {
  const location = useLocation();

  // Paths where Navbar should not appear
  const noNav = ['/login', '/signup'];

  return (
    <>
      
      {!noNav.includes(location.pathname) && <Navbar />}

      <Suspense fallback={<div className='text-center text-primary'><h1>Loading...</h1></div>}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/expensive" element={<Expens />} />
          <Route path="/:type/add" element={<Add />} />
          <Route path="/:type/update/:id" element={<Update />} />
          <Route path="/income" element={<Income />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-note" element={<AddNotes />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
