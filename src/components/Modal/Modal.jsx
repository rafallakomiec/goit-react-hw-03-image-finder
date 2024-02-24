import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    handleImageLoaded: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    isModalOn: PropTypes.bool.isRequired,
    isSpinnerOn: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div
        className={this.props.isModalOn ? css.overlayVisible : css.overlay}
        onClick={this.props.handleModalClose}
        onKeyUp={this.props.handleModalClose}
      >
        <div className={css.modal}>
          <img
            className={this.props.isModalOn && !this.props.isSpinnerOn ? css.modalImgVisible : css.modalImg}
            src={this.props.image}
            alt={this.props.description}
            onLoad={this.props.handleImageLoaded}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
