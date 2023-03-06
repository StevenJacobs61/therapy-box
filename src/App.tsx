import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Layout from './components/layout/layout';
import News from './pages/news/news';
import Sport from './pages/sport/sport';
import Photos from './pages/photos/photos';
import Tasks from './pages/tasks/tasks';

const App : React.FC = () => {
  return (
    <Layout>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/sport' element={<Sport/>}/>
      <Route path='/photos' element={<Photos/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
    </Routes>
    </Layout>
  );
}

export default App;
