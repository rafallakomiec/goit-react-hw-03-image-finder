import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchHandler } from './utils/fetchHandlers/fetchHandler';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from './components/ImageGalleryItem/ImageGalleryItem';
import { Button } from './components/Button/Button';

const PER_PAGE = 12;

class App extends Component {

  state = {
    pageNo: 1,
    searchPhrase: '',
    images: [],
    totalHits: 0
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const searchPhrase = event.target.elements.searchInput.value;
    this.setState({ pageNo: 1, searchPhrase: searchPhrase },
      () => { 
        const response = fetchHandler(this.state.searchPhrase, this.state.pageNo, PER_PAGE);
        this.setState({ images: response.hits, totalHits: response.total });
      });
    
  }

  loadMoreHandler = () => {
    this.setState(() => {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
          const response = fetchHandler(this.state.searchPhrase, this.state.pageNo, PER_PAGE);
          this.setState({ images: [...this.state.images, ...response.hits] });
      });
    });

  }

  render() {
    const imageGalleryItems = this.state.images.map(item => {
      return (
        <ImageGalleryItem key={item.id} description={item.tags} image={item.webFormatURL} />
      );
    });

    return (
      <>
        <Searchbar onSubmit={this.onSubmitHandler} />
        { this.state.images.length > 0 &&
          <ImageGallery>
            {imageGalleryItems}
          </ImageGallery>
        }
        {this.state.totalHits - (PER_PAGE * this.state.pageNo) > 0 &&
          <Button onClick={this.loadMoreHandler} />
        }
      </>
    );
  }
  
}

export default App;
