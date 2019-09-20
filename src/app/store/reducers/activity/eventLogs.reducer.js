import * as Actions from 'app/store/actions/activity';

const initialState = {
  loading: false,
  updating: false,
  docs: {},
  queueingInfos: {},
  eventActivityDialog: {
    props: {
      open: false
    },
    data: null
  }
};

const EventLogs = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_EVENT_ACTIVITY_LOGS_LIST_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.SET_EVENT_ACTIVITY_LOGS_LIST_UPDATING: {
      return {
        ...state,
        updating: true,
      };
    }

    case Actions.SYNC_ACTIVITY_LOGS_WITH_EVENT_ID:
      {
        const { eventId, activityLogs } = action.payload;

        let queueOrderIndex = 0;
        let canceledCount = 0;
        let queueingCount = 0;
        let rejectedCount = 0;
        let succeededCount = 0;
        const newEventActivityLogs = activityLogs.map(activityLog => {
          const registrationStatus = activityLog.registrationStatus;

          switch (registrationStatus) {
            case 'canceled': canceledCount++; break;
            case 'queueing': queueingCount++; break;
            case 'rejected': rejectedCount++; break;
            case 'succeeded': succeededCount++; break;
            case 'pending':
            default: break;
          }
          if (activityLog.registrationStatus === 'succeeded') {
            return {
              ...activityLog,
              queueOrder: ++queueOrderIndex
            }
          } else if (activityLog.registrationStatus === 'queueing') {
            return {
              ...activityLog,
              queueOrder: 0
            }
          } else {
            return {
              ...activityLog,
              queueOrder: -1
            }
          }
        })

        return {
          ...state,
          loading: false,
          queueingInfos: {
            ...state.queueingInfos,
            [eventId]: {
              canceledCount,
              queueingCount,
              rejectedCount,
              succeededCount,
            },
          },
          docs: {
            ...state.docs,
            [eventId]: newEventActivityLogs
          }
        };
      }
    case Actions.OPEN_EVENT_ACTIVITY_INFO_DIALOG:
      {
        return {
          ...state,
          eventActivityDialog: {
            props: {
              open: true
            },
            data: action.payload.data
          }
        };
      }
    case Actions.CLOSE_EVENT_ACTIVITY_INFO_DIALOG:
      {
        return {
          ...state,
          eventActivityDialog: {
            props: {
              open: false
            },
            data: null
          }
        };
      }
    case Actions.UPDATE_APPLICANT_ACTIVITY_REGISTRATION_STATUS:
      {
        const { eventId, applicantId, registrationStatus } = action.payload;
        const originalEventLogs = state.docs[eventId];

        let queueOrderIndex = 0;
        let canceledCount = 0;
        let queueingCount = 0;
        let rejectedCount = 0;
        let succeededCount = 0;
        const newEventLogs = originalEventLogs
          .map(eventLog => {
            if (eventLog.applicant._id === applicantId) {
              return {
                ...eventLog,
                registrationStatus
              }
            } else {
              return eventLog
            }
          })
          .map(eventLog => {
            switch (eventLog.registrationStatus) {
              case 'canceled': canceledCount++; break;
              case 'queueing': queueingCount++; break;
              case 'rejected': rejectedCount++; break;
              case 'succeeded': succeededCount++; break;
              case 'pending':
              default: break;
            }
            if (eventLog.registrationStatus === 'succeeded') {
              return {
                ...eventLog,
                queueOrder: ++queueOrderIndex
              }
            } else if (eventLog.registrationStatus === 'queueing') {
              return {
                ...eventLog,
                queueOrder: 0
              }
            } else {
              return {
                ...eventLog,
                queueOrder: -1
              }
            }
          })

        return {
          ...state,
          loading: false,
          queueingInfos: {
            ...state.queueingInfos,
            [eventId]: {
              canceledCount,
              queueingCount,
              rejectedCount,
              succeededCount,
            },
          },
          docs: {
            ...state.docs,
            [eventId]: newEventLogs
          }
        };
      }

    case Actions.UPDATE_APPLICANT_PREQUESTION:
      {
        const { eventId, ...otherProperty } = action.payload;

        return {
          ...state,
          updating: false,
          docs: {
            ...state.docs,
            [eventId]: [
              ...state.docs[eventId],
              {
                ...otherProperty
              },
            ]
          }
        };
      }
    case Actions.UPDATE_APPLICANT_REVIEWS:
      {
        const { eventId, eventComments, eventStars, speakerContentStars, speakerExpressionStars, speakerStars } = action.payload;

        return {
          ...state,
          updating: false,
          docs: {
            ...state.docs,
            [eventId]: {
              ...state.docs[eventId],
              eventComments,
              eventStars,
              speakerContentStars,
              speakerExpressionStars,
              speakerStars
            }
          }
        };
      }
    default:
      {
        return state;
      }
  }
};

export default EventLogs;
