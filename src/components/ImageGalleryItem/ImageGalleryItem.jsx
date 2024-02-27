import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = {
    keyValue: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClickKeyify = () => () => this.props.onClick(this.props.keyValue);

  render() {
    const { keyValue, image, description } = this.props;

    return (
      <li key={keyValue} className={css.imageGalleryItem} onClick={this.onClickKeyify()}>
        <img className={css.imageGalleryItemImage} src={image} alt={description} />
      </li>
    );
  }
}

export default ImageGalleryItem;
