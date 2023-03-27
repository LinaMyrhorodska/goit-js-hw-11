import axios from 'axios';
import { Notification } from '../index';


export default async function onFetch(value, page) {
    const url = 'https://pixabay.com/api/';
    const key = '34575125-34d98c7bc370876af411504a6';
    const filters = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

    try {
        const res = await axios.get(`${url}${filters}`);
        Notification(res.data.hits.length, res.data.totalHits);
        return res.data;

    } catch (error) {
        console.log(`Error: ${error?.response?.data}`);
    }

  

}