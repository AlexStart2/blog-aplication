import './CSSHome.css';
import React, { useState, useRef } from 'react';
import StartImage from './Images/logo.gif';
import 'bootstrap';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { GetArticles, formatDate } from './GetArticles';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';



function Home() {
  const RecentArticles = GetArticles();
  const Navigate = useNavigate();



  const editor = useRef(null);
  const [inputImage, setImage] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [inputTitle, setInputTitle] = useState('');

  const [imagePreview, setImagePreview] = useState();

  function covert(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImagePreview(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }

  const title = (event) => {
    setInputTitle(event.target.value);
  }

  function covertToBase64(value) {
    console.log(value);
    setImage(value.target.files[0]);
    covert(value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();



    const formData = new FormData();
    formData.append('inputTitle', inputTitle);
    formData.append('inputContent', inputContent);
    formData.append('image', inputImage);




    const response = await fetch('https://blog-aplication-invu.onrender.com/api/upload-article', {
      method: 'POST',
      body: formData
    });
    const responseBody = await response.text();
    console.log(responseBody); // Log the response body to see what's returned
    const data = JSON.parse(responseBody);
    console.log(data);
    alert("Your article is stored to databased");
    window.location.reload();
  }



  async function DeleteArticle (event){
    console.log(event);
    const artId = new FormData();
    artId.append('articleId', event);


    const response = await fetch('https://blog-aplication-invu.onrender.com/api/delete-article', {
      method: 'DELETE',
      body:artId
    });
    const responseBody = await response.text();
    console.log(responseBody); // Log the response body to see what's returned
    const data = JSON.parse(responseBody);
    alert(data);
    window.location.reload();
  }
  


  return (
    <>
      <div className='home-page'>
        <NavigationBar />



        <div className='StartPage'>
          <figure className='position-relative'>
            <img src={StartImage} className='StartImage' alt='HomeImage' />
          </figure>
          <div className='ShortIntroduction'>
            <p className='BlogAplication'>Blog aplication</p><br />
            In the digital age, the art of crafting engaging and informative
            blog articles is a valuable skill. Whether you're a seasoned writer
            or a novice, there are fundamental principles to create compelling
            content. Here's a guide to help you master the art of writing exceptional
            blog articles.
          </div>
        </div>

        <div className='PostArticles'>
          <div className="Blog-post">
            <form onSubmit={handleSubmit} action='/api/submit' encType="multipart/form-data">
              <label>Title</label>
              <input type='text' className='title' value={inputTitle} onChange={title} name='inputTitle' required />
              <label>Content</label>
              <JoditEditor
                className='Editor'
                ref={editor}
                value={inputContent}
                onChange={inputContent => { setInputContent(inputContent) }}
              />
              <label>Image</label>
              <input type='file' accept='image/*' name='image' onChange={covertToBase64} required />
              <button id='sign-up' className="post-button">Post</button>
            </form>
          </div>

          <div className='Preview'>
          <h2>Preview</h2>

            
            <div className='Articles'>

              <div className='img-container'>
                <img className='ArticlesImages' src={imagePreview} alt='Selected file' />
              </div>
              <p className='Title'>{inputTitle}</p>
              <div className='Content' dangerouslySetInnerHTML={{ __html: inputContent.slice(0, 400) + "\n..." }}></div>
              <div className='Content Date'>08 May 2023</div>
            </div>
            </div>



        </div>

        <h1 className='B-Blog'>Blog</h1>
        <div className='Blog'>
          

          {RecentArticles.map(data => {

            return (
              <div key={data._id} className='ArticleCard'>

              <div className='Articles' onClick={() => Navigate(`/article/${data._id}`)}>
                <div className='img-container'>
                  <img className='ArticlesImages' src={`https://drive.google.com/uc?id=${data.ImageId}`} alt={data.Title} />
                </div>
                <h1 className='Title'>{data.Title}</h1>
                <div className='Content' dangerouslySetInnerHTML={{ __html: data.Content.slice(0, 400) + "\n..." }}></div>
                <div className='Content Date'>{formatDate(data.createdAt)}</div>

              </div>
              {data._id==='65453f816393b17b25707818'? <></>:<button id={`${data._id}`} onClick={()=>{DeleteArticle(data._id)}} className='DeleteArticle'>Delete</button>
}              </div>
            )
          })}
        </div>







        <Footer />
      </div>
    </>
  );
}

export default Home;
