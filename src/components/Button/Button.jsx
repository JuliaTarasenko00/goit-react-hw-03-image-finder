import css from './Button.module.css';

export const Button = ({ img, onClick, page, totalPages }) => {
  return (
    <>
      {img.length > 0 && page <= totalPages && (
        <button type="button" className={css.btn} onClick={onClick}>
          Load more
        </button>
      )}
    </>
  );
};
