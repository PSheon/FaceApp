import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import moment from 'moment';
import InputMask from 'react-text-mask';
import {
  AppBar,
  TextField,
  Divider,
  Card,
  CardContent,
  Toolbar,
  Typography,
  FormControlLabel,
  InputAdornment,
  Icon,
  FormControl,
  FormLabel,
  RadioGroup,
  MenuItem,
  Button,
  Radio
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import { useForm } from '@fuse/hooks';

import { userDetailChecker } from 'app/utils';
import { citiesSuggestion, channelsSuggestion, departmentsSuggestion } from '../suggestions';
import * as Actions from 'app/auth/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

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

function PhoneMask(props) {
  const { inputRef, ...other } = props;

  return (
    <InputMask
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', 0, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function WidgetEditProfileCard(props) {
  const dispatch = useDispatch();
  const USER_PROFILE = useSelector(({ auth }) => auth.user);
  const UserData = USER_PROFILE.data;

  const [isLoading, setIsLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [userBob, setUserBob] = useState('1995-08-23');
  const [userFirstYearOfCareer, setUserFirstYearOfCareer] = useState('2003-06');

  useEffect(() => {
    if (!form) {
      const {
        fullName,
        bob,
        gender,
        education,
        schoolName,
        departmentName,
        employmentStatus,
        phone,
        city,
        postAddress,
        companyName,
        serviceDepartment,
        jobTitle,
        firstYearOfCareer,
        heardFrom,
        haveParticipated,
      } = UserData;

      setForm({
        fullName: fullName || '',
        bob: moment(bob).format('YYYY/MM/DD') || moment().format('YYYY/MM/DD'),
        gender: gender || '',
        education: education || '',
        schoolName: schoolName || '',
        departmentName: departmentName || '',
        employmentStatus: employmentStatus || '',
        phone: phone || '',
        city: city || '',
        postAddress: postAddress || '',
        companyName: companyName || '',
        serviceDepartment: serviceDepartment || '',
        jobTitle: jobTitle || '',
        firstYearOfCareer: moment(firstYearOfCareer).format('YYYY/MM') || moment().format('YYYY/MM'),
        heardFrom: heardFrom || '',
        haveParticipated: haveParticipated || 'no',
      })

      if (bob) {
        setUserBob(moment(bob).format('YYYY/MM/DD'))
      }
      if (firstYearOfCareer) {
        console.log('moment(firstYearOfCareer).format(YYYY/MM) ', moment(firstYearOfCareer).format('YYYY/MM'))
        setUserFirstYearOfCareer(moment(firstYearOfCareer).format('YYYY/MM'))
      }
    }
  }, [UserData, form, setForm]);


  function handleBobDateChange(date) {
    setForm(form => _.setIn({ ...form }, 'bob', date))
  }
  function handleFirstYearOfCareerDateChange(date) {
    console.log('date ', date)
    setForm(form => _.setIn({ ...form }, 'firstYearOfCareer', date))
  }
  function handleUpdateProfile() {
    setIsLoading(true);

    dispatch(Actions.updateUserProfile(form, props.handledToggleMode))
  }

  function renderButtonText({ isLoading, inputFilled }) {
    if (isLoading) {
      return <span className="flex justify-center">更新資料中 <LoadingSpinner width="2em" height="2em" /></span>
    } else if (!inputFilled) {
      return '請完成所有欄位'
    } else {
      return '更新資料'
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="zh-tw">
      <Card className="h-full rounded-16">
        <AppBar position="static" elevation={0}>
          <Toolbar className="pl-16 pr-8">
            <Typography variant="subtitle1" color="inherit" className="flex-1">
              我的資料
            </Typography>
          </Toolbar>
        </AppBar>
        <CardContent>
          {
            form && (
              <div className="p-16 sm:p-24 max-w-2xl">
                <div className="pb-32">
                  <div className="flex justify-center items-center w-full pb-12">
                    <h2>個人資料</h2>
                  </div>

                  <CssTextField
                    className="mt-8 mb-16"
                    label="中文全名"
                    autoFocus
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_box</Icon></InputAdornment>
                    }}
                    fullWidth
                  />

                  <FormControl component="fieldset" className="py-12">
                    <FormLabel component="legend">性別</FormLabel>
                    <RadioGroup aria-label="gender" id="gender" name="gender" value={form.gender} onChange={handleChange} row>
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="男性"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="diversity"
                        control={<Radio color="primary" />}
                        label="多元性別"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="女性"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>

                  <DatePicker
                    className="my-12"
                    disableFuture
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">cake</Icon></InputAdornment>
                    }}
                    DialogProps={{
                      classes: {
                        dialogRoot: 'rounded-12'
                      }
                    }}
                    openTo="year"
                    autoOk
                    invalidDateMessage="生日日期格式錯誤"
                    fullWidth
                    inputVariant="outlined"
                    format="YYYY/MM/DD"
                    label="生日"
                    TextFieldComponent={CssTextField}
                    name="bob"
                    value={userBob}
                    onChange={date => {
                      setUserBob(date);
                      handleBobDateChange(date.valueOf());
                    }}
                    cancelLabel="取消"
                    okLabel="確認"
                  />
                </div>

                <Divider />

                <div className="py-32">
                  <div className="flex justify-center items-center w-full pb-12">
                    <h2>教育程度</h2>
                  </div>

                  <FormControl component="fieldset" className="py-12">
                    <FormLabel component="legend">最高學歷</FormLabel>
                    <RadioGroup aria-label="education" id="education" name="education" value={form.education} onChange={handleChange} row>
                      <FormControlLabel
                        value="middle"
                        control={<Radio color="primary" />}
                        label="國中"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="high"
                        control={<Radio color="primary" />}
                        label="高中 / 高職"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="faculty"
                        control={<Radio color="primary" />}
                        label="專科"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="bachelor"
                        control={<Radio color="primary" />}
                        label="大學"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="institute"
                        control={<Radio color="primary" />}
                        label="研究所或以上"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>

                  <CssTextField
                    className="mt-8 mb-16"
                    label="學校名稱"
                    id="schoolName"
                    name="schoolName"
                    value={form.schoolName}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">school</Icon></InputAdornment>
                    }}
                    fullWidth
                  />

                  {/* <CssTextField
                    className="mt-8 mb-16"
                    label="科系名稱"
                    id="departmentName"
                    name="departmentName"
                    value={form.departmentName}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_balance</Icon></InputAdornment>
                    }}
                    fullWidth
                  /> */}
                  <CssTextField
                    select
                    className="mt-8 mb-16"
                    label="就讀學系或學群"
                    id="departmentName"
                    name="departmentName"
                    value={form.departmentName}
                    onChange={handleChange}
                    variant="outlined"
                    SelectProps={{
                      IconComponent: Icon
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_balance</Icon></InputAdornment>
                    }}
                    fullWidth
                  >
                    {departmentsSuggestion.map(suggest => (
                      <MenuItem className="rounded-full" value={suggest.value} key={suggest.value}>
                        {suggest.label}
                      </MenuItem>
                    ))}
                  </CssTextField>

                  <FormControl component="fieldset" className="py-12">
                    <FormLabel component="legend">目前身分</FormLabel>
                    <RadioGroup aria-label="employmentStatus" id="employmentStatus" name="employmentStatus" value={form.employmentStatus} onChange={handleChange} row>
                      <FormControlLabel
                        value="student"
                        control={<Radio color="primary" />}
                        label="在學中"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="employed"
                        control={<Radio color="primary" />}
                        label="在職中"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="self-employed"
                        control={<Radio color="primary" />}
                        label="創業中"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="unemployed"
                        control={<Radio color="primary" />}
                        label="待業中"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <Divider />

                <div className="py-32">
                  <div className="flex justify-center items-center w-full pb-12">
                    <h2>職涯歷程</h2>
                  </div>

                  <CssTextField
                    className="mt-8 mb-16"
                    label="任職企業"
                    id="companyName"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">school</Icon></InputAdornment>
                    }}
                    fullWidth
                  />

                  <CssTextField
                    className="mt-8 mb-16"
                    label="任職部門"
                    id="serviceDepartment"
                    name="serviceDepartment"
                    value={form.serviceDepartment}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">school</Icon></InputAdornment>
                    }}
                    fullWidth
                  />

                  <CssTextField
                    className="mt-8 mb-16"
                    label="任職頭銜"
                    id="jobTitle"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">school</Icon></InputAdornment>
                    }}
                    fullWidth
                  />

                  <DatePicker
                    className="my-12"
                    views={["year", "month"]}
                    disableFuture
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">cake</Icon></InputAdornment>
                    }}
                    DialogProps={{
                      classes: {
                        dialogRoot: 'rounded-12'
                      }
                    }}
                    autoOk
                    invalidDateMessage="到職年份格式錯誤"
                    fullWidth
                    inputVariant="outlined"
                    format="YYYY/MM"
                    label="到職年份"
                    TextFieldComponent={CssTextField}
                    name="firstYearOfCareer"
                    value={userFirstYearOfCareer}
                    onChange={date => {
                      setUserFirstYearOfCareer(date);
                      handleFirstYearOfCareerDateChange(date.valueOf());
                    }}
                    cancelLabel="取消"
                    okLabel="確認"
                  />
                </div>

                <Divider />

                <div className="py-32">
                  <div className="flex justify-center items-center w-full pb-12">
                    <h2>聯絡方式</h2>
                  </div>

                  <CssTextField
                    className="mt-8 mb-16"
                    error={!/^\(0[0-9]\)\s[0-9]{4}-[0-9]{4}$/.test(form.phone)}
                    helperText={!/^\(0[0-9]\)\s[0-9]{4}-[0-9]{4}$/.test(form.phone) ? "電話格式錯誤 e.g. (09) 1234-5678" : ""}
                    label="手機"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    variant="outlined"
                    type="tel"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">phone_iphone</Icon></InputAdornment>,
                      inputComponent: PhoneMask,
                    }}
                    fullWidth
                  />

                  <CssTextField
                    select
                    className="mt-8 mb-16"
                    label="居住地縣市"
                    id="city"
                    name="city"
                    value={form.city}
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
                    {citiesSuggestion.map(suggest => (
                      <MenuItem className="rounded-full" value={suggest.value} key={suggest.value}>
                        {suggest.label}
                      </MenuItem>
                    ))}
                  </CssTextField>

                  <CssTextField
                    className="mt-8 mb-16"
                    label="詳細地址"
                    placeholder="居住地於高雄地區希望收到YS紙本DM之會員，歡迎填寫居住地址"
                    id="postAddress"
                    name="postAddress"
                    value={form.postAddress}
                    onChange={handleChange}
                    variant="outlined"
                    SelectProps={{
                      IconComponent: Icon
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                    }}
                    fullWidth
                  />
                </div>

                <Divider />

                <div className="py-32">
                  <div className="flex justify-center items-center w-full pb-12">
                    <h2>請持續協助我們進化社群</h2>
                  </div>

                  <CssTextField
                    select
                    className="mt-8 mb-16"
                    label="請問您主要從何處得知 YS"
                    id="heardFrom"
                    name="heardFrom"
                    value={form.heardFrom}
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
                    {channelsSuggestion.map(suggest => (
                      <MenuItem className="rounded-full" value={suggest.value} key={suggest.value}>
                        {suggest.label}
                      </MenuItem>
                    ))}
                  </CssTextField>

                  <FormControl component="fieldset" className="py-12">
                    <FormLabel component="legend">您是否曾經參加過 YS 的活動？</FormLabel>
                    <RadioGroup aria-label="haveParticipated" id="haveParticipated" name="haveParticipated" value={form.haveParticipated} onChange={handleChange} row>
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="是的，我曾經參加過"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="我不曾參加過"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <Divider />

                <div className="pt-32 w-full flex justify-center">
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button
                      className="whitespace-no-wrap px-12 rounded-full mx-8"
                      variant="contained"
                      color="primary"
                      onClick={() => { props.handledToggleMode(false) }}
                    >
                      不更新並返回
                    </Button>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button
                      className="whitespace-no-wrap px-12 rounded-full mx-8"
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateProfile}
                      disabled={isLoading || !userDetailChecker(form)}
                    >
                      {renderButtonText({ isLoading, inputFilled: userDetailChecker(form) })}
                    </Button>
                  </FuseAnimate>
                </div>
              </div>
            )
          }
        </CardContent>
      </Card>
    </MuiPickersUtilsProvider>
  )
}

export default WidgetEditProfileCard;
