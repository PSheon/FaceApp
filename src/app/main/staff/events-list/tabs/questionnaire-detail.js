import React, { useEffect } from 'react';
import _ from '@lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { FuseAnimate } from '@fuse';

function QuestionnaireDetailEdit(props) {
  const { form, setForm, isNew } = props;
  const [checked, setChecked] = React.useState(null);

  useEffect(() => {
    if (!checked && form) {
      setChecked(form.preQuestionList)
    }
  }, [checked, form])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setForm(form => _.setIn({ ...form }, 'preQuestionList', newChecked))
  };

  return (
    checked && (
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <List subheader={<ListSubheader>活動報名前問卷 (本表單無法於活動建立後更改)</ListSubheader>}>
          {/* participateReason */}
          <ListItem>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-question-participateReason" primary="想參加本次活動的原因？" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled={!isNew}
                onChange={handleToggle('participateReason')}
                checked={checked.indexOf('participateReason') !== -1}
                inputProps={{ 'aria-labelledby': 'switch-list-label-question-participateReason' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {/* participantHeardFrom */}
          <ListItem>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-question-participantHeardFrom" primary="如何得知本次活動訊息？" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled={!isNew}
                onChange={handleToggle('participantHeardFrom')}
                checked={checked.indexOf('participantHeardFrom') !== -1}
                inputProps={{ 'aria-labelledby': 'switch-list-label-question-participantHeardFrom' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {/* participantExpectation */}
          <ListItem>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-question-participantExpectation" primary="學員期待？" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled={!isNew}
                onChange={handleToggle('participantExpectation')}
                checked={checked.indexOf('participantExpectation') !== -1}
                inputProps={{ 'aria-labelledby': 'switch-list-label-question-participantExpectation' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {/* participantID */}
          <ListItem>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-question-participantID" primary="身分證字號" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled={!isNew}
                onChange={handleToggle('participantID')}
                checked={checked.indexOf('participantID') !== -1}
                inputProps={{ 'aria-labelledby': 'switch-list-label-question-participantID' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {/* participantIsManager */}
          <ListItem>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-question-participantIsManager" primary="是否有管理職" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled={!isNew}
                onChange={handleToggle('participantIsManager')}
                checked={checked.indexOf('participantIsManager') !== -1}
                inputProps={{ 'aria-labelledby': 'switch-list-label-question-participantIsManager' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {/* participateLunch */}
          <ListItem>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-question-participateLunch" primary="參加中午餐敘與否？" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled={!isNew}
                onChange={handleToggle('participateLunch')}
                checked={checked.indexOf('participateLunch') !== -1}
                inputProps={{ 'aria-labelledby': 'switch-list-label-question-participateLunch' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {/* lunchType */}
          <ListItem>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-question-lunchType" primary="葷素？" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                disabled={!isNew}
                onChange={handleToggle('lunchType')}
                checked={checked.indexOf('lunchType') !== -1}
                inputProps={{ 'aria-labelledby': 'switch-list-label-question-lunchType' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </FuseAnimate>
    )
  )
}

export default QuestionnaireDetailEdit;
