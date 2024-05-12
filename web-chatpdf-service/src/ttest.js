// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
  
//   useEffect(() => {
//     const folderPath = 'algo_test/'; // 여기에 원하는 폴더 경로를 설정하세요
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(`/images?folder=${encodeURIComponent(folderPath)}`);
//         setImages(response.data);
//       } catch (error) {
//         console.error('Error fetching images', error);
//       }
//     };
//     fetchImages();
//   }, []);

//   return (
//     <div>
//       {images.map((url, index) => (
//         <img key={index} src={url} alt={`Image ${index}`} />
//       ))}
//     </div>
//   );
// };

// export default ImageGallery;
