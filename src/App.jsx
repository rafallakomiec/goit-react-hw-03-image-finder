import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchHandler } from './utils/fetchHandlers/fetchHandler';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from './components/ImageGalleryItem/ImageGalleryItem';

class App extends Component {

  state = {
    pageNo: 1,
    images: []
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const searchPhrase = event.target.elements.searchInput.value;
    this.setState({pageNo: 1}, () => { 
      const response = fetchHandler(searchPhrase, this.state.pageNo).hits;
      this.setState({ images: response });
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
      </>
    );
  }
  
}

export default App;
