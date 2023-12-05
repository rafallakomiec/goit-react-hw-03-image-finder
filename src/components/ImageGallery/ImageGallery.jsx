import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  render() {
    return <ul className={css.imageGallery}>{this.props.children}</ul>;
  }
}

export default ImageGallery;
