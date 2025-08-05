import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MovieDetailPage from './pages/MovieDetailPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <div className="App">
      <div className='overlay' />
      <Header />
      <div className='App-header'>
      </div>
      <ImageSlider />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movies/:movieID/:movieName" element={<MovieDetailPage />} />
      </Routes>
      <Footer />
    </div >
  );
}

export default App
