import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm=({onInputChange,onButtonSubmit})=>
{
   return(
    <div className='f3'>
    <p style={{display:'flex',justifyContent:'center'}}>
      {'This Magic Brain will detect faces in your Pictures.'}
   </p>
     <div className='center'>
        <div className='form pa4 br3 shadow-5'>
        <input className='f4 pa2 w-70 'type='text' onChange={onInputChange}/>
        <button className='w-30 pointer grow f4 link ph3 pv2 dib white bg-light-purple ' onClick={onButtonSubmit}>Detect</button>
     </div> 
     </div>
    </div> 
   	);
}

export default ImageLinkForm;