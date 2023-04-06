// import { getImages } from "API/getImages";
// import { Component, useEffect } from "react";
// import { ImageList } from "./ImageGallery/ImageGallery";
// import { InputField } from "./Searchbar/Searchbar";
 
// export class App extends Component {
//   state = {
//     images: [],
//     search: '',
//     page: 1,

//   };

//   onChange = (e) => {
//      setState(
//       { search: e.target.value }
//     )
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     getImages( state.search,  state.page).then((data) => {
//       console.log(data);
//     })
//   }
//   // useEffect(() => { getImages("cat", 24).then(res =>  setState({ images: res.data.hits })) }, []);
//   // getImages = ("cat", 24) => {
     
//   // }
//   render() {
//     return (
//       <>
//         <InputField />
//         <ImageList />
//         <form onSubmit={ onSubmit}>
//           <input type="text"
//            onChange={ onChange}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </>
//     );
// }

// };

// // 1. як коректно викликати сюди запит та отримати його результати ?
// // 2. як правильно побудувати структуру рендера у відношенні ImageList та ImageItem ?
// // 3. як потім протанути до них необхідні параметри якщо вони нам приходять з сервера ?

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import css from '../components/App.module.css';
import getImages from '../API/getImages';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

export const App = () => {
  // state = {
  //   images: [],
  //   searchQuery: '',
  //   status: 'idle',
  //   cuurentPage: 1,
  // };

  const [images, setImages] = useState([]);
  const [searchQuery, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [cuurentPage, setPage] = useState(1);
  
     useEffect(() => {
       if (searchQuery) {
         getImages(searchQuery, cuurentPage)
           .then(response => {
             setImages(prevState => [...prevState, ...response.data.hits]
             );
             setStatus('resolved');
           })
           .catch(error =>
              setStatus('rejected')
           );
       }
     }, [searchQuery, cuurentPage]); 

      const handleSubmit = searchQuery => {
        //  setState({ searchQuery, images: [], cuurentPage: 1 });
        setQuery(searchQuery);
        setImages([]);
        setPage(1);
      };

      const loadMore = () => {
        setPage(prev => prev + 1);
      };

  
  if (status === 'idle') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={ handleSubmit} />
          <ToastContainer autoClose={3000} />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={ handleSubmit} />
          <ToastContainer autoClose={3000} />
          <Loader />
        </div>
      );
    }

    if (status === 'rejected' || images.length === 0) {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={ handleSubmit} />
          <ToastContainer autoClose={3000} />
          <p>Unfortunately there is no such image</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={ handleSubmit} />
          <ToastContainer autoClose={3000} />
          <ImageGallery images={images} />
          {images.length !== 0 && (
            <Button onHandleClick={ loadMore} />
          )}
        </div>
      );
    }
  
  return
}
  

 

  // handleSubmit = searchQuery => {
  //    setState({ searchQuery, images: [], cuurentPage: 1 });
  // };

  // loadMore = () => {
  //    setState(prevState => ({ cuurentPage: prevState.cuurentPage + 1 }));
  // };

  // render() {
    // const { status, images } =  state;

    // if (status === 'idle') {
    //   return (
    //     <div className={css.app}>
    //       <Searchbar onSubmit={ handleSubmit} />
    //       <ToastContainer autoClose={3000} />
    //     </div>
    //   );
    // }

    // if (status === 'pending') {
    //   return (
    //     <div className={css.app}>
    //       <Searchbar onSubmit={ handleSubmit} />
    //       <ToastContainer autoClose={3000} />
    //       <Loader />
    //     </div>
    //   );
    // }

    // if (status === 'rejected' || images.length === 0) {
    //   return (
    //     <div className={css.app}>
    //       <Searchbar onSubmit={ handleSubmit} />
    //       <ToastContainer autoClose={3000} />
    //       <p>Unfortunately there is no such image</p>
    //     </div>
    //   );
    // }
    // if (status === 'resolved') {
    //   return (
    //     <div className={css.app}>
    //       <Searchbar onSubmit={ handleSubmit} />
    //       <ToastContainer autoClose={3000} />
    //       <ImageGallery images={ state.images} />
    //       { state.images.length !== 0 && (
    //         <Button onHandleClick={ loadMore} />
    //       )}
    //     </div>
    //   );
    // }
//   }
// }