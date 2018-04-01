/* global mixpanel */

export const Events = {
  VIEWED_TRIP: 'viewed trip',
}

export const track = (event, properties) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  mixpanel.track(
    event,
    properties,
  );
}
