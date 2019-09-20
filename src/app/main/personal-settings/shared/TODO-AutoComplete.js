import React from 'react';
import Select from 'react-select';

import { makeStyles, withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';

import { citiesSuggestion } from '../suggestions/cities.suggestions';

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
const useStyles = makeStyles(theme => ({
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  }
}));

const NoOptionsMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    沒有合適的選項
  </Typography>
);

const inputComponent = ({ inputRef, ...props }) => (
  <div ref={inputRef} {...props} />
);

// const Control = props => (
//   <CssTextField
//     fullWidth
//     variant="outlined"
//     label="居住地縣市"
//     InputLabelProps={{ shrink: true }}
//     value={props.value}
//     InputProps={{
//       inputComponent,
//       endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>,
//       inputProps: {
//         className: props.selectProps.classes.input,
//         inputRef: props.innerRef,
//         children: props.children,
//         ...props.innerProps
//       }
//     }}
//   />
// );
const Control = props => {
  console.log('props.selectProps.value ', props.selectProps.value)
  return (
    <CssTextField
      fullWidth
      variant="outlined"
      label="居住地縣市"
      InputLabelProps={{ shrink: true }}
      value={props.selectProps.value}
      InputProps={{
        inputComponent,
        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
    />
  )
};

const Option = props => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);

const Placeholder = props => (
  <Typography
    color="textSecondary"
    {...props.innerProps}
  >
    {/* 找點什麼 */}
    您住在哪個縣市？
  </Typography>
);
// const Placeholder = props => null;

const SingleValue = props => (
  <Typography
    className={props.selectProps.classes.singleValue}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const ValueContainer = props => (
  <div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>
);

const Menu = props => (
  <Paper
    square
    className={props.selectProps.classes.paper}
    {...props.innerProps}
  >
    {props.children}
  </Paper>
);

const IndicatorSeparator = () => null;
const DropdownIndicator = () => null;

export default function Autocomplete(props) {
  const { value, setForm } = props;
  const classes = useStyles();

  return (
    <div className="py-12">
      <Select
        value={value}
        onChange={city => setForm(form => _.setIn({ ...form }, 'city', city.value))}
        id="city"
        name="city"
        {...{ ...props, classes }}
      />
    </div>
  );
}

Autocomplete.defaultProps = {
  components: {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    IndicatorSeparator,
    DropdownIndicator
  },
  // options: [
  //   { label: 'Boston Bruins', value: 'BOS' },
  //   { label: 'Buffalo Sabres', value: 'BUF' },
  //   { label: 'Detroit Red Wings', value: 'DET' },
  //   { label: 'Florida Panthers', value: 'FLA' },
  //   { label: 'Montreal Canadiens', value: 'MTL' },
  //   { label: 'Ottawa Senators', value: 'OTT' },
  //   { label: 'Tampa Bay Lightning', value: 'TBL' },
  //   { label: 'Toronto Maple Leafs', value: 'TOR' },
  //   { label: 'Carolina Hurricanes', value: 'CAR' },
  //   { label: 'Columbus Blue Jackets', value: 'CBJ' },
  //   { label: 'New Jersey Devils', value: 'NJD' },
  //   { label: 'New York Islanders', value: 'NYI' },
  //   { label: 'New York Rangers', value: 'NYR' },
  //   { label: 'Philadelphia Flyers', value: 'PHI' },
  //   { label: 'Pittsburgh Penguins', value: 'PIT' },
  //   { label: 'Washington Capitals', value: 'WSH' },
  //   { label: 'Chicago Blackhawks', value: 'CHI' },
  //   { label: 'Colorado Avalanche', value: 'COL' },
  //   { label: 'Dallas Stars', value: 'DAL' },
  //   { label: 'Minnesota Wild', value: 'MIN' },
  //   { label: 'Nashville Predators', value: 'NSH' },
  //   { label: 'St. Louis Blues', value: 'STL' },
  //   { label: 'Winnipeg Jets', value: 'WPG' },
  //   { label: 'Anaheim Ducks', value: 'ANA' },
  //   { label: 'Arizona Coyotes', value: 'ARI' },
  //   { label: 'Calgary Flames', value: 'CGY' },
  //   { label: 'Edmonton Oilers', value: 'EDM' },
  //   { label: 'Los Angeles Kings', value: 'LAK' },
  //   { label: 'San Jose Sharks', value: 'SJS' },
  //   { label: 'Vancouver Canucks', value: 'VAN' },
  //   { label: 'Vegas Golden Knights', value: 'VGK' }
  // ]
  options: citiesSuggestion
};
