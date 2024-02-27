import { Component } from 'react';
import css from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import fetchHandler from './utils/fetchHandlers/fetchHandler.js';
import ImageGallery from './components/ImageGallery/ImageGallery';
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

  keyboardHandler = event => {
    if (event.key === 'Escape') {
      this.setState({ isModalOn: false, isSpinnerOn: false, currentModal: {} });
    }
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const searchPhrase = event.target.elements.searchInput.value;
    this.setState({ pageNo: 1, searchPhrase: searchPhrase, isSpinnerOn: true });
  };

  openModalHandler = (imageKey) => {
    const image = this.state.images.find(item => item.id == imageKey);

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
      event.target.tagName === 'DIV' ||
      event.target.tagName === 'IMG' ||
      event.key === 'Escape'
    ) {
      this.setState({ isModalOn: false, isSpinnerOn: false, currentModal: {} });
    }
  };

  loadMoreHandler = () => {
    this.setState({ pageNo: this.state.pageNo + 1, isSpinnerOn: true }, );
  };

  render() {
    return (
      <>
        <div className={css.app}>
          <Searchbar onSubmit={this.onSubmitHandler} />
          {this.state.images.length > 0 && <ImageGallery images={this.state.images} openModalHandler={this.openModalHandler} />}
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
            isModalOn={this.state.isModalOn}
            isSpinnerOn={this.state.isSpinnerOn}
          />
        )}
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass={css.spinner}
          visible={this.state.isSpinnerOn}
        />
      </>
    );
  }

  componentDidMount() {
    window.addEventListener('keyup', this.keyboardHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyboardHandler);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchPhrase !== this.state.searchPhrase) { 
      const responseData = await fetchHandler(this.state.searchPhrase, this.state.pageNo, PER_PAGE);
      this.setState({
        images: responseData.data.hits,
        totalHits: responseData.data.total,
        isSpinnerOn: false,
      });
      return true;
    }
    
    if (prevState.searchPhrase === this.state.searchPhrase && prevState.pageNo !== this.state.pageNo) {
      const responseData = await fetchHandler(this.state.searchPhrase, this.state.pageNo, PER_PAGE);
      this.setState({
        images: [...this.state.images, ...responseData.data.hits],
        isSpinnerOn: false,
      });
    }
  }
}

export default App;
