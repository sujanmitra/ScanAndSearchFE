import React from 'react';

const Photos = (props) => {
    return (
        <section>
            <img src={props.url} alt="category pics" height="200px" width="200px"/>
        </section>
    )
}

export default Photos;