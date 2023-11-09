import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [birds, setBirds] = useState([]);
  const FILE_STORE = "http://area2-documentsstore.s3-website.eu-west-2.amazonaws.com/";
  const FILE_STORE_MAP = "https://area2-maps.s3.eu-west-2.amazonaws.com/data.json";

  useEffect(() => {

    fetch(FILE_STORE_MAP)

      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        let temp = [];
        data.images.filter((e) => e.name.endsWith(".JPG")).forEach((e) => {
          const path = `${FILE_STORE}${e.name}`;
          const imageElement = new Image();
          imageElement.src = path;
          temp.push(path);
        })
        setBirds(temp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
    []
  );

  return (
    <div className="App">
      <h1>Bird Log</h1>

      <div className='flex-container'>
        {birds.map((p, i) => <div key={i} className="image-container"><img src={p} alt='Bird' /></div>)}
      </div>

    </div>
  );
}

export default App;
