import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ items, openModal }) => {
  return (
    <>
      {items.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li className={css.imageGalleryItem} key={id}>
          <img
            onClick={() => openModal(largeImageURL, tags)}
            className={css.imageGalleryItem_image}
            src={webformatURL}
            alt={tags}
            loading="lazy"
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
