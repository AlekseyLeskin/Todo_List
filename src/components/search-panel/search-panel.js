import { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    search: ''
  }

  onSearchChange = (e) => {
    this.setState({
      search: e.target.value
    });
    this.props.onSearch(e.target.value);
  };

  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={ this.onSearchChange }
                value={ this.setState.search } />
    );
  }
}
