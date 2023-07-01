const URL = 'https://pixabay.com/api';
const KEY = '36534768-9895174b062ef79544d81d3db';

const images = (img, page = 1) => {
  return fetch(
    `${URL}/?key=${KEY}&image_type=photo&q=${img}&page=${page}&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Oops, there are no ${img} images matching your search... `)
    );
  });
};

const api = {
  images,
};

export default api;
