import React, { Component } from 'react';
import { lightBlue500, lightBlue700, lightBlack, pinkA200, grey100, grey500,
  grey900, white, grey300, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import './App.css';
import Itinerary from '../Itinerary';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NavigationRight from 'material-ui/svg-icons/navigation/chevron-right';
import Paper from 'material-ui/Paper';
import PlacesAutocomplete from 'react-places-autocomplete';

import { connect } from 'react-redux';
import { getBusinesses } from '../../reducers';
import { fetchBusinesses, changeCategory, didChangeCity } from '../../actions';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue700,
    primary3Color: lightBlack,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
  },
  appBar: {
    height: 50,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.onNext = this.onNext.bind(this);
    this.handleChange0 = this.handleChange0.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.onChange = (address) => this.setState({ address });
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      value0: 1,
      value1: 3,
      opts: [{
        title: 'active',
        value: 'active',
      },
      {
        title: 'dinner',
        value: 'restaurants',
      },
      {
        title: 'drinks',
        value: 'bars',
      },
      {
        title: 'music',
        value: 'musicvenues',
      },
      {
        title: 'theater',
        value: 'theater',
      }],
      address: 'Chicago, IL, USA',
    };
  }

  componentDidMount() {

    this.props.fetchBusinesses();
  }

  handleChange0 = (event, index, value0) => {
    this.setState({value0});
    this.props.changeCategory({
      payload: {
        index: 0,
        category: this.state.opts[value0].value,
      },
    });
    this.props.fetchBusinesses();
  }

  handleChange1 = (event, index, value1) => {
    this.setState({value1});
    this.props.changeCategory({
      payload: {
        index: 1,
        category: this.state.opts[value1].value,
      },
    });
    this.props.fetchBusinesses();
  }

  handleSelect(address) {
    this.setState({address});

    this.props.didChangeCity({
      payload: {
        city: address,
      },
    });
    this.props.fetchBusinesses();
  }

  onNext() {
    this.props.fetchBusinesses();
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };

    const options = {
      types: ['(cities)'],
      componentRestrictions: {
        country: ['us'],
      },
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title='tripacle' iconElementLeft={<div />} />
        <div className='rowContainerTop'>
          <p className="padding5">first</p>
          <div style={{marginTop: 12}} className="padding5">
            <SelectField
            floatingLabelText=''
            value={this.state.value0}
            onChange={this.handleChange0}>
            {this.state.opts.map((opt, index) => (
              <MenuItem key={index} value={index} primaryText={opt.title} />
            ))}
            </SelectField>
          </div>
          <p className="padding5">then</p>
            <div style={{marginTop: 12}} className="padding5">
              <SelectField
              floatingLabelText=''
              value={this.state.value1}
              onChange={this.handleChange1}>
              {this.state.opts.map((opt, index) => (
                <MenuItem key={index} value={index} primaryText={opt.title} />
              ))}
              </SelectField>
            </div>
            <p className="padding5">near</p>
            <PlacesAutocomplete className="placesAutocomplete" inputProps={inputProps}
            onSelect={this.handleSelect} options={options} styles={styles.placesAutocompleteStyle} />
        </div>
        <div className="columnContainerMove">
        <div className='columnContainer'>
          <div className='rowContainer'>
            <Itinerary businesses={this.props.businesses} />
          </div>
        </div>
        <Paper className="rowContainerNav" zDepth={1} onClick={this.onNext}>
          <NavigationRight style={styles.smallIcon} />
        </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  smallIcon: {
    width: 54,
    height: 36,
  },
  placesAutocompleteStyle: {
    autocompleteContainer: {
      position: 'absolute',
      backgroundColor: 'white',
    },
    autocompleteItemActive: { color: 'blue' },
  },
};

const mapStateToProps = state => ({
  businesses: getBusinesses(state),
});

export default connect(
  mapStateToProps,
  { fetchBusinesses, changeCategory, didChangeCity },
)(App);
