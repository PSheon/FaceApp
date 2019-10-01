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
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { guideFormChecker } from 'app/utils';
import { channelsSuggestion } from './suggestions';

import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const defaultFormState = {
  institutionName: '',
  institutionAddress: '',
  guideDate: '',
  guideTimeSlot: '',
  guideNumber: '',
  guideIntention: '',
  guideHeardFrom: ''
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
function AppointmentGuidePage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const [termState, setTermState] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [guideDate, setGuideDate] = useState(moment().add(7, 'd'));

  useEffect(() => {
    setForm({
      institutionName: '',
      institutionAddress: '',
      guideDate: guideDate.valueOf(),
      guideTimeSlot: '',
      guideNumber: '',
      guideIntention: '',
      guideHeardFrom: ''
    });
    // eslint-disable-next-line
  }, []);

  function handleGuideDateChange(date) {
    setForm(form => _.setIn({ ...form }, 'guideDate', date));
  }

  function handleSubmitAppointment(event) {
    event.preventDefault();

    setIsSubmitLoading(true);
    dispatch(Actions.appointmentGuide(form));
  }

  function renderButton() {
    if (!termState) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="預約導覽"
          disabled
          value="legacy"
          type="submit"
        >
          請先同意使用規則
        </Button>
      );
    } else if (!guideFormChecker(form)) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-200 mx-auto mt-16 rounded-full"
          aria-label="預約導覽"
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
          aria-label="預約導覽"
          value="legacy"
          onClick={handleSubmitAppointment}
          disabled={isSubmitLoading}
          type="submit"
        >
          {isSubmitLoading ? (
            <span className="flex justify-center">
              預約中 <LoadingSpinner width="2em" height="2em" />
            </span>
          ) : (
            '預約導覽'
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
              預約 YS 空間導覽
            </Typography>
          </FuseAnimate>

          <FuseAnimate duration={400} delay={600}>
            <Typography
              variant="subtitle1"
              color="inherit"
              className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512 whitespace-pre-line"
            >
              {`聯絡窗口：(07)231-3232 黃小姐
              聯絡窗口：(07)821-0171 轉 3203 陳先生
              傳真：(07)241-6562
              地址：80145 高雄市前金區五福三路 21 號 8 樓`}
            </Typography>
          </FuseAnimate>
        </div>

        <div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
          {/* 填寫活動前問卷 */}
          <CssTextField
            required
            className="mt-8 mb-16"
            label="預約導覽機關 (團體) 名稱"
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
            label="預約導覽機關 (團體) 地址"
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
            invalidDateMessage="預約導覽日期格式錯誤"
            fullWidth
            inputVariant="outlined"
            format="YYYY/MM/DD"
            label="預約導覽日期 (請於 7 天前申請)"
            TextFieldComponent={CssTextField}
            name="guideDate"
            value={guideDate}
            onChange={date => {
              setGuideDate(date);
              handleGuideDateChange(date.valueOf());
            }}
            cancelLabel="取消"
            okLabel="確認"
          />

          <CssTextField
            select
            required
            className="mt-8 mb-16"
            label="預約導覽時間"
            id="guideTimeSlot"
            name="guideTimeSlot"
            value={form.guideTimeSlot}
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
            error={form.guideNumber === ''}
            required
            label="預約導覽人數"
            id="guideNumber"
            name="guideNumber"
            value={form.guideNumber}
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
            label="預約導覽目的"
            placeholder="本次參訪行程有申請公部門相關計畫 或 規劃媒體曝光或其他宣傳計畫"
            id="guideIntention"
            name="guideIntention"
            value={form.guideIntention}
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
            id="guideHeardFrom"
            name="guideHeardFrom"
            value={form.guideHeardFrom}
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
            <p>1. 空間申請以本中心主要服務對象 15-29 歲之青年為主。</p>
            <p>
              2. 預約後 3-5
              個工作日內，經分署審核同意後，本中心將有專人主動聯繫後續事宜。如未收到本中
              心專人聯繫後續事宜，歡迎來電洽詢。
            </p>
            <p>3. 預約資料請確實詳填以確保權益，本中心保有准駁權利。</p>
            <p>
              4.
              申請空間之用途限與青年職涯發展相關之非營利活動，不接受營利、宗教、政治行為等活動借
              用。若獲查證屬實，本中心得隨時終止場地之使用，申請人不得異議。
            </p>
            <p>
              5. 本中心若有緊急使用，得於使用日 14
              日前通知申請人取消使用，申請人不得異議及請求賠償。
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
    </MuiPickersUtilsProvider>
  );
}

export default AppointmentGuidePage;
