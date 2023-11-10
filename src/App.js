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
        data.images.filter(
          (e) => e.name.toLowerCase().endsWith(".jpg") || 
                 e.name.toLowerCase().endsWith(".jpeg")).forEach((e) => {
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
    <main>
      <header>
         <h1>Bird Log <span className='dash'>-</span> <small>michael phillips</small></h1>
      </header>
      <section className='flex-container'>
        {birds.map((p, i) => 
        <div key={i} className="image-container"><a href={p}><img src={p} alt='Bird' /></a></div>
        )}
      </section>
      <footer>
         <p>v1.0 
          <br />
         &copy;  michael phillips 2022
        </p>
    </footer>
    </main>
  );
}

export default App;
