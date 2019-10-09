import React from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' }
].map(suggestion => ({
  key: suggestion.label,
  value: suggestion.label,
  label: suggestion.label
}));

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
    flexGrow: 1,
    height: 250,
    minWidth: 290
  },
  input: {
    display: 'flex',
    padding: '10px 0 10px 14px',
    height: 'auto'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
    // padding: 14
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    // padding: 14,
    fontSize: 16
  },
  placeholder: {
    // position: 'absolute',
    // left: 2,
    // bottom: 6,
    // padding: 14,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 5,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
    >
      {props.children}
    </Typography>
  );
}

// NoOptionsMessage.propTypes = {
//   /**
//    * The children to be rendered.
//    */
//   children: PropTypes.node,
//   /**
//    * Props to be passed on to the wrapper.
//    */
//   innerProps: PropTypes.object.isRequired,
//   selectProps: PropTypes.object.isRequired
// };

function inputComponent({ inputRef, ...props }) {
  // return <div ref={inputRef} {...props} />;
  return <div {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ])
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <CssTextField
      fullWidth
      variant="outlined"
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        },
        endAdornment: (
          <InputAdornment position="end">
            <Icon className="text-20" color="action">
              school
            </Icon>
          </InputAdornment>
        )
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ]).isRequired,
  selectProps: PropTypes.object.isRequired
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
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
}

// Option.propTypes = {
//   /**
//    * The children to be rendered.
//    */
//   children: PropTypes.node,
//   /**
//    * props passed to the wrapping element for the group.
//    */
//   innerProps: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     key: PropTypes.string.isRequired,
//     onClick: PropTypes.func.isRequired,
//     onMouseMove: PropTypes.func.isRequired,
//     onMouseOver: PropTypes.func.isRequired,
//     tabIndex: PropTypes.number.isRequired
//   }).isRequired,
//   /**
//    * Inner ref to DOM Node
//    */
//   innerRef: PropTypes.oneOfType([
//     PropTypes.oneOf([null]),
//     PropTypes.func,
//     PropTypes.shape({
//       current: PropTypes.any.isRequired
//     })
//   ]).isRequired,
//   /**
//    * Whether the option is focused.
//    */
//   isFocused: PropTypes.bool.isRequired,
//   /**
//    * Whether the option is selected.
//    */
//   isSelected: PropTypes.bool.isRequired
// };

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

// SingleValue.propTypes = {
//   /**
//    * The children to be rendered.
//    */
//   children: PropTypes.node,
//   /**
//    * Props passed to the wrapping element for the group.
//    */
//   innerProps: PropTypes.any.isRequired,
//   selectProps: PropTypes.object.isRequired
// };

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
};

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

export default function SchoolNameSelector(props) {
  const { schoolName, handleSchoolChange } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [schoolNameState, setSchoolNameState] = React.useState({
    value: schoolName || '',
    label: schoolName || '',
    key: schoolName || ''
  });

  function handleChange(schoolNaameObject) {
    setSchoolNameState(schoolNaameObject);
    handleSchoolChange(schoolNaameObject.value);
  }
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };

  return (
    <Select
      className="mt-8 mb-16"
      classes={classes}
      styles={selectStyles}
      inputId="schoolName"
      TextFieldProps={{
        label: '學校名稱',
        InputLabelProps: {
          htmlFor: 'schoolName',
          shrink: true
        }
      }}
      placeholder="依學校名稱搜尋，例如：國立臺中教育大學"
      options={suggestions}
      components={components}
      value={schoolNameState}
      onChange={handleChange}
    />
  );
}
