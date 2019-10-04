import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimateGroup } from '@fuse';
import { Box, TextField, Typography, Button } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const defaultFormState = {
  _id: '',
  speakerExpressionStars: 0,
  speakerContentStars: 0,
  eventStars: 0,
  eventComments: ''
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
function ReviewsSection(props) {
  const { eventDetail, selfEventActivityLog } = props;
  const dispatch = useDispatch();
  const EVENTS_ACTIVITY_LOGS = useSelector(
    ({ activity }) => activity.eventLogs
  );
  const isUpdatingComment = EVENTS_ACTIVITY_LOGS.updating;

  const { form, handleChange, setForm } = useForm(defaultFormState);

  useEffect(() => {
    if (selfEventActivityLog) {
      setForm({
        speakerExpressionStars:
          selfEventActivityLog.speakerExpressionStars || 0,
        speakerContentStars: selfEventActivityLog.speakerContentStars || 0,
        eventStars: selfEventActivityLog.eventStars || 0,
        eventComments: selfEventActivityLog.eventComments || ''
      });
    }
  }, [selfEventActivityLog, setForm]);

  function handleSubmit(event) {
    event.preventDefault();

    if (eventDetail) {
      dispatch(
        Actions.updateEventReview({
          eventId: eventDetail._id,
          ...form
        })
      );
    }
  }
  function isFormValid() {
    return (
      !!form.speakerExpressionStars &&
      !!form.speakerContentStars &&
      !!form.eventStars
    );
  }

  // console.log('selfEventActivityLog ', selfEventActivityLog)

  /* 載入中 */
  if (!selfEventActivityLog || !form) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <LoadingSpinner width={128} height={128} />
      </div>
    );
  }
  return (
    <FuseAnimateGroup
      enter={{
        animation: 'transition.expandIn'
      }}
      className="w-full flex flex-col my-8"
    >
      <Typography
        variant="h2"
        className="mt-16 sm:mt-40 flex items-center sm:mb-12"
        color="inherit"
      >
        課程評價
      </Typography>

      <div className="flex flex-col justify-center items-center md:flex-row">
        <div className="w-full md:w-1/3">
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography
              variant="subtitle1"
              className="mt-12 sm:mt-16 flex items-center sm:mb-12"
              color="inherit"
            >
              講師的表達方式
            </Typography>

            <Rating
              id="speakerExpressionStars"
              name="speakerExpressionStars"
              onChange={handleChange}
              value={Number(form['speakerExpressionStars'])}
              size="large"
              precision={0.5}
            />
          </Box>

          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography
              variant="subtitle1"
              className="mt-12 sm:mt-16 flex items-center sm:mb-12"
              color="inherit"
            >
              講師的教學內容
            </Typography>

            <Rating
              id="speakerContentStars"
              name="speakerContentStars"
              onChange={handleChange}
              value={Number(form['speakerContentStars'])}
              size="large"
              precision={0.5}
            />
          </Box>

          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography
              variant="subtitle1"
              className="mt-12 sm:mt-16 flex items-center sm:mb-12"
              color="inherit"
            >
              活動整體評價
            </Typography>

            <Rating
              id="eventStars"
              name="eventStars"
              onChange={handleChange}
              value={Number(form['eventStars'])}
              size="large"
              precision={0.5}
            />
          </Box>
        </div>

        <div className="w-full md:w-2/3 flex flex-col">
          <Typography
            variant="subtitle1"
            className="mt-12 sm:mt-16 flex items-center sm:mb-12"
            color="inherit"
          >
            給講師或活動承辦人一些鼓勵吧！
          </Typography>

          <CssTextField
            className="mt-12 mb-24"
            label="簡短評語或心得"
            id="eventComments"
            name="eventComments"
            value={form['eventComments']}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
          />
          {isFormValid() ? (
            <Button
              className="rounded-full max-w-160 self-center"
              variant="contained"
              color="primary"
              disabled={isUpdatingComment}
              onClick={handleSubmit}
            >
              {isUpdatingComment ? (
                <span className="flex justify-center">
                  給予評價中 <LoadingSpinner width="2em" height="2em" />
                </span>
              ) : (
                '給予評價'
              )}
            </Button>
          ) : (
            <Button
              className="rounded-full max-w-200 self-center"
              variant="contained"
              color="primary"
              disabled
            >
              請填寫活動評價
            </Button>
          )}
        </div>
      </div>
    </FuseAnimateGroup>
  );
}

export default ReviewsSection;
