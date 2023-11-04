import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import React from 'react';
import { GetArticles } from './components/GetArticles';
import Article from './components/Article';
import Search from './components/Search';





function App() {
  const Articles = GetArticles();


  
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/article/:articleId' element={<Article content={Articles} />} />
        <Route path='/search' element={<Search/>} />
      </Routes>

    </div>
  );
}

export default App;