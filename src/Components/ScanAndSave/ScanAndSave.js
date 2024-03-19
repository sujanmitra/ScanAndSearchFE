import { useEffect, useState, useRef } from "react";
import Camera from "../Camera/Camera";
import NVISION_API_KEY from '../../configs.json';

import {getImageSize} from './getImageSize';
import { toBase64, getByteBase64 } from "./base64";

import { Filteredproducts } from "../Filterproducts/Filteredproducts";
import { dummyResponse } from "./Data";

// Libraries.

import styled from 'styled-components';

const Button = styled.button`
   background-color: #FFFFFF;
   align-items: center;
   border-radius: 3px;
  box-sizing: border-box;
                color: #4E3844;
                cursor: pointer;
                display: inline-flex;
                flex-direction: row;
                height: 2.7rem;
                justify-content: center;
                outline: 0;
                position: relative;
                textDecoration: none;
                overflowWrap: break-word;
                border: 1px solid #4E3844;
                padding: 0 20px;
                whiteSpace: normal;
                fontWeight: 400;
                fontFamily: BentonSans, Helvetica, Arial, sans-serif;
                fontSize: 1.266rem;
                lineHeight: 20px;
                letterSpacing: '0.08em;
`

const colorScheme = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "cyan",
  "purple"
];

function ScanAndSave() {
  const [isUseCamera, setUseCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const refPhoto = useRef(null);
  const refCanvas = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 100 });
  const [imageSize, setImageSize] = useState({ width: 300, height: 100 });
  const [responseImages, setResponseImages] = useState();
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    if (refPhoto?.current) {
      const { offsetWidth, offsetHeight } = refPhoto.current;
      setCanvasSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [photo]);

  const drawBox = ({ ctx, x, y, width, height, color }) => {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  useEffect(() => {
    if (result) {
      const canvas = refCanvas.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      const { detected_objects } = result;
      const resolutionMultiply = canvasSize.width / imageSize.width;
      detected_objects.forEach((object, i) => {
        const { bottom, left, right, top } = object.bounding_box;
        const x = left * resolutionMultiply;
        const y = top * resolutionMultiply;
        const width = (right - left) * resolutionMultiply;
        const height = (bottom - top) * resolutionMultiply;
        drawBox({ ctx, x, y, width, height, color: colorScheme[i] });
      });
    }
  }, [result, canvasSize, imageSize]);

  function blobCreationFromURL(inputURI) {
  
    var binaryVal;

    // mime extension extraction
    var inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(',')[0].indexOf('base64') >= 0)
        binaryVal = atob(inputURI.split(',')[1]);

    // Decoding of base64 encoded string
    else
        binaryVal = unescape(inputURI.split(',')[1]);

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character 
    // it represents

    // Store the bytes of the string to a typed array
    var blobArray = [];
    for (var index = 0; index < binaryVal.length; index++) {
        blobArray.push(binaryVal.charCodeAt(index));
    }

    return new Blob([blobArray], {
        type: inputMIME
    });
}

  const sendImageToServer = (data) => {
    var requestOptions = {
      method: 'POST',
      body: data,
    };
    
    // fetch("https://webhook.site/dec858dc-0daf-4841-92ee-6694c04281a6", requestOptions)
    fetch("http://localhost:8083/products", requestOptions)
    .then(
      response => 
        // response.text()
        response.json())
        .then(res => {
          setResponseImages(res)
          setShowProducts(true);
        })
      //   console.log(response)
      //   // setResponseImages(response)
      //   setTimeout(() => {
      //     setResponseImages(response)
      //  }, 5000);
      // setShowProducts(true);
      
      // )
      // .then(result => console.log(result))
      .catch(error => {
        console.log('error', error)});
  }

  const handleTakePhoto = async (dataUri) => {
    if (dataUri) {
      setPhoto(dataUri);
      const imageSize = await getImageSize(dataUri);
      setImageSize(imageSize);
      setUseCamera(false);
    }

    sendImageToServer(dataUri);
  };

  const handleUploadPhoto = async (e) => {
    const input = e.target;
    const _photo = await toBase64(input.files[0]);
    sendImageToServer(_photo);
    setPhoto(_photo);
    const imageSize = await getImageSize(_photo);
    setImageSize(imageSize);
  };

  const handleResetPhoto = () => {
    setShowProducts(false);
    setResult(null);
    setPhoto(false);
    const canvas = refCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 300, 100);
  };

  return (
    <div className="App p-4">
      <div className="flex justify-center items-center w-full p-4 min-h-72 border-2 rounded mb-2">
        {/* CANVAS */}
        {/* <div className={`relative ${!photo && "hidden"}`}>
          <img ref={refPhoto} src={photo} width="300" />
          <canvas
            ref={refCanvas}
            width="300"
            className="absolute z-10 top-0 left-0"
          />
        </div> */}

        {!photo &&
          (isUseCamera ? (
            <Camera onTakePhoto={handleTakePhoto} />
          ) : (
            <div className="flex flex-col" style={{display: 'flex', flexDirection: 'row'}}>
              {/* <input type="file" style={{ backgroundColor: '#FFFFFF', fontSize: '31px', color: 'rgba(0, 0, 0, 0)' , borderRadius: '3px', position: 'relative', top: '1px', width: '50%', left: '20px' }} onChange={handleUploadPhoto} /> */}
              <label for="inputTag" style={{ backgroundColor: '#FFFFFF', fontSize: '18px', color: '#4E3844' , borderRadius: '3px', position: 'relative', border: '1px solid #4E3844', width: '44%', left: '20px', marginRight: '27px', cursor: 'pointer', paddingTop: '2%' }}>
                BROWSE IMAGE
                <input id="inputTag" type="file" style={{ display: 'none', backgroundColor: '#FFFFFF', fontSize: '31px', color: 'rgba(0, 0, 0, 0)' , borderRadius: '3px', position: 'relative', top: '1px', width: '50%', left: '20px' }} onChange={handleUploadPhoto}/>
              </label>
              <Button
                className="bg-gray-200 p-2"
                onClick={() => setUseCamera(true)}
              >
                CLICK TO SCAN IMAGE
              </Button>
            </div>
          ))}
      </div>

      {result && (
        <table className="border-collapse border text-left">
          <tbody>
            {result.detected_objects.map((object, i) => (
              <tr>
                <td className="border p-2" style={{ color: colorScheme[i] }}>
                  ●
                </td>
                <td className="border p-2">{object.parent}</td>
                <td className="border p-2">{object.name}</td>
                <td className="border p-2">
                  {Math.floor(object.confidence * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />

      {isUseCamera && (
        <Button className="bg-gray-200 p-2" onClick={() => setUseCamera(false)}>
          CANCEL
        </Button>
      )}
      {
        showProducts && <Filteredproducts responseImages={responseImages}/>
      }
      {photo && (
        <Button className="bg-gray-200 p-2" style={{ marginTop: '5%'}} onClick={handleResetPhoto}>
          BACK TO MENU
        </Button>
      )}
    </div>
  );
}

export default ScanAndSave;
