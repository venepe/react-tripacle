import axios from 'axios';
import YelpTypes from '../constants/YelpTypes';
import sampleDate from '../data/sample.json';
import { Events, track } from '../utils/TAnalytics';
import { tripacleUrl } from '../config';

export const requestBusinesses = payload => ({
  type: YelpTypes.REQUEST_BUSINESSES,
  ...payload,
});

export const receiveBusinesses = payload => ({
  type: YelpTypes.RECEIVE_BUSINESSES,
  ...payload,
});

export const changeCategory = payload => ({
  type: YelpTypes.DID_CHANGE_CATEGORY,
  ...payload,
});

export const didChangeCity = payload => ({
  type: YelpTypes.DID_CHANGE_CITY,
  ...payload,
});

export const onLockCategory = payload => ({
  type: YelpTypes.DID_LOCK_CATEGORY,
  ...payload,
});

export const fetchBusinesses = () =>
  (dispatch, getState) => {
    dispatch(requestBusinesses());
    let { categories, totals, city } = getState();
    let businesses = [];
    // businesses = sampleDate.businesses;
    // dispatch(receiveBusinesses({ payload: { businesses } }));
    // return;
    track(Events.VIEWED_TRIP, { categories, city });
    let promises = categories.map((category, index) => axios.get(
      `${tripacleUrl}/api/yelp/search`, {
        params: {
          categories: category,
          location: city,
          offset: getRandomInt(totals[index]),
          limit: 1,
        },
    }));

    Promise.all(promises)
    .then((result) => {
      let newTotals = [];
      result.forEach((item) => {
        businesses.push(item.data.businesses[0]);
        newTotals.push(item.data.total);
      })
      dispatch(receiveBusinesses({ payload: { businesses, totals: newTotals} }));
    })
  };

const getRandomInt = max => {
  if (max > 1000) {
    max = 1000;
  }
  return Math.floor(Math.random() * Math.floor(max));
};

const actions = {
  requestBusinesses,
};

export default actions;
