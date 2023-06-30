import { Component } from 'react';
import { createPortal } from 'react-dom';
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
        <div className={css.modal}>{this.props.children}</div>
        <img src={this.props.imgModal} alt={this.props.tags} loading="lazy" />
      </div>,
      modalRoot
    );
  }
}
