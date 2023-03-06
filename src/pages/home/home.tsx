import React from 'react'
import Styles from "./home.module.css"
import NewsThumb from '../../components/thumbnails/news-thumb'
import PhotosThumb from '../../components/thumbnails/photos-thumb'
import SportThumb from '../../components/thumbnails/sport-thumb'
import TasksThumb from '../../components/thumbnails/tasks-thumb'
import WeatherThumb from '../../components/thumbnails/weather-thumb'
import { Link } from 'react-router-dom'
import ClothesThumb from '../../components/thumbnails/clothes-thumb'

const Home : React.FC = () => {
  return (
    <section className={Styles.section}>
      <div className='grid--3x2'>
      <span className={Styles.card}>
        <h2 className={Styles.cardTitle}>Weather</h2>
        <div className={Styles.cardContent}>
       <WeatherThumb/>
      </div>
      </span>
    <Link to="/news" style={{ textDecoration: 'none', color: "#101010" }}>
      <span className={Styles.card}>
        <h2 className={Styles.cardTitle}>News</h2>
        <div className={Styles.cardContent}>
        <NewsThumb/>
      </div>
      </span>
    </Link>
    <Link to="/sport" style={{ textDecoration: 'none', color: "#101010" }}>
      <span className={Styles.card}>
        <h2 className={Styles.cardTitle}>Sport</h2>
        <div className={Styles.cardContent}>
      <SportThumb/>
      </div>
      </span>
    </Link>
    <Link to="/photos" style={{ textDecoration: 'none', color: "#101010" }}>
      <span className={Styles.card}>
        <h2 className={Styles.cardTitle}>Photos</h2>
        <div className={Styles.cardContent}>
      <PhotosThumb/>
      </div>
      </span>
    </Link>
    <Link to="/tasks" style={{ textDecoration: 'none', color: "#101010" }}>
      <span className={Styles.card}>
        <h2 className={Styles.cardTitle}>Tasks</h2>
        <div className={Styles.cardContent}>
       <TasksThumb/>
      </div>
      </span>
    </Link>
      <span className={Styles.card}>
        <h2 className={Styles.cardTitle}>Clothes</h2>
        <div className={Styles.cardContent}>
        <ClothesThumb/>
      </div>
      </span>
        </div>
    </section>
  )
}

export default Home