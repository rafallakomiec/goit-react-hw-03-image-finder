import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { nanoid } from 'nanoid';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    openModalHandler: PropTypes.func.isRequired
  };

  render() {
    const imageGalleryItems = this.props.images.map(item => {
      return (
        <ImageGalleryItem
          key={nanoid()}
          keyValue={item.id.toString()}
          description={item.tags}
          image={item.webformatURL}
          onClick={this.props.openModalHandler}
        />
      );
    });
    return <ul className={css.imageGallery}>{imageGalleryItems}</ul>;
  }
}

export default ImageGallery;
