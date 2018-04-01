import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YelpRating from '../YelpRating';
import LockButton from '../LockButton';
import './ItineraryItem.css';

class ItineraryItem extends Component {
  static propTypes = {
    business: PropTypes.shape({
      name: PropTypes.string,
      image_url: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }

  static defaultProps = {
    business: {},
  }

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      business: props.business,
      index: props.index,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }

  onClick() {
    window.location = this.state.business.url;
  }

  render() {
    return (
      <div className="columnContainer">
        <div className="columnBusiness">
          <span className="businessName">{this.props.business.name}</span>
          <p>{this.props.business.price}</p>
          <YelpRating rating={this.props.business.rating} />
          <div className="columnReviewContainer">
            <p>Based on {this.props.business.review_count} reviews</p>
            <img className="yelpLogo" onClick={this.onClick} height={50} width={78} style={{margin: -10}} src={'https://s3-media3.fl.yelpcdn.com/assets/srv0/styleguide/b62d62e8722a/assets/img/brand_guidelines/yelp_fullcolor_outline@2x.png'} />
          </div>
        </div>
        <div>
          <img width={100} height={100} src={this.props.business.image_url} />
        </div>
      </div>
    );
  }
}

export default ItineraryItem;
