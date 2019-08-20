import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import moment from 'moment';
import {
  createMuiTheme,
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
  Button,
  Radio
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useForm } from '@fuse/hooks';
import zhLocale from "date-fns/locale/zh-TW";

import * as Actions from 'app/auth/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

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
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: '2.4rem',
      },
    },
  },
})(TextField);

function WidgetEditProfileCard(props) {
  const dispatch = useDispatch();
  const USER_PROFILE = useSelector(({ auth }) => auth.user);
  const UserData = USER_PROFILE.data;

  const [isLoading, setIsLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

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
        city
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
      })
    }
  }, [UserData, form, setForm]);

  function handleDateChange(date) {
    setForm(form => _.setIn({ ...form }, 'bob', moment(date).format('YYYY/MM/DD')))
  }
  function handleUpdateProfile() {
    setIsLoading(true);

    dispatch(Actions.updateUserProfile(form, props.handledToggleMode))
  }

  // console.log('form ', form)

  return (
    <MuiPickersUtilsProvider theme={materialDatePickerTheme} utils={DateFnsUtils} locale={zhLocale}>
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
                        value="female"
                        control={<Radio color="primary" />}
                        label="女性"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="diversity"
                        control={<Radio color="primary" />}
                        label="多元性別"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>

                  <KeyboardDatePicker
                    autoOk
                    invalidDateMessage="日期格式錯誤"
                    fullWidth
                    inputVariant="outlined"
                    format="yyyy/MM/dd"
                    label="生日"
                    name="bob"
                    value={form.bob}
                    inputValue={form.bob}
                    onChange={date => handleDateChange(date)}
                    KeyboardButtonProps={{
                      'aria-label': '生日',
                    }}
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
                        label="研究所"
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

                  <CssTextField
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
                  />

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

                <div className="pt-32">
                  <div className="flex justify-center items-center w-full pb-12">
                    <h2>聯絡方式</h2>
                  </div>

                  <CssTextField
                    className="mt-8 mb-16"
                    label="手機"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">phone_iphone</Icon></InputAdornment>
                    }}
                    fullWidth
                  />

                  <CssTextField
                    className="mt-8 mb-16"
                    label="居住地"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                    }}
                    fullWidth
                  />

                  <Divider />

                  <div className="pt-32 w-full flex justify-center">
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                      <Button
                        className="whitespace-no-wrap px-12 rounded-full"
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateProfile}
                        disabled={isLoading}
                      >
                        {isLoading ? <span className="flex justify-center">更新資料中 <LoadingSpinner width="2em" height="2em" /></span> : '更新資料'}
                      </Button>
                    </FuseAnimate>
                  </div>
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
