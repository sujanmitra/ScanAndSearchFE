import React, {useState, useEffect} from 'react';
import Photos from '../Photos/Photos';

export const Filteredproducts = (props) => {
    const filteredProductsContainer = {
        display: "flex",
        width: "54%",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0 auto"
    }
    const [items, setItems] = useState(props.responseImages);

    // useEffect(() => {
    //     fetch("https://api.thedogapi.com/v1/images/search?limit=10")
    //         .then(response => {
    //             // console.log(response);
    //             if(!response.ok)
    //                 throw Error("Error fetch the data from api");
    //             // console.log(response.json());
    //             return response.json()
    //             .then(allData => {
    //                 setItems(allData)
    //             })
    //             .catch(err => {
    //                 throw Error(err.message);
    //             })
    //         })
    // },[])
    const displayPhotos = () => {
        return items?.map(photo => {
            // return <Photos key={photo.url} url={photo.url}/>
            return <Photos key={photo.image_url} url={photo.image_url}/>
        })
    }
    return (
        <>
        <h3 style={{fontFamily: 'BentonSansBook,Helvetica,Arial,sans-serif', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: '100'}}>IMAGE SEARCH RESULTS:</h3>
            <section style={filteredProductsContainer}>
                {displayPhotos()}
            </section>
        </>
    )
}