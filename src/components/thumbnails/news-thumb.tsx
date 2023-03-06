import React from 'react'
import Styles from './thumbnails.module.css'
import useBBCNews from '../../hooks/news';

const NewsThumb = () => {
  const news = useBBCNews();
  return (
    <>
      <h2 className={Styles.cardHeader}>{news.headline.slice(0, 20)}...</h2>
      <p className={Styles.cardText}>{news.subtext}</p>
    </>
  )
}

export default NewsThumb