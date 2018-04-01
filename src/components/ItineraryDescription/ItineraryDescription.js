import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { grey500 } from 'material-ui/styles/colors';
import isEqual from 'lodash.isequal';
import axios from 'axios';
import { tripacleUrl } from '../../config';
import ItineraryItem from '../ItineraryItem';
import './ItineraryDescription.css';

class ItineraryDescription extends Component {
  static propTypes = {
    businesses: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      image_url: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
  }

  static defaultProps = {
    businesses: [],
  }

  constructor(props) {
    super(props);
    this.calculateDistance = this.calculateDistance.bind(this);

    this.state = {
      businesses: props.businesses,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const previousBusinesses = prevState.businesses;
    const currentBusinesses = this.state.businesses;
    if (previousBusinesses.length < currentBusinesses.length || !isEqual(prevState.businesses, this.state.businesses)) {
      this.calculateDistance();
    }
  }

  calculateDistance() {
    if (this.state.businesses.length > 0) {
      let a = `${this.state.businesses[0].coordinates.latitude},${this.state.businesses[0].coordinates.longitude}`;
      let b = `${this.state.businesses[1].coordinates.latitude},${this.state.businesses[1].coordinates.longitude}`

      axios.get(`${tripacleUrl}/api/trip/duration`, {
        params: {
          origin: a,
          destination: b,
        },
      })
      .then((result) => {
        console.log(result);
        this.setState({
          duration: result.data.duration,
        });
      });
    }
  }

  render() {

    if (this.state.businesses.length < 1) {
      return <div/>
    }

    return (
      <div>
      <div className='list'>
        <div className='list_item'>
          <div className='list_time'>A</div>
          <div className='list_border'></div>
          <div className='list_desc'>
            <ItineraryItem business={this.props.businesses[0]} index={0} />
            <div className='border'></div>
          </div>
        </div>
        <div className='list_item'>
          <div className='list_time'>
          <FontIcon color={grey500} className="material-icons">directions_car</FontIcon>
          </div>
          <div className='list_border'></div>
          <div className='list_desc'>
            <p className='duration'>{this.state.duration} by car</p>
            <div className='border'></div>
          </div>
        </div>
        <div className='list_item'>
          <div className='list_time'>B</div>
          <div className='list_border'></div>
          <div className='list_desc'>
            <ItineraryItem business={this.props.businesses[1]} index={1} />
            <div className='border'></div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default ItineraryDescription;
