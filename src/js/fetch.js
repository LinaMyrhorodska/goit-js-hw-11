import axios from 'axios';
import { Notification } from '../index.js';


export default async function onFetch(name, page) {
    const url = 'https://pixabay.com/api/';
     const options = {
    params: {
      key: '34575125-34d98c7bc370876af411504a6',
      q: name,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 40,
    },
  };
  try {
    const response = await axios.get(url, options);
    Notification(response.data.hits.length, response.data.totalHits);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
