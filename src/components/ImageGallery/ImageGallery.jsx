import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import Api from '../Api';
import { Loader } from 'components/Loader/Loader';
import { Modal } from '../Modal/Modal';

import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    img: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
    modal: { isOpen: false, imgModal: null, tags: '' },
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.imgCart !== this.props.imgCart) {
      try {
        this.setState({ isLoading: true });
        const img = await Api(this.props.imgCart, this.state.page);
        this.setState({ img });
      } catch (error) {
        this.setState({ error: error.massage });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onClickModalOpen = (img, tags) => {
    this.setState({ modal: { isOpen: true, imgModal: img, tags: tags } });
  };

  onClickModalCloys = () => {
    this.setState({ modal: { isOpen: false, imgModal: null, tags: '' } });
  };

  clickBtn = async () => {
    const nextPage = this.state.page + 1;
    try {
      const newImages = await Api(this.props.imgCart, nextPage);
      this.setState(prevState => ({
        img: [...prevState.img, ...newImages],
        page: nextPage,
      }));
    } catch (error) {
      this.setState({ error: error.massage });
    }
  };

  render() {
    return (
      <>
        {this.state.img.length === 0 && (
          <h1 className={css.title}>
            Your pictures will be here if you enter the data in the form 🥰
          </h1>
        )}
        {this.state.modal.isOpen && (
          <Modal
            onCloys={this.onClickModalCloys}
            imgModal={this.state.modal.imgModal}
          />
        )}
        {this.state.error && (
          <p className={css.title}>
            Oops, some error. Please, try again later. Error: {this.state.error}
          </p>
        )}
        {this.state.img && (
          <>
            <ul className={css.gallery}>
              <ImageGalleryItem
                items={this.state.img}
                openModal={this.onClickModalOpen}
              />
            </ul>
          </>
        )}
        <Button onClick={this.clickBtn} img={this.state.img} />
        <Loader isLoading={this.state.isLoading} />
      </>
    );
  }
}

export default ImageGallery;
