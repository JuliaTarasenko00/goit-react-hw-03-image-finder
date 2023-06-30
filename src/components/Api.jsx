import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY = '36534768-9895174b062ef79544d81d3db';

const Api = async (img, page) => {
  const { data } = await axios.get(
    `${URL}/?key=${KEY}&image_type=photo&q=${img}&page=${page}&orientation=horizontal&per_page=12`
  );

  return data.hits;
};

export default Api;
