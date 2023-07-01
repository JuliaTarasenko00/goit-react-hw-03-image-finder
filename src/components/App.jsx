import { Component } from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import Api from './Api';
import { Loader } from 'components/Loader/Loader';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';

import css from './App.module.css';

export class App extends Component {
  state = {
    name: '',
    img: [],
    page: 1,
    tags: '',
    totalPages: 0,
    isLoading: false,
    error: null,
    modal: { isOpen: false, imgModal: null, tags: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { name, page } = this.state;

    this.setState({ isLoading: true });
    await Api.images(name, page)
      .then(images => {
        if (images.hits.length === 0) {
          alert(
            `Oops😳...Your ${name} was not found. You need to make a new request🥰`
          );
        }
        this.setState(prevState => ({
          img: page === 1 ? images.hits : [...prevState.img, ...images.hits],
          totalPages: Math.floor(images.totalHits / 12),
          isLoading: false,
        }));
      })
      .catch(error => this.setState({ error: error.message }));
  };

  onSubmit = name => {
    this.setState({ name, page: 1 }, () => {
      this.scrollToTop();
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  onClickModalOpen = (img, tags) => {
    this.setState({ modal: { isOpen: true, imgModal: img, tags } });
  };

  onClickModalCloys = () => {
    this.setState({ modal: { isOpen: false, imgModal: null, tags: '' } });
  };

  clickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { img, page, modal, isLoading, error, totalPages } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.onSubmit} />
        {img.length === 0 && (
          <h1 className={css.title}>
            Your pictures will be here if you enter the data in the form 🥰
          </h1>
        )}
        {modal.isOpen && (
          <Modal
            onCloys={this.onClickModalCloys}
            imgModal={modal.imgModal}
            modalTags={modal.tags}
          />
        )}
        {error && (
          <p className={css.title}>
            Oops, some error. Please, try again later. Error: {error}
          </p>
        )}
        <ImageGallery openModal={this.onClickModalOpen} items={img} />
        <Button
          onClick={this.clickBtn}
          img={img}
          totalPages={totalPages}
          page={page}
        />
        <Loader isLoading={isLoading} />
      </div>
    );
  }
}
