import React from 'react';
import {
  TextField,
  Typography,
  FormControlLabel,
  InputAdornment,
  Icon,
  FormControl,
  MenuItem,
  FormLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import isIdentityCard from 'validator/lib/isIdentityCard';
import { withStyles } from '@material-ui/core/styles';

import { heardFromSuggestion } from '../suggestions';

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
function PreQuestionFormSection(props) {
  const { preQuestionList, form, handleChange } = props;

  if (!preQuestionList || preQuestionList.length === 0) {
    return null;
  }
  return (
    <div className="w-full flex flex-col justify-center items-center py-12">
      <Typography variant="subtitle1" color="textPrimary">
        活動前問卷
      </Typography>

      {preQuestionList.some(item => item === 'participateReason') && (
        <CssTextField
          className="mt-8 mb-16"
          label="請問您為何想參加這場活動？"
          multiline
          rows={3}
          id="participateReason"
          name="participateReason"
          value={form.participateReason}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_box</Icon></InputAdornment>
          }}
          fullWidth
        />
      )}

      {preQuestionList.some(item => item === 'participantHeardFrom') && (

        <CssTextField
          select
          className="mt-8 mb-16"
          label="請問您從何處得知本活動？"
          id="participantHeardFrom"
          name="participantHeardFrom"
          value={form.participantHeardFrom}
          onChange={handleChange}
          variant="outlined"
          SelectProps={{
            IconComponent: Icon
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
          }}
          fullWidth
        >
          {heardFromSuggestion.map(suggest => (
            <MenuItem className="rounded-full" value={suggest.value} key={suggest.value}>
              {suggest.label}
            </MenuItem>
          ))}
        </CssTextField>
      )}

      {preQuestionList.some(item => item === 'participantExpectation') && (
        <CssTextField
          className="mt-8 mb-16"
          label="請問您對於本場活動有什麼期待？"
          multiline
          rows={3}
          id="participantExpectation"
          name="participantExpectation"
          value={form.participantExpectation}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_box</Icon></InputAdornment>
          }}
          fullWidth
        />
      )}

      {preQuestionList.some(item => item === 'participantID') && (
        <CssTextField
          className="mt-8 mb-16"
          error={!isIdentityCard(form.participantID, ['zh-TW'])}
          helperText={!isIdentityCard(form.participantID, ['zh-TW']) ? "身分證格式錯誤 e.g. G123456789" : ""}
          label="請問您的身分證字號？"
          id="participantID"
          name="participantID"
          value={form.participantID}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_box</Icon></InputAdornment>
          }}
          fullWidth
        />
      )}

      {preQuestionList.some(item => item === 'participantIsManager') && (
        <FormControl component="fieldset" className="py-12">
          <FormLabel component="legend">您本身具有管理職位嗎？</FormLabel>
          <RadioGroup aria-label="participantIsManager" id="participantIsManager" name="participantIsManager" value={form.participantIsManager} onChange={handleChange} row>
            <FormControlLabel
              value="yes"
              control={<Radio color="primary" />}
              label="有"
              labelPlacement="end"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="無"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      )}

      {preQuestionList.some(item => item === 'participateLunch') && (
        <FormControl component="fieldset" className="py-12">
          <FormLabel component="legend">您會參與中午餐敘嗎？</FormLabel>
          <RadioGroup aria-label="participateLunch" id="participateLunch" name="participateLunch" value={form.participateLunch} onChange={handleChange} row>
            <FormControlLabel
              value="yes"
              control={<Radio color="primary" />}
              label="會"
              labelPlacement="end"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="不會"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      )}

      {preQuestionList.some(item => item === 'lunchType') && (
        <FormControl component="fieldset" className="py-12">
          <FormLabel component="legend">您的用餐習慣？</FormLabel>
          <RadioGroup aria-label="lunchType" id="lunchType" name="lunchType" value={form.lunchType} onChange={handleChange} row>
            <FormControlLabel
              value="meal"
              control={<Radio color="primary" />}
              label="葷食"
              labelPlacement="end"
            />
            <FormControlLabel
              value="vegetarian"
              control={<Radio color="primary" />}
              label="素食"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      )}
    </div>
  )
}

export default PreQuestionFormSection;
