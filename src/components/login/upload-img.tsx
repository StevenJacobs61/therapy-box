import React, {useState} from 'react'
import Styles from './upload-img.module.css'

interface Props {
    newUser:Boolean,
    loading:Boolean,
    setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>
}

const UploadImg: React.FC<Props> = ({newUser, loading, setFile}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    setFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setSelectedImage(e.target?.result as string);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
      <>
      {newUser ?
      <> 
        <input type='file' id='add-photo' style={{display: 'none'}} onChange={handleFileUpload}/>
        <span className={`card ${Styles.imgCard}`}>
          <label  className='flex--center label' htmlFor='add-photo' 
          style={selectedImage ? {backgroundImage: `url(${selectedImage})`, borderRadius: '50px', width: "50%", border: "2px solid"} : undefined}>
            {loading ? "Loading..." : selectedImage? null : "Add picture"}
            </label>
        </span>
        </>
        : null}
        </>
  )
}

export default UploadImg