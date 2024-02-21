import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { searchInput: '' };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const onSubmitHandler = this.props.onSubmit;

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={onSubmitHandler}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            name="searchInput"
            autoComplete="off"
            autoFocus
            placeholder="Type here to search images and photos..."
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
