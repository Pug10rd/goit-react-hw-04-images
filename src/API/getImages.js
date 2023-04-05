import axios from 'axios';

const API_URL = 'https://pixabay.com/api';

const KEY = '34066974-b9ed0af14756539ad49c5eed8';

export const getImages = (searchQuery, cuurentPage) =>
  axios.get(
    `${API_URL}/?key=${KEY}&q=${searchQuery}&image_type=photo&page=${cuurentPage}&per_page=12&safesearch=true`
  );

export default getImages;