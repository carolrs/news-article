import React, {useState} from 'react';
const SearchForm = ({searchText}) =>{
  const [text, setText] = useState('')

  const handleSubimit = (e)=>{
    e.preventDefault()
    
    searchText(text)
  }

  return(
    <div>
      <form onSubmit={handleSubimit}>
        <input type="text" placeholder='eg.politics' 
        className='py-1 px-2 rounded-l-lg'
        onChange={(e)=> setText(e.target.value)}/>
        <button type="submit" className='bg-blue-800 py-1 px-2 rounded-r-lg
        text-white'>
          Search
          </button>
      </form>
      
    </div>
  )

}

export default SearchForm;