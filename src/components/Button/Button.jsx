import PropTypes from 'prop-types';
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

Button.propTypes = {
  img: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
