import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  FormControlLabel,
  InputAdornment,
  Icon,
  FormControl,
  Checkbox,
  MenuItem,
  Button
} from '@material-ui/core';
import _ from '@lodash';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
// import { FuseAnimate } from '@fuse';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
// import EventDialog from './EventDialog';
import CalendarHeader from './CalendarHeader';
import { consultingFormChecker } from 'app/utils';
import * as Actions from 'app/store/actions';
import * as ReactDOM from 'react-dom';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const localizer = momentLocalizer(moment);

const defaultFormState = {
  consultingDate: new Date(),
  consultingTimeSlot: '',
  consultingTopic: '',
  consultingIntention: '',
  consultingexpectation: ''
};
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3e3e3e'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fefefe'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5e5e5e'
      },
      '&:hover fieldset': {
        borderColor: '#3e3e3e'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3e3e3e'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '2.4rem'
    }
  }
})(TextField);
const useStyles = makeStyles(theme => ({
  root: {
    '& .rbc-header': {
      padding: '12px 6px',
      fontWeight: 600,
      fontSize: 14
    },
    '& .rbc-label': {
      padding: '8px 6px'
    },
    '& .rbc-today': {
      backgroundColor: 'transparent'
    },
    '& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
      height: '100%',
      // borderBottom: '2px solid ' + theme.palette.secondary.main + '!important'
      borderTop: '2px solid ' + theme.palette.secondary.main + '!important',
      borderBottom: '2px solid ' + theme.palette.secondary.main + '!important'
    },
    '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
      padding: 24,
      [theme.breakpoints.down('sm')]: {
        padding: 16
      },
      ...theme.mixins.border(0)
    },
    '& .rbc-agenda-view table': {
      ...theme.mixins.border(1),
      '& thead > tr > th': {
        ...theme.mixins.borderBottom(0)
      },
      '& tbody > tr > td': {
        padding: '12px 6px',
        '& + td': {
          ...theme.mixins.borderLeft(1)
        }
      }
    },
    '& .rbc-time-view': {
      '& .rbc-time-header': {
        ...theme.mixins.border(1)
      },
      '& .rbc-time-content': {
        flex: '0 1 auto',
        ...theme.mixins.border(1)
      }
    },
    '& .rbc-month-view': {
      '& .rbc-month-header': {
        borderRadius: '12px 12px 0 0'
      },
      '& > .rbc-row': {
        ...theme.mixins.border(1)
      },
      '& .rbc-month-row': {
        ...theme.mixins.border(1),
        borderWidth: '0 1px 1px 1px!important',
        minHeight: 128,

        '&:last-child': {
          borderRadius: '0 0 12px 12px'
        }
      },
      '& .rbc-header + .rbc-header': {
        ...theme.mixins.borderLeft(1)
      },
      '& .rbc-header': {
        ...theme.mixins.borderBottom(0)
      },
      '& .rbc-day-bg + .rbc-day-bg': {
        height: '100%',
        cursor: 'pointer',
        ...theme.mixins.borderLeft(1)
      }
    },
    '& .rbc-day-slot .rbc-time-slot': {
      ...theme.mixins.borderTop(1),
      opacity: 0.5
    },
    '& .rbc-time-header > .rbc-row > * + *': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-time-content > * + * > *': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-day-bg + .rbc-day-bg': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-time-header > .rbc-row:first-child': {
      ...theme.mixins.borderBottom(1)
    },
    '& .rbc-timeslot-group': {
      minHeight: 64,
      ...theme.mixins.borderBottom(1)
    },
    '& .rbc-date-cell': {
      padding: 8,
      fontSize: 16,
      fontWeight: 400,
      opacity: 0.5,
      '& > a': {
        color: 'inherit'
      }
    },
    '& .rbc-event': {
      borderRadius: 4,
      padding: '4px 8px',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[0],
      transitionProperty: 'box-shadow',
      transitionDuration: theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      position: 'relative',
      '&:hover': {
        boxShadow: theme.shadows[2]
      }
    },
    '& .rbc-row-segment': {
      padding: '0 4px 4px 4px'
    },
    '& .rbc-off-range-bg': {
      backgroundColor:
        theme.palette.type === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.16)'
    },
    '& .rbc-show-more': {
      color: theme.palette.secondary.main,
      background: 'transparent'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event': {
      position: 'static'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child': {
      left: 0,
      top: 0,
      bottom: 0,
      height: 'auto'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child': {
      right: 0,
      top: 0,
      bottom: 0,
      height: 'auto'
    }
  },
  dateWrapper: {
    width: '14.3%',
    cursor: 'pointer',
    ...theme.mixins.borderLeft(1),
    '&.selected': {
      background: theme.palette.secondary.main
    }
  },
  datePastWrapper: {
    cursor: 'not-allowed',
    background: '#e5e5e5',
    borderRight: 'solid 1px #ffffff33'
  }
}));

