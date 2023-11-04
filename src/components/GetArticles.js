import { useEffect, useState} from 'react';



export function GetArticles() {

    const [allArticles,setAllArticles]=useState([]);

    async function getArticle(){
      fetch('http://localhost:5001/get-all-articles',{
        method:"GET",
        
      }).then((res)=>res.json()).then((data)=>{
      setAllArticles(data.data)})
    }
    useEffect(()=>{
      getArticle();
    },[]);


    return allArticles;

}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}


