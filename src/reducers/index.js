import YelpTypes from '../constants/YelpTypes';

const initialState = {
  businesses: [],
  categories: ['restaurants', 'bars'],
  isCategoryLocked: [false, false],
  city: 'chicago, il, usa',
  totals: [1, 1],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case YelpTypes.REQUEST_BUSINESSES:
      return { ...state,
        ...action.payload,
        isLoading: true,
      };
    case YelpTypes.RECEIVE_BUSINESSES:
      return { ...state,
        ...action.payload,
        businesses: [
          // ...state.businesses,
          ...action.payload.businesses,
        ],
        totals: [
          ...action.payload.totals,
        ],
        isLoading: false,
      };
      case YelpTypes.DID_CHANGE_CATEGORY:
      {
        state.categories.splice(action.payload.index, 1, action.payload.category);
        state.totals.splice(action.payload.index, 1, 1);
        return state;
      }
      case YelpTypes.DID_CHANGE_CITY:
      {
        return { ...state,
          ...action.payload,
          totals: [1, 1],
        };
      }
      case YelpTypes.DID_LOCK_CATEGORY:
      {
        state.isCategoryLocked.splice(action.payload.index, 1, action.payload.isCategoryLocked);
        return state;
      }
    default:
      return state;
  }
};

export const getBusinesses = state => state.businesses;

export default reducer;
