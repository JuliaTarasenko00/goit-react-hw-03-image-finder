import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ items, openModal }) => {
  return (
    <>
      {items && (
        <ul className={css.gallery}>
          <ImageGalleryItem items={items} openModal={openModal} />
        </ul>
      )}
    </>
  );
};
