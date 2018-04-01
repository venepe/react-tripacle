/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import ItineraryDescription from '../ItineraryDescription';
import IconButton from 'material-ui/IconButton';
import SocialShare from 'material-ui/svg-icons/social/share';
import faker from 'faker';
import isEqual from 'lodash.isequal';
import secrets from '../../secrets';
import './Itinerary.css';

import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${secrets.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(nextProps.businesses[0].coordinates.latitude, nextProps.businesses[0].coordinates.longitude),
        destination: new google.maps.LatLng(nextProps.businesses[1].coordinates.latitude, nextProps.businesses[1].coordinates.longitude),
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now()),
          trafficModel: 'optimistic',
        },
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
  >
    {props.directions && <DirectionsRenderer
                            defaultOptions={{draggable: false}}
                            options={{
                              infoWindow: new google.maps.InfoWindow({ content: 'this.props.businesses[0].name' })
                            }}
                            directions={props.directions} />}
  </GoogleMap>
);

class Itinerary extends Component {
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

    this.onShare = this.onShare.bind(this);

    this.state = {
      businesses: props.businesses,
      title: faker.fake("{{commerce.productAdjective}} {{commerce.productName}}").toLowerCase(),
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
      this.setState({
        title: faker.fake("{{commerce.productAdjective}} {{commerce.productName}}").toLowerCase(),
      })
    }
  }

  onShare() {
    console.log('share!');
  }

  render() {
    return (
      <Card expandable={false} style={{maxWidth: 500, margin: 10}}>
        <CardMedia
          expandable={false}
        >
          <MapWithADirectionsRenderer businesses={this.state.businesses} />
        </CardMedia>
        <CardTitle
          title={'operation'}
          titleStyle={{
            fontSize: 14,
            lineHeight: 1,
            color: 'rgba(0,0,0,0.54)',
          }}
          subtitle={this.state.title}
          subtitleStyle={{
            fontSize: 24,
            color: 'rgba(0,0,0,0.87)',
          }}
        />
        <ItineraryDescription businesses={this.state.businesses} />
        <CardActions
          style={{
            float: 'right',
          }}
        >
        </CardActions>
      </Card>
    );
  }
}

export default Itinerary;
