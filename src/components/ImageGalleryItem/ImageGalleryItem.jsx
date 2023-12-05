import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = {
    key: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { key, image, description } = this.props;

    return (
      <li key={key} className={css.imageGalleryItem} onClick={this.props.onClick}>
        <img className={css.imageGalleryItemImage} src={image} alt={description} />
      </li>
    );
  }
}

export default ImageGalleryItem;
