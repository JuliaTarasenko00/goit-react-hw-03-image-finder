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
