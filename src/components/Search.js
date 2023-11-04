import './CSSHome.css';
import React, { useState } from 'react';
import 'bootstrap';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { GetArticles,formatDate } from './GetArticles';
import { useNavigate } from 'react-router-dom';
import SearchImage from './Images/SearchEngine.webp';
import searchIncon from './Images/icons8-search-128.png';



function Search() {

  const Articles = GetArticles();
  const Navigate = useNavigate();
  const [Display, setDisplay] = useState(Articles);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    const queryLower = query.toLowerCase();
    const FoundArticles = Articles.filter((article) =>
      article.Title.toLowerCase().includes(queryLower) || // Exact match for Title
      article.Content.toLowerCase().includes(queryLower) // Partial match for Content
    );
    setDisplay(FoundArticles);

  };

  const LookFor = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Set the search query
    handleSearch(query); // Perform the search with the updated query
  };

  return (
    <>
      <NavigationBar />

      <div className='StartPage'>
          <figure className='position-relative-search'>
            <img src={SearchImage} className='SearchImage' alt='SearchImage' />
          </figure>
        </div>



      <div className='SearchFunction'>
        <div className='SearchBar'>
        <input
          type="text"
          placeholder='Search'
          value={searchQuery}
          onChange={LookFor}
          className='search'
        />
        <img src={searchIncon} alt='Search' className='SearchIcon' />
        </div>
      </div>
      

      <div className='Blog'>

        {searchQuery?Display.map(data => {

          return (
            <div key={data._id} className='Articles' onClick={() => Navigate(`/article/${data._id}`)}>
              <div className='img-container'>
                <img className='ArticlesImages' src={`https://drive.google.com/uc?id=${data.ImageId}`} alt={data.Title} />
              </div>
              <p className='Title'>{data.Title}</p>
              <div className='Content' dangerouslySetInnerHTML={{ __html: data.Content.slice(0, 400) + "\n..." }}></div>
              <div className='Content Date'>{formatDate(data.createdAt)}</div>

            </div>
          )
        }):Articles.map(data => {

          return (
            <div key={data._id} className='Articles' onClick={() => Navigate(`/article/${data._id}`)}>
              <div className='img-container'>
                <img className='ArticlesImages' src={`https://drive.google.com/uc?id=${data.ImageId}`} alt={data.Title} />
              </div>
              <p className='Title'>{data.Title}</p>
              <div className='Content' dangerouslySetInnerHTML={{ __html: data.Content.slice(0, 400) + "\n..." }}></div>
              <div className='Content Date'>{formatDate(data.createdAt)}</div>

            </div>
          )
        })}
      </div>






      <Footer />
    </>
  );
}

export default Search;
