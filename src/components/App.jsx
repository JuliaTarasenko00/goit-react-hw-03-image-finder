import { Component } from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import css from './App.module.css';

export class App extends Component {
  state = {
    name: '',
  };

  onSubmit = img => {
    this.setState({ name: img });
  };

  render() {
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery
          imgCart={this.state.name}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}
