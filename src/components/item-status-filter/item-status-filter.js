import './item-status-filter.css';
import { Component } from 'react';

export default class ItemStatusFilter extends Component {

  states = ['All', 'Active', 'Done'];

  state = {
    currentState: 'All'
  }

  onStateFilter = (e) => {
    const currentState = e.target.value
    this.setState({
      currentState
    })
    this.props.onStatusFilter(currentState)
  }

  
  render() {
    const elements = this.states.map((item) => {
      let classes = 'btn ';
      if(item === this.state.currentState) {
        classes = `${classes} btn-info`;
      } else {
        classes = `${classes} btn-outline-secondary`;
      }
      return (
        <button type="button"
                key={item}
                className={classes}
                onClick={ this.onStateFilter } 
                value={ item } >{item}</button>
      );
    });
    return (
      <div className="btn-group">
        {elements}
      </div>
    );
  }
}
