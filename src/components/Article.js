import './CSSHome.css';
import React from 'react';
import 'bootstrap';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import facebookIcon from './Images/icons8-facebook-48.png';
import linkedInIcon from './Images/icons8-linkedin-48.png';
import instagramIcon from './Images/icons8-instagram-48.png';
import twitterIcon from './Images/icons8-twitterx-48.png';
import { formatDate } from './GetArticles';




function Article({ content }) {
  const { articleId } = useParams();

  const postUrl = encodeURI(document.location.href);

  return (
    <>
      <NavigationBar />

      {content.map(data => {

        if (data._id === articleId) {
          return (
            <div key={data._id} className='ArticlePage'>
              <div className='ImageContainer'>
                <img className='ArticlePageImage' src={`https://drive.google.com/uc?id=${data.ImageId}`} alt={data.Title} />
              </div>
              <div className='ArticlePageTitle'>
                <p className='ArticleTitle'>{data.Title}</p>
              </div>
              <div className='DisplayArticleFlex'>
                <div className='ArticlePageTime'>{formatDate(data.createdAt)}</div>
                <div className='ArticleAndHr'>
                  <div className='ArticlePageContent' dangerouslySetInnerHTML={{ __html: data.Content }}></div>
                  <hr className='ArticleEnd' />
                  <div className='share-btn-container'>
                    <a href={`https://www.facebook.com/sharer.php?u=${postUrl}`} className='facebook-btn' target='_blank' rel='noreferrer'><img src={facebookIcon} alt='Share to Facebook' /></a>
                    <a href={`https://twitter.com/share?url=${postUrl}&text=${data.Title}`} className='twitter-btn' target='_blank' rel='noreferrer'><img src={twitterIcon} alt='Share to Twitter' /></a>
                    <a href={`https://www.linkedin.com/shareArticle?url=${postUrl}&title=${data.Title}`} className='linkedin-btn' target='_blank' rel='noreferrer'><img src={linkedInIcon} alt='Share to Linkedin' /></a>
                    <a href={`https://www.instagram.com/?url=${postUrl}`} className='instagram-btn' target='_blank' rel='noreferrer'><img src={instagramIcon} alt='Share to Instagram' /></a>
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          return null
        }
      })}

      <Footer />
    </>
  );
}

export default Article;
