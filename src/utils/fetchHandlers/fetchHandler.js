import axios from "axios";

const API_KEY = '35303781-845e93066b0b0a407fb33e213';
const BASE_URL = 'https://pixabay.com/api/';

const fetchHandler = async (searchPhrase, pageNo, perPage) => {
    try {
        const config = {
          params: {
            key: API_KEY,
            q: searchPhrase,
            perPage: perPage,
            page: pageNo,
            image_type: 'photo',
            orientation: 'horizontal',
          },
        };
        const response = await axios.get(BASE_URL, config);
        return response;
    } catch (error) {
        alert(`Error occurred ${error.message}. Please try again.`);
    }
} 

export default fetchHandler;