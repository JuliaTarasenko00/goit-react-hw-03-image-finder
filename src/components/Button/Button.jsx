import css from './Button.module.css';

export const Button = ({ img, onClick }) => {
  return (
    <>
      {img.length > 0 && (
        <button type="button" className={css.btn} onClick={onClick}>
          Load more
        </button>
      )}
    </>
  );
};
