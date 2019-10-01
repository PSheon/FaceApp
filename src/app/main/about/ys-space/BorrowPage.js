import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  FormControlLabel,
  InputAdornment,
  Icon,
  FormControl,
  Checkbox,
  MenuItem,
  Button
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import _ from '@lodash';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import clsx from 'clsx';
import { useForm } from '@fuse/hooks';
import history from '@history';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { spaceConverter, borrowFormChecker } from 'app/utils';
import { channelsSuggestion } from './suggestions';

import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const spaceList = [
  'openSpace',
  'groupConsultationRoom',
  'capitalCenter',
  'groupTestingRoom',
  'businessSpace',
  'highlightStudio'
];
const defaultFormState = {
  institutionName: '',
  institutionAddress: '',
  borrowingDate: '',
  borrowingTimeSlot: '',
  borrowingNumber: '',
  borrowingSpace: '',
  borrowingIntention: '',
  borrowingHeardFrom: ''
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
  header: {
    background:
      'linear-gradient(to right, ' +
      theme.palette.primary.dark +
      ' 0%, ' +
      theme.palette.primary.main +
      ' 100%)',
    color: theme.palette.primary.contrastText
  },
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0'
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px'
    },
    '&$expanded': {
      margin: 'auto'
    }
  }
}));
function BorrowPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const WANTED_SPACE = props.match.params.space;
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const [termState, setTermState] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [borrowDate, setBorrowDate] = useState(moment().add(7, 'd'));

  useEffect(() => {
    if (!spaceList.some(item => item === WANTED_SPACE)) {
      history.push({
        pathname: '/ys-space'
      });
    } else {
      setForm({
        institutionName: '',
        institutionAddress: '',
        borrowingDate: borrowDate.valueOf(),
        borrowingTimeSlot: '',
        borrowingNumber: '',
        borrowingSpace: WANTED_SPACE,
        borrowingIntention: '',
        borrowingHeardFrom: ''
      });
    }
    // eslint-disable-next-line
  }, [WANTED_SPACE]);

  function handleBorrowDateChange(date) {
    setForm(form => _.setIn({ ...form }, 'borrowingDate', date));
  }

  function handleSubmitAppointment(event) {
    event.preventDefault();

    setIsSubmitLoading(true);
    dispatch(Actions.borrowSpace(form));
  }

  function renderButton() {
    if (!termState) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="借用場地"
          disabled
          value="legacy"
          type="submit"
        >
          請先同意使用規則
        </Button>
      );
    } else if (!borrowFormChecker(form)) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="借用場地"
          disabled
          value="legacy"
          type="submit"
        >
          請填寫借用資訊
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="借用場地"
          value="legacy"
          onClick={handleSubmitAppointment}
          type="submit"
        >
          {isSubmitLoading ? (
            <span className="flex justify-center">
              借用中 <LoadingSpinner width="2em" height="2em" />
            </span>
          ) : (
            `借用 ${spaceConverter(WANTED_SPACE)['title']}`
          )}
        </Button>
      );
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="zh-tw">
      <div className="w-full flex flex-col flex-auto">
        <div
          className={clsx(
            classes.header,
            'flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-400 sm:h-360'
          )}
        >
          <FuseAnimate
            animation="transition.slideUpIn"
            duration={400}
            delay={100}
          >
            <Typography
              color="inherit"
              className="text-36 sm:text-56 font-light"
            >
              {spaceConverter(WANTED_SPACE)['title']}
            </Typography>
          </FuseAnimate>

          <FuseAnimate duration={400} delay={600}>
            <Typography
              variant="subtitle1"
              color="inherit"
              className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512 whitespace-pre-line"
            >
              {spaceConverter(WANTED_SPACE)['description']}
            </Typography>
          </FuseAnimate>
        </div>

        <div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
          {/* 填寫活動前問卷 */}
          <CssTextField
            required
            className="mt-8 mb-16"
            label="借用機關 (團體) 名稱"
            id="institutionName"
            name="institutionName"
            value={form.institutionName}
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
            required
            className="mt-8 mb-16"
            label="借用機關 (團體) 地址"
            id="institutionAddress"
            name="institutionAddress"
            value={form.institutionAddress}
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

          <DatePicker
            className="my-12"
            minDate={moment()
              .add(7, 'd')
              .valueOf()}
            disablePast
            views={['month', 'date']}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    cake
                  </Icon>
                </InputAdornment>
              )
            }}
            DialogProps={{
              classes: {
                dialogRoot: 'rounded-12'
              }
            }}
            openTo="year"
            autoOk
            required
            invalidDateMessage="借用日期格式錯誤"
            fullWidth
            inputVariant="outlined"
            format="YYYY/MM/DD"
            label="借用日期 (請於 7 天前申請)"
            TextFieldComponent={CssTextField}
            name="borrowingDate"
            value={borrowDate}
            onChange={date => {
              setBorrowDate(date);
              handleBorrowDateChange(date.valueOf());
            }}
            cancelLabel="取消"
            okLabel="確認"
          />

          <CssTextField
            select
            required
            className="mt-8 mb-16"
            label="借用時間"
            id="borrowingTimeSlot"
            name="borrowingTimeSlot"
            value={form.borrowingTimeSlot}
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
            <MenuItem className="rounded-full" value="上午">
              上午(09:30~12:30)
            </MenuItem>
            <MenuItem className="rounded-full" value="下午">
              下午(14:00~17:00)
            </MenuItem>
          </CssTextField>

          <CssTextField
            className="mt-8 mb-16"
            error={form.borrowingNumber === ''}
            required
            label="借用人數"
            id="borrowingNumber"
            name="borrowingNumber"
            value={form.borrowingNumber}
            onChange={handleChange}
            type="number"
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
            label="借用目的"
            id="borrowingIntention"
            name="borrowingIntention"
            value={form.borrowingIntention}
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
            select
            required
            className="mt-8 mb-16"
            label="請問您主要從何處得知 YS"
            id="borrowingHeardFrom"
            name="borrowingHeardFrom"
            value={form.borrowingHeardFrom}
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
            {channelsSuggestion.map(suggest => (
              <MenuItem
                className="rounded-full"
                value={suggest.value}
                key={suggest.value}
              >
                {suggest.label}
              </MenuItem>
            ))}
          </CssTextField>

          <div className="w-full flex flex-col justify-center my-4">
            <p>
              1.
              空間運用申請負責人請提早至櫃台確認借用物品及場地布置，使用完畢請確實將桌椅歸位場地復原，物品歸還。
            </p>
            <p>2. 請勿擅自移動本中心之硬體設施。</p>
            <p>
              3.
              使用前，應先行確認設備之完整性；若於使用前即已出現瑕疵或損壞者，使用者應立即告知服務人員協助處理。
            </p>
            <p>
              4.
              本中心相關硬體設備請照正常流程操作使用，使用後，務必確實歸位並確認電源已關閉，以免造成設備損壞。
            </p>
            <p>
              5.
              使用者請小心保管個人財物，貴重物品請隨身攜帶。如有遺失，本中心恕不負保管與賠償責任。
            </p>
            <p>
              6.
              若有攜帶食物及飲料入內，離開前請務必確認環境清潔、並將個人隨身用品及垃圾帶走，或攜帶至垃圾桶，並做好垃圾分類。
            </p>
            <p>7. 本大樓全面禁菸，請勿在各空間吸菸以免觸動警鈴。</p>
            <p>8. 為維護其他使用者之權益，使用中請保持秩序、維持音適當音量。</p>

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
    </MuiPickersUtilsProvider>
  );
}

export default BorrowPage;
