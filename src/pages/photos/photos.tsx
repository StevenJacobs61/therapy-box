import React, { useEffect, useState } from 'react'
import Styles from "./photos.module.css"
import AddImage from "../../images/Plus_button.png"
import { deleteImage, getPics, uploadPic } from '../../config/firebase'
import { auth } from '../../config/firebase'

const Photos = () => {
  const [file, setFile] = useState<File | null >(null);
  const [imageList, setImageList] = useState<string[]>([]);

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const upFile = event.target.files?.[0];
    if (upFile && auth.currentUser) {
        uploadImage(upFile);
      }
  };

  const uploadImage = async (upFile: File): Promise<void> => {
  
    const img = new Image();
  
    const canvas = document.createElement('canvas');
    canvas.width = 280;
    canvas.height = 280;
  
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = URL.createObjectURL(upFile);
    });
  
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, 280, 280);
  
    try {
      const resizedBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.9)
      );
      await uploadPic(resizedBlob, auth.currentUser?.uid);
      alert('Upload successful');
    } catch (error) {
      console.error(error);
    }
  };
  

  function updateList(){
    let list: any =[];
    async function getList() {
      try {
        const picList = await getPics(auth.currentUser?.uid);
        list = picList
      } catch (err) {
        console.error(err);
      }
    }
    getList().then(() => {
     setImageList(list)
    });
  }
  

  useEffect(() => {
    updateList()
  }, []);
  useEffect(() => {
    updateList()
  }, [uploadImage]);
    

const handleDeletePhoto = async (image:any) => {
  if(window.confirm("Are you sure you want to delete this photo?"))
  try {
    await deleteImage(image, auth?.currentUser?.uid);
    alert("image deleted")
    setImageList(imgList => imgList.filter(img => img !== image));
  } catch (error) {
    console.error(error);
  }
}

  return (
    <section className={Styles.section}>
        <div className={`grid--3x2 ${Styles.grid}`}>
            <span className={`box--display ${Styles.gridCard}`}>
              <input type='file' id='addFile' 
              style={{width: "100%", height: "100%", display: "none"}}
              onChange={handleAddPhoto}/>
                <label htmlFor='addFile' className={`label flex--center ${Styles.label}`}>
                  <img src={AddImage} alt="add" className={Styles.img} />
                </label>
            </span> 
              {imageList?.map((image, index) => 
            <span key={index} className={`box--display label ${Styles.gridCard}`}
            style={{backgroundImage: `url(${image})`}}
            onClick={() => handleDeletePhoto(image)}>

            </span>)}
        </div>
    </section>
  )
}

export default Photos
