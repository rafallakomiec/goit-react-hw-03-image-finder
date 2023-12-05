import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    handleImageLoaded: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div
        className={css.overlay}
        onClick={this.props.handleModalClose}
        onKeyUp={this.props.handleModalClose}
      >
        <div className={css.modal}>
          <img
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
