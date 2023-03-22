import axios from 'axios';

 export default async function onFetch(value, page) {
  const url = 'https://pixabay.com/api/';
  const key = '34575125-34d98c7bc370876af411504a6';
  const filters = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

     return await axios.get(`${url}${filters}`)
    .then(res => res.data);
}