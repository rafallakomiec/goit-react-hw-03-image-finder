import { Component } from 'react';
import css from './App.module.css';
import cssModal from './components/Modal/Modal.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import fetchHandler from './utils/fetchHandlers/fetchHandler.js';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import { TailSpin } from 'react-loader-spinner';
import Modal from './components/Modal/Modal';

const PER_PAGE = 12;

class App extends Component {
  state = {
    pageNo: 1,
    searchPhrase: '',
    images: [],
    totalHits: 0,
    isSpinnerOn: false,
    isModalOn: false,
    currentModal: {},
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const searchPhrase = event.target.elements.searchInput.value;
    this.setState({ pageNo: 1, searchPhrase: searchPhrase, isSpinnerOn: true }, () => {
      const response = fetchHandler(this.state.searchPhrase, this.state.pageNo, PER_PAGE);
      this.setState({ images: response.hits, totalHits: response.total, isSpinnerOn: false });
    });
  };

  openModalHandler = event => {
    const imageKey = event.target.getAttribute('key');
    const image = this.state.images.find(item => item.id === imageKey);

    this.setState({
      isSpinnerOn: true,
      isModalOn: true,
      currentModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  modalImageLoadedHandler = () => {
    this.setState({ isSpinnerOn: false });
  };

  modalCloseHandler = event => {
    if (
      (event.target.tagName === 'DIV' &&
        (event.target.className === cssModal.overlay ||
          event.target.className === cssModal.modal)) ||
      event.key === 'Escape'
    ) {
      this.setState({ isModalOn: false, isSpinnerOn: false }, () => {});
    }
  };

  loadMoreHandler = () => {
    this.setState(() => {
      this.setState({ pageNo: this.state.pageNo + 1, isSpinnerOn: true }, () => {
        const response = fetchHandler(this.state.searchPhrase, this.state.pageNo, PER_PAGE);
        this.setState({ images: [...this.state.images, ...response.hits], isSpinnerOn: false });
      });
    });
  };

  render() {
    const imageGalleryItems = this.state.images.map(item => {
      return (
        <ImageGalleryItem
          key={item.id}
          description={item.tags}
          image={item.webFormatURL}
          onClick={this.openModalHandler}
        />
      );
    });

    return (
      <>
        <div className={css.app}>
          <Searchbar onSubmit={this.onSubmitHandler} />
          {this.state.images.length > 0 && <ImageGallery>{imageGalleryItems}</ImageGallery>}
          {this.state.totalHits - PER_PAGE * this.state.pageNo > 0 && (
            <Button onClick={this.loadMoreHandler} />
          )}
        </div>
        {this.state.isModalOn && (
          <Modal
            image={this.state.currentModal.largeImageURL}
            description={this.state.currentModal.tags}
            handleImageLoaded={this.modalImageLoadedHandler}
            handleModalClose={this.modalCloseHandler}
          />
        )}
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={this.state.isSpinnerOn}
        />
      </>
    );
  }
}

export default App;