function CalendarApp(props) {
  const dispatch = useDispatch();
  const events = useSelector(({ calendarApp }) => calendarApp.events.entities);
  const classes = useStyles(props);
  const headerEl = useRef(null);
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const [termState, setTermState] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const firstValidAppointmentDate = moment().add(3, 'days');
  const [selecredDate, setSelectedDate] = useState(firstValidAppointmentDate);

  useEffect(() => {
    // dispatch(Actions.syncPublicConsultingLogs());
  }, [dispatch]);
  useEffect(() => {
    setForm({
      consultingDate: firstValidAppointmentDate.toDate(),
      consultingTimeSlot: '',
      consultingTopic: '',
      consultingIntention: '',
      consultingexpectation: ''
    });
    // eslint-disable-next-line
  }, []);

  function handleDateSelected(slotInfo) {
    const selectedDate = slotInfo['slots'][0];
    if (moment(selectedDate).day() === 0) return;
    if (moment(selectedDate).isBefore(firstValidAppointmentDate, 'days'))
      return;

    setSelectedDate(selectedDate);
    setForm(form =>
      _.setIn({ ...form }, 'consultingDate', selectedDate.valueOf())
    );
  }
  function handleSubmitAppointment(event) {
    event.preventDefault();

    setIsSubmitLoading(true);
    dispatch(Actions.borrowSpace(form));
  }

  function eventStyleGetter(event, start, end, isSelected) {
    let style = {
      borderRadius: '12rem',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  }
  const DateCell = ({ range, value, children }) => {
    const classes = useStyles();

    return (
      <div
        className={clsx(
          classes.dateWrapper,
          moment(selecredDate).isSame(moment(value), 'days') && 'selected',
          moment(value).day() === 0 && classes.datePastWrapper,
          moment(value).isBefore(firstValidAppointmentDate, 'days') &&
            classes.datePastWrapper
        )}
      >
        {children}
      </div>
    );
  };
  function renderButton() {
    if (!termState) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="預約諮詢"
          disabled
          value="legacy"
          type="submit"
        >
          請先同意使用規則
        </Button>
      );
    } else if (!consultingFormChecker(form)) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="預約諮詢"
          disabled
          value="legacy"
          type="submit"
        >
          請填寫預約資訊
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="預約諮詢"
          value="legacy"
          onClick={handleSubmitAppointment}
          type="submit"
        >
          {isSubmitLoading ? (
            <span className="flex justify-center">
              預約中 <LoadingSpinner width="2em" height="2em" />
            </span>
          ) : (
            '預約諮詢'
          )}
        </Button>
      );
    }
  }

  console.log('form, ', form);

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto relative')}>
      <div ref={headerEl} />
      <Calendar
        className="flex flex-1 container"
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        defaultDate={firstValidAppointmentDate.toDate()}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        step={60}
        eventPropGetter={eventStyleGetter}
        showMultiDayTimes
        components={{
          toolbar: props => {
            return headerEl.current
              ? ReactDOM.createPortal(
                  <CalendarHeader {...props} />,
                  headerEl.current
                )
              : null;
          },
          dateCellWrapper: DateCell
        }}
        onSelectSlot={handleDateSelected}
      />
      <div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
        <CssTextField
          className="mt-8 mb-16"
          required
          label="諮詢日期"
          id="consultingDate"
          name="consultingDate"
          value={moment(form.consultingDate).format('LL')}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  account_box
                </Icon>
              </InputAdornment>
            )
          }}
          fullWidth
        />

        <CssTextField
          select
          required
          className="mt-8 mb-16"
          label="預約時段"
          id="consultingTimeSlot"
          name="consultingTimeSlot"
          value={form.consultingTimeSlot}
          onChange={handleChange}
          variant="outlined"
          SelectProps={{
            IconComponent: Icon
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  location_on
                </Icon>
              </InputAdornment>
            )
          }}
          fullWidth
        >
          <MenuItem className="rounded-full" value="10:00-11:00">
            上午(10:00-11:00)
          </MenuItem>
          <MenuItem className="rounded-full" value="11:00-12:00">
            上午(11:00-12:00)
          </MenuItem>
          <MenuItem className="rounded-full" value="14:00-15:00">
            下午(14:00-15:00)
          </MenuItem>
          <MenuItem className="rounded-full" value="15:00-16:00">
            下午(15:00-16:00)
          </MenuItem>
          <MenuItem className="rounded-full" value="16:00-17:00">
            下午(16:00-17:00)
          </MenuItem>
        </CssTextField>

        <CssTextField
          select
          required
          className="mt-8 mb-16"
          label="諮詢主題"
          id="consultingTopic"
          name="consultingTopic"
          value={form.consultingTopic}
          onChange={handleChange}
          variant="outlined"
          SelectProps={{
            IconComponent: Icon
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  location_on
                </Icon>
              </InputAdornment>
            )
          }}
          fullWidth
        >
          <MenuItem className="rounded-full" value="自我認識">
            自我認識
          </MenuItem>
          <MenuItem className="rounded-full" value="職涯方向探索">
            職涯方向探索
          </MenuItem>
          <MenuItem className="rounded-full" value="職涯目標擬定">
            職涯目標擬定
          </MenuItem>
          <MenuItem className="rounded-full" value="個人優勢分析">
            個人優勢分析
          </MenuItem>
          <MenuItem className="rounded-full" value="擬定職涯計畫">
            擬定職涯計畫
          </MenuItem>
          <MenuItem className="rounded-full" value="職能盤點/履歷健診">
            職能盤點/履歷健診
          </MenuItem>
          <MenuItem className="rounded-full" value="面試演練">
            面試演練
          </MenuItem>
          <MenuItem className="rounded-full" value="其他">
            其他
          </MenuItem>
        </CssTextField>

        <CssTextField
          className="mt-8 mb-16"
          multiline
          rows={5}
          required
          label="諮詢意圖"
          id="consultingIntention"
          name="consultingIntention"
          value={form.consultingIntention}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  account_box
                </Icon>
              </InputAdornment>
            )
          }}
          fullWidth
        />

        <CssTextField
          className="mt-8 mb-16"
          multiline
          rows={5}
          required
          label="期待諮詢的結果為？"
          id="consultingexpectation"
          name="consultingexpectation"
          value={form.consultingexpectation}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  account_box
                </Icon>
              </InputAdornment>
            )
          }}
          fullWidth
        />

        <div className="w-full flex flex-col justify-center my-4">
          <p>您對未來感到茫然，不知道什麼職業適合自己？</p>
          <p>升學或就業不知道該如何做選擇？</p>
          <p>希望有人指點履歷和面試等求職技巧？</p>
          <p>
            1. 本服務係以 15 - 29
            歲之青年為優先。【為尊重隱私，請以本人親自預約】
          </p>
          <p>2. 為尊重專業，預約諮詢以主要諮詢需求為主，恕無法指定諮詢師唷！</p>
          <p>
            3.
            預約完個別諮詢的等待過程中，如有YS的未接來電，07-2313232，請務必記得回撥！以免錯失個別諮詢之機會~
          </p>

          <FormControl className="items-center">
            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTermsConditions"
                  checked={termState}
                  onChange={() => setTermState(!termState)}
                />
              }
              label="我已閱讀並同意遵守相關規範"
            />
          </FormControl>

          {renderButton()}
        </div>
      </div>
    </div>
  );
}

export default withReducer('calendarApp', reducer)(CalendarApp);
