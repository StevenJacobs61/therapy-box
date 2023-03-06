import React, { useEffect, useState } from 'react'
import useBBCNews, { fetchImageUrl } from '../../hooks/news';
import Styles from '../news/news.module.css'

const News = () => {
  const [image, setImage] = useState<any>()
  const news = useBBCNews();
  useEffect(()=>{
    async function getImgUrl(){
    const imgFetch = await fetchImageUrl(news.linkUrl);
    setImage(imgFetch)
    }
   getImgUrl();
  })
  return (
    <section className={`flex--col ${Styles.section}`}>
        <div className={`box--display ${Styles.box}`}
        style={{backgroundImage: image ? `url(${image})` : ''}}>
        </div>
        <h2 className={Styles.headline}>{news.headline}.</h2>
        <p className={Styles.text}>{news.subtext}</p>
    </section>
  )
}

export default News