import PropTypes from 'prop-types';
import { Component } from 'react';

import css from './Searchbar.module.css';

export class SearchBar extends Component {
  state = {
    name: '',
  };

  onChangeInput = event => {
    this.setState({ name: event.target.value.toLowerCase() });
  };

  submitForm = ev => {
    ev.preventDefault();
    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.submitForm}>
          <button type={css.submit} className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            onChange={this.onChangeInput}
            name="name"
            value={this.state.name}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
