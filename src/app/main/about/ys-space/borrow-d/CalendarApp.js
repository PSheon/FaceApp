import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Fab, Icon, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment'
import clsx from 'clsx';
import { useForm } from '@fuse/hooks';
import history from '@history';
import withReducer from 'app/store/withReducer';

import * as ReactDOM from 'react-dom';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import EventDialog from './EventDialog';
import CalendarHeader from './CalendarHeader';

const localizer = momentLocalizer(moment);

const spaceList = [
	'openSpace',
	'groupConsultationRoom',
	'capitalCenter',
	'groupTestingRoom',
	'businessSpace',
	'highlightStudio',
];
const defaultFormState = {
	borrowingDate: '',
	borrowingTimeSlot: '',
	borrowingNumber: 3,
	borrowingSpace: '',
	borrowingHeardFrom: '',
};
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
			'& > .rbc-row': {
				...theme.mixins.border(1)
			},
			'& .rbc-month-row': {
				...theme.mixins.border(1),
				borderWidth: '0 1px 1px 1px!important',
				minHeight: 128
			},
			'& .rbc-header + .rbc-header': {
				...theme.mixins.borderLeft(1)
			},
			'& .rbc-header': {
				...theme.mixins.borderBottom(0)
			},
			'& .rbc-day-bg + .rbc-day-bg': {
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
			opacity: .5,
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
			backgroundColor: theme.palette.type === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.16)'
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
	addButton: {
		position: 'absolute',
		right: 12,
		top: 172,
		zIndex: 99
	}
}));

function BorrowPage(props) {
	const dispatch = useDispatch();
	const WANTED_SPACE = props.match.params.space;
	const USER = useSelector(({ auth }) => auth.user);
	const events = useSelector(({ calendarApp }) => calendarApp.events.entities);
	const { form, handleChange, setForm } = useForm(defaultFormState);

	const classes = useStyles(props);
	const headerEl = useRef(null);

	useEffect(() => {
		if (!spaceList.some(item => item === WANTED_SPACE)) {
			history.push({
				pathname: '/ys-space'
			})
		} else {
			setForm({
				borrowingDate: '',
				borrowingTimeSlot: '',
				borrowingNumber: 3,
				borrowingSpace: WANTED_SPACE,
				borrowingHeardFrom: '',
			})
		}
	}, [WANTED_SPACE, setForm]);
	useEffect(() => {
		dispatch(Actions.getEvents());
	}, [dispatch]);

	function resizeEvent({ event, start, end }) {
		delete event.type;
		dispatch(Actions.updateEvent({
			...event,
			start,
			end
		}));
	}

	function renderBorrowForm() {
		if (USER.role.length === 0) {
			return (
				<Link role="button" to="/login">
					<Button
						variant="contained"
						color="primary"
						className="w-full rounded-full"
						aria-label="登入"
						value="legacy"
					>
						請先登入以借用空間
					</Button>
				</Link>
			)
		} else {
			return (
				<Button
					variant="contained"
					color="primary"
					className="w-full rounded-full"
					aria-label="提交申請"
					value="legacy"
				>
					提交申請
				</Button>
			)
		}
	}

	return (
		<div className={clsx(classes.root, "flex flex-col flex-auto relative")}>
			<div ref={headerEl} />
			<Calendar
				className="flex flex-1 container"
				selectable
				localizer={localizer}
				events={events}
				resizable
				onEventResize={resizeEvent}
				defaultView={Views.MONTH}
				defaultDate={new Date(2018, 3, 1)}
				startAccessor="start"
				endAccessor="end"
				views={['month', 'week', 'day']}
				step={60}
				showMultiDayTimes
				components={{
					toolbar: (props) => {
						return headerEl.current ?
							ReactDOM.createPortal(
								<CalendarHeader {...props} WANTED_SPACE={WANTED_SPACE} />,
								headerEl.current
							) : null;
					}
				}}
				// onNavigate={handleNavigate}
				onSelectEvent={event => {
					dispatch(Actions.openEditEventDialog(event));
				}}
				onSelectSlot={slotInfo => {
					dispatch(Actions.openNewEventDialog({
						start: slotInfo.start.toLocaleString(),
						end: slotInfo.end.toLocaleString()
					}))
				}}
			/>
			{/* <EventDialog /> */}

			{renderBorrowForm()}
		</div>
	)
}

export default withReducer('calendarApp', reducer)(BorrowPage);
