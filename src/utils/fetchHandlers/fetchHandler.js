import axios from "axios";

const API_KEY = '35303781-845e93066b0b0a407fb33e213';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const fetchHandler = async (searchPhrase, pageNo) => {
    try {
        const config = {
            url: BASE_URL,
            key: API_KEY,
            q: searchPhrase,
            perPage: PER_PAGE,
            page: pageNo,
            image_type: 'photo',
            orientation: 'horizontal'
        };
        const response = await axios.get(config);
        return response;
    } catch (error) {
        alert(`Error occurred ${error.message}. Please try again.`);
    }
} 

export default fetchHandler;