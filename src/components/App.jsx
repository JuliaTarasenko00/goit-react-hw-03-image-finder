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
    totalPages: 0,
    isLoading: false,
    error: null,
    modal: { isOpen: false, imgModal: null, tags: '' },
  };

  onSubmit = img => {
    this.setState(() => ({ name: img }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    console.log('name: ', name);
    console.log('prevState: ', prevState.name);

    if (prevState.name !== name || prevState.page !== page) {
      this.setState({ isLoading: true });

      Api.images(name, page)
        .then(images => {
          this.setState(prevState => ({
            img:
              prevState.name !== name
                ? images.hits
                : [...prevState.img, ...images.hits],
            totalPages: Math.floor(images.totalHits / 12),
            isLoading: false,
          }));
        })
        .catch(error => this.setState({ error: error.message }));
    }
  }

  onClickModalOpen = (img, tags) => {
    this.setState({ modal: { isOpen: true, imgModal: img, tags: tags } });
  };

  onClickModalCloys = () => {
    this.setState({ modal: { isOpen: false, imgModal: null, tags: '' } });
  };

  clickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { img, page, modal, isLoading, error } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.onSubmit} />
        {this.state.img.length === 0 && (
          <h1 className={css.title}>
            Your pictures will be here if you enter the data in the form 🥰
          </h1>
        )}
        {this.state.modal.isOpen && (
          <Modal onCloys={this.onClickModalCloys} imgModal={modal.imgModal} />
        )}
        {this.state.error && (
          <p className={css.title}>
            Oops, some error. Please, try again later. Error: {error}
          </p>
        )}
        <ImageGallery openModal={this.onClickModalOpen} items={img} />
        <Button
          onClick={this.clickBtn}
          img={img}
          totalPages={this.state.totalPages}
          page={page}
        />
        <Loader isLoading={isLoading} />
      </div>
    );
  }
}
