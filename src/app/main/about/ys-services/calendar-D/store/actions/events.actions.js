import axios from 'axios';

export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';

export function getEvents() {
  // const request = axios.get('/api/calendar-app/events');
  const events = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2018, 3, 0),
      end: new Date(2018, 3, 1)
    },
    {
      id: 1,
      title: 'Long Event',
      allDay: false,
      start: new Date(2018, 3, 7),
      end: new Date(2018, 3, 7)
    },
    {
      id: 2,
      title: 'DTS STARTS',
      allDay: false,
      start: new Date(2019, 2, 13, 0, 0, 0),
      end: new Date(2019, 2, 20, 0, 0, 0)
    },
    {
      id: 3,
      title: 'DTS ENDS',
      allDay: false,
      start: new Date(2019, 10, 6, 0, 0, 0),
      end: new Date(2019, 10, 13, 0, 0, 0)
    },
    {
      id: 4,
      title: 'Some Event',
      allDay: false,
      start: new Date(2018, 3, 9, 0, 0, 0),
      end: new Date(2018, 3, 9, 0, 0, 0)
    },
    {
      id: 5,
      title: 'Conference',
      allDay: false,
      start: new Date(2018, 3, 11),
      end: new Date(2018, 3, 13),
      desc: 'Big conference for important people'
    },
    {
      id: 6,
      title: 'Meeting',
      allDay: false,
      start: new Date(2018, 3, 12, 10, 30, 0, 0),
      end: new Date(2018, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
      id: 7,
      title: 'Lunch',
      allDay: false,
      start: new Date(2018, 3, 12, 12, 0, 0, 0),
      end: new Date(2018, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch'
    },
    {
      id: 8,
      title: 'Meeting',
      allDay: false,
      start: new Date(2018, 3, 12, 14, 0, 0, 0),
      end: new Date(2018, 3, 12, 15, 0, 0, 0)
    },
    {
      id: 9,
      title: 'Happy Hour',
      allDay: false,
      start: new Date(2018, 3, 12, 17, 0, 0, 0),
      end: new Date(2018, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day'
    },
    {
      id: 10,
      title: 'Dinner',
      allDay: false,
      start: new Date(2018, 3, 12, 20, 0, 0, 0),
      end: new Date(2018, 3, 12, 21, 0, 0, 0)
    },
    {
      id: 11,
      title: 'Birthday Party',
      allDay: false,
      start: new Date(2018, 3, 13, 7, 0, 0),
      end: new Date(2018, 3, 13, 10, 30, 0)
    },
    {
      id: 12,
      title: 'Late Night Event',
      allDay: false,
      start: new Date(2018, 3, 17, 19, 30, 0),
      end: new Date(2018, 3, 18, 2, 0, 0)
    },
    {
      id: 13,
      title: 'Multi-day Event',
      allDay: false,
      start: new Date(2018, 3, 20, 19, 30, 0),
      end: new Date(2018, 3, 22, 2, 0, 0)
    }
  ];

  // return (dispatch) =>
  //     request.then((response) =>
  //         dispatch({
  //             type   : GET_EVENTS,
  //             payload: response.data
  //         })
  //     );
  return dispatch =>
    dispatch({
      type: GET_EVENTS,
      payload: events
    });
}

export function openNewEventDialog(data) {
  return {
    type: OPEN_NEW_EVENT_DIALOG,
    data
  };
}

export function closeNewEventDialog() {
  return {
    type: CLOSE_NEW_EVENT_DIALOG
  };
}

export function openEditEventDialog(data) {
  return {
    type: OPEN_EDIT_EVENT_DIALOG,
    data
  };
}

export function closeEditEventDialog() {
  return {
    type: CLOSE_EDIT_EVENT_DIALOG
  };
}

export function addEvent(newEvent) {
  return (dispatch, getState) => {
    const request = axios.post('/api/calendar-app/add-event', {
      newEvent
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: ADD_EVENT
        })
      ]).then(() => dispatch(getEvents()))
    );
  };
}

export function updateEvent(event) {
  return (dispatch, getState) => {
    const request = axios.post('/api/calendar-app/update-event', {
      event
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: UPDATE_EVENT
        })
      ]).then(() => dispatch(getEvents()))
    );
  };
}

export function removeEvent(eventId) {
  return (dispatch, getState) => {
    const request = axios.post('/api/calendar-app/remove-event', {
      eventId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_EVENT
        })
      ]).then(() => dispatch(getEvents()))
    );
  };
}
