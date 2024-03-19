import React, { useState } from 'react';
import ScanAndSave from '../ScanAndSave/ScanAndSave';

import {
    StyledImageContainer,
  } from './Styles';

export const Searchbox = () => {
    const [file, setFile] = useState();
    const [displayImage, setDisplayImage] = useState(false);
    const [showScanAndSave, setShowScanAndSave] = useState(true);
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setDisplayImage(true);
    }
    return (
        <>
        {/* <h2>Add Image:</h2> */}
        {/* <button onClick={()=> setShowScanAndSave(true)}>Scan</button> */}
      {
        showScanAndSave && <ScanAndSave />
      }
            {/* <input type="file" onChange={handleChange} /> */}
            { displayImage &&
                <StyledImageContainer>
                    <img src={file} alt="Not available"/>
                </StyledImageContainer>
            }
        </>
    )
}
