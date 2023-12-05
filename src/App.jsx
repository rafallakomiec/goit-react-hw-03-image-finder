import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchHandler } from './utils/fetchHandlers/fetchHandler';

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
    });
    
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmitHandler}/>    
      </>
    );
  }
  
}

export default App;
