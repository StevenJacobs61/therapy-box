import React, { useEffect, useState } from 'react'
import Styles from './thumbnails.module.css'
import { getPics, auth } from '../../config/firebase';

const PhotosThumb = () => {
  const [photosList, setPhotosList] = useState<string[]>([]);
  const arr = [0, 0, 0, 0]

  
  function updateList(){
    let list: any =[];
    async function getList() {
      try {
        const picList = await getPics(auth.currentUser?.uid);
        list = picList
        setPhotosList(list.slice(0, 4))
      } catch (err) {
        console.error(err);
      }
    }
    getList()
  }
  

  useEffect(() => {
    updateList()
  }, []);

  return (<>
      {photosList.length < 1 ? <h1 className={Styles.noDataHeader}>No photos currently</h1>
      : 
    <div className={Styles.contentGrid}>
      {arr.map((photo, index) => 
    <span key={index} className={`box--display ${Styles.box}`}
    style={{backgroundImage: `url(${photosList[index]})`}}/>
      )}
      </div>
    }
    </>
  )
}

export default PhotosThumb