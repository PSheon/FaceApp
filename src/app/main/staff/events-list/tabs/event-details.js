import React, { useState } from 'react';
import _ from '@lodash';
import {
  createMuiTheme,
  TextField,
  FormControlLabel,
  InputAdornment,
  Icon,
  Switch
} from '@material-ui/core';
import { FuseChipSelect } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';

const materialDatePickerTheme = createMuiTheme({
  /* TODO: Fix here */
  overrides: {
    MuiPaper: {
      root: {
        borderRadius: '2.4rem',
      }
    },
    MuiPickersModal: {
      root: {
        borderRadius: '2.4rem',
      },
      dialogAction: {
        display: "none"
      }
    },
  },
});
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3e3e3e',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fefefe',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5e5e5e',
      },
      '&:hover fieldset': {
        borderColor: '#3e3e3e',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3e3e3e',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '2.4rem',
    }
  },
})(TextField);

function EventDetailEdit(props) {
  const { form, setForm, handleFormChange } = props;
  const [startDateTime, setStartDateTime] = useState(form.startDateTime);
  const [endDateTime, setEndDateTime] = useState(form.endDateTime);
  const [enrollDeadline, setEnrollDeadline] = useState(form.enrollDeadline);

  function handleChipChange(tags) {
    setForm(form => _.set({ ...form }, 'tags', tags.map(tag => tag.value)));
  }
  function handleDateTimeChange(fields, datetime) {
    setForm(form => _.setIn({ ...form }, fields, datetime))
  }

  return (
    <MuiPickersUtilsProvider theme={materialDatePickerTheme} utils={MomentUtils} locale="zh-tw">
      <div className="px-16">
        <CssTextField
          className="mt-8 mb-16"
          error={form.title === ''}
          required
          label="活動大標題"
          autoFocus
          id="title"
          name="title"
          value={form.title}
          onChange={handleFormChange}
          type="text"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_box</Icon></InputAdornment>
          }}
          fullWidth
        />

        <CssTextField
          className="mt-8 mb-16"
          error={form.subTitle === ''}
          required
          label="活動副標題"
          id="subTitle"
          name="subTitle"
          value={form.subTitle}
          onChange={handleFormChange}
          type="text"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_box</Icon></InputAdornment>
          }}
          fullWidth
        />

        <FuseChipSelect
          className="mt-8 mb-16"
          value={
            form.tags.map(item => ({
              value: item,
              label: item
            }))
          }
          onChange={(value) => handleChipChange(value)}
          placeholder="加個新聞標籤吧"
          textFieldProps={{
            label: '新聞標籤',
            InputLabelProps: {
              shrink: true
            },
            variant: 'outlined'
          }}
          isMulti
        />

        <div className="flex justify-around items-center py-12">
          <DateTimePicker
            className="mr-8"
            InputProps={{
              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">date_range</Icon></InputAdornment>
            }}
            DialogProps={{
              classes: {
                dialogRoot: 'rounded-12'
              }
            }}
            autoOk
            invalidDateMessage="開始日期格式錯誤"
            fullWidth
            inputVariant="outlined"
            format="LLLL a"
            label="開始日期"
            TextFieldComponent={CssTextField}
            name="startDateTime"
            value={startDateTime}
            onChange={date => {
              setStartDateTime(date);
              handleDateTimeChange('startDateTime', date.valueOf())
            }}
            cancelLabel="取消"
            okLabel="確認"
            minutesStep={5}
          />
          <DateTimePicker
            className="ml-8"
            InputProps={{
              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">date_range</Icon></InputAdornment>
            }}
            DialogProps={{
              classes: {
                dialogRoot: 'rounded-12'
              }
            }}
            autoOk
            ampm
            invalidDateMessage="結束日期格式錯誤"
            fullWidth
            inputVariant="outlined"
            format="LLLL a"
            label="結束日期"
            TextFieldComponent={CssTextField}
            name="endDateTime"
            value={endDateTime}
            onChange={date => {
              setEndDateTime(date);
              handleDateTimeChange('endDateTime', date.valueOf())
            }}
            cancelLabel="取消"
            okLabel="確認"
            minutesStep={5}
          />
        </div>

        <DateTimePicker
          className="my-12"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">date_range</Icon></InputAdornment>
          }}
          DialogProps={{
            classes: {
              dialogRoot: 'rounded-12'
            }
          }}
          autoOk
          ampm
          invalidDateMessage="截止日期格式錯誤"
          fullWidth
          inputVariant="outlined"
          format="LLLL a"
          label="報名截止日期"
          TextFieldComponent={CssTextField}
          name="enrollDeadline"
          value={enrollDeadline}
          onChange={date => {
            setEnrollDeadline(date);
            handleDateTimeChange('enrollDeadline', date.valueOf())
          }}
          cancelLabel="取消"
          okLabel="確認"
          minutesStep={5}
        />

        <CssTextField
          className="mt-8 mb-16"
          error={form.maximumOfApplicants === ''}
          required
          label="報名人數上限"
          id="maximumOfApplicants"
          name="maximumOfApplicants"
          value={form.maximumOfApplicants}
          onChange={handleFormChange}
          type="number"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_box</Icon></InputAdornment>
          }}
          fullWidth
        />

        <CssTextField
          className="mt-8 mb-16"
          error={form.location === ''}
          required
          label="活動地點"
          id="location"
          name="location"
          value={form.location}
          onChange={handleFormChange}
          type="text"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
          }}
          fullWidth
        />

        <FormControlLabel
          className="mt-8 mb-16"
          label="發佈活動訊息"
          labelPlacement="start"
          control={
            <Switch
              checked={form.published}
              id="published"
              name="published"
              onChange={handleFormChange}
            />
          }
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default EventDetailEdit;
