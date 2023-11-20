import React, { useState, useEffect } from 'react';

function App() {

  const [birds, setBirds] = useState([{}]);
  const FILE_STORE = "https://area2-documentsstore.s3.eu-west-2.amazonaws.com/";
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
          const thumb = `${FILE_STORE}thumbs/thumb${e.name}`;
          const path = `${FILE_STORE}${e.name}`;
          const imageElement = new Image();
          imageElement.src = path;
          temp.push({path,thumb});
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
         <h1>Bird Log &nbsp;<small> michael phillips</small></h1>
      </header>
      <section className='flex-container'>
        {birds.map((p, i) => 
        <a href={p.path} key={i}><img src={p.thumb} alt='Bird' /></a>
        )}
      </section>
      <footer>
         <p>v1.1 
          <br />
         &copy;  michael phillips 2022
        </p>
    </footer>
    </main>
  );
}

export default App;
