import React from 'react'

interface Props{
    placeholder: string 
}

const InputField: React.FC<Props> = ({placeholder}) => {
  return (
    <input placeholder={placeholder} className='input'/>
  )
}

export default InputField