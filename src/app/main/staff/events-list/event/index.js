import React, { useState } from 'react';

import EventEdit from './EventEdit';
import EventAnalysis from './EventAnalysis';

function Event(props) {
  const selectedEventId = props.match.params.eventId;

  const [editMode, setEditMode] = useState(false);

  if (selectedEventId === 'new' || editMode) {
    return <EventEdit setEditMode={setEditMode} {...props} />
  } else {
    return <EventAnalysis setEditMode={setEditMode} {...props} />
  }
}

export default Event;
