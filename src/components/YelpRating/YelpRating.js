import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './YelpRating.css';

class YelpRating extends Component {
  static propTypes = {
    rating: PropTypes.number,
  }

  static defaultProps = {
    rating: 0,
  }

  constructor(props) {
    super(props);

    this.getRatingClass = this.getRatingClass.bind(this);
    this.countDecimals = this.countDecimals.bind(this);

    this.state = {
      rating: props.rating,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }

  getRatingClass(rating) {
    let numOfDecimals = this.countDecimals(rating);
    let className  = 'i-stars--regular-0';
    let intVal = Math.floor(rating);
    if (numOfDecimals > 0) {
      className = `i-stars--regular-${intVal}-half`;
    } else {
      className = `i-stars--regular-${intVal}`;
    }
    return className;
  }

  countDecimals(value) {
    if (Math.floor(value) === value) {
      return 0;
    }
    return value.toString().split(".")[1].length || 0;
  }

  render() {
    let className = this.getRatingClass(this.state.rating);
    return (
      <div className={className}></div>
    );
  }
}

export default YelpRating;
