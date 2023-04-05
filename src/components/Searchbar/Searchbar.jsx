import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [searchString, setSearchString] = useState('');

  const handleChange = event => {
    setSearchString(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!searchString) {
      toast.warn('Fill in the field!');
      return;
    }
    onSubmit(searchString);
    setSearchString('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.button_label}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={searchString}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

