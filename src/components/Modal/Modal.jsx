import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.getElementById('modal');

export class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloys();
    }
  };

  onClickOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloys();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.onClickOverlay}>
        <div className={css.modal}>
          <img
            src={this.props.imgModal}
            alt={this.props.modalTags}
            loading="lazy"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imgModal: PropTypes.string.isRequired,
  onCloys: PropTypes.func.isRequired,
  modalTags: PropTypes.string.isRequired,
};
