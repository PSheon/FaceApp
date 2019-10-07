import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/styles';
import { FuseAnimateGroup } from '@fuse';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import { userDetailChecker, preQuestionFormChecker } from 'app/utils';
import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import PreQuestionFormSection from './PreQuestionFormSection';
import ReviewsSection from './ReviewsSection';

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c'
  }
})(LinearProgress);
/* 
  eventDetail: requireed
  eventQueueingInfos: requireed

  Check Flow Dialog
  Step 1. Is data loading ?
  Step 2. Is User Login or not ?
  Step 3. Is User finished personal infos ?
  Step 4. Is user has applied ?
  Step 5. Is user has finished pre-question ?
  Step 6. Has user finished check-in ?
 */
function ButtomSection(props) {
  const { selectedEventId, eventDetail } = props;
  const dispatch = useDispatch();
  const EVENTS_ACTIVITY_LOGS = useSelector(
    ({ activity }) => activity.eventLogs
  );
  // const eventActivityLogs = EVENTS_ACTIVITY_LOGS.docs[selectedEventId] || [];
  const eventActivityLogs = EVENTS_ACTIVITY_LOGS.docs[selectedEventId];
  const eventQueueingInfos =
    EVENTS_ACTIVITY_LOGS.queueingInfos[selectedEventId];
  const isSyncingActivityLogs = EVENTS_ACTIVITY_LOGS.loading;
  const USER = useSelector(({ auth }) => auth.user);
  const isUserDetailFinished = userDetailChecker(USER.data);
  const { form, handleChange } = useForm({
    participateReason: '',
    participantHeardFrom: '',
    participantExpectation: '',
    participantID: '',
    participantIsManager: '',
    participateLunch: '',
    lunchType: ''
  });

  const [termState, setTermState] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(null);
  const [selfEventActivityLog, setSelfEventActivityLog] = useState(null);

  useEffect(() => {
    if (!eventActivityLogs) {
      if (!isSyncingActivityLogs) {
        dispatch(Actions.syncEventActivityLogs(selectedEventId));
      }
    } else if (isApplied === null) {
      if (eventActivityLogs.some(item => item.applicant._id === USER.uuid)) {
        const eventActivityLog = eventActivityLogs.find(
          activityLog => activityLog.applicant._id === USER.uuid
        );
        setSelfEventActivityLog(eventActivityLog);
        setIsApplied(true);
      } else {
        setIsApplied(false);
      }
    }
  }, [
    USER.uuid,
    dispatch,
    eventActivityLogs,
    isApplied,
    isSyncingActivityLogs,
    selectedEventId
  ]);
  useEffect(() => {
    if (isApplied !== null) {
      if (eventActivityLogs.some(item => item.applicant._id === USER.uuid)) {
        const eventActivityLog = eventActivityLogs.find(
          activityLog => activityLog.applicant._id === USER.uuid
        );
        setSelfEventActivityLog(eventActivityLog);
        setIsApplied(true);
      } else {
        setIsApplied(false);
      }
    }
  }, [isApplied, eventActivityLogs, USER.uuid]);

  function formBuilder() {
    const preQuestionList = eventDetail.preQuestionList;
    let tempProperty = {};
    preQuestionList.forEach(item => (tempProperty[item] = form[item]));

    return {
      eventId: eventDetail._id,
      speakerId: eventDetail.speaker._id,
      ...tempProperty
    };
  }
  function handleSubmitApply() {
    if (eventDetail) {
      setIsSubmitLoading(true);
      dispatch(Actions.applyEvent(formBuilder()));
    }
  }

  function renderApplyButton() {
    /* 已額滿 */
    if (
      eventQueueingInfos['succeededCount'] >= eventDetail.maximumOfApplicants
    ) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-128 mx-auto mt-16 rounded-full"
          aria-label="Register"
          disabled={true}
          value="legacy"
          type="submit"
        >
          活動已額滿
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          className="w-1/2 sm:w-128 mx-auto mt-16 rounded-full"
          aria-label="Register"
          disabled={
            !termState ||
            !preQuestionFormChecker(form, eventDetail.preQuestionList)
          }
          value="legacy"
          onClick={handleSubmitApply}
          type="submit"
        >
          {isSubmitLoading ? (
            <span className="flex justify-center">
              報名中 <LoadingSpinner width="2em" height="2em" />
            </span>
          ) : (
            '報名活動'
          )}
        </Button>
      );
    }
  }

  // console.log('selfEventActivityLog ', selfEventActivityLog)

  /* 載入中 */
  if (isSyncingActivityLogs || !eventQueueingInfos) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <LoadingSpinner width={128} height={128} />
      </div>
    );
  }

  /* 未登入 */
  if (USER.role !== 'user' && USER.role !== 'staff') {
    return (
      <FuseAnimateGroup
        enter={{
          animation: 'transition.expandIn',
          duration: 300
        }}
        className="w-full flex flex-col my-8"
      >
        {/* Applicants Count */}
        {eventQueueingInfos['succeededCount'] >=
        eventDetail.maximumOfApplicants ? (
          <div className="flex justify-between items-center">
            {/* 額滿 */}
            <div>
              <Typography variant="caption">
                已有 {eventQueueingInfos['succeededCount']} 人報名
              </Typography>
            </div>
            <div>
              <Typography variant="caption">已額滿</Typography>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            {/* 還有名額 */}
            <div>
              <Typography variant="caption">
                已有 {eventQueueingInfos['succeededCount']} 人報名
              </Typography>
            </div>
            <div>
              <Typography variant="caption">
                還有
                {eventDetail.maximumOfApplicants -
                  eventQueueingInfos['succeededCount']}
                個名額
              </Typography>
            </div>
          </div>
        )}

        <BorderLinearProgress
          variant="determinate"
          color="secondary"
          className="rounded-12 h-20 my-8"
          value={
            Math.round(
              (eventQueueingInfos['succeededCount'] /
                eventDetail.maximumOfApplicants) *
                100
            ) || 0
          }
        />

        {/* Apply Button, Check has login first */}
        <Link
          role="button"
          to="/login"
          className="w-1/2 sm:w-200 mx-auto mt-16"
        >
          <Button
            variant="contained"
            color="primary"
            className="w-full rounded-full"
            aria-label="Login"
            value="legacy"
          >
            登入後報名活動
          </Button>
        </Link>
      </FuseAnimateGroup>
    );
  }

  /* 未填寫資訊 */
  if (!isUserDetailFinished) {
    return (
      <Link
        role="button"
        to="/personal-settings/edit"
        className="w-1/2 sm:w-288 mx-auto mt-16"
      >
        <div className="flex flex-col justify-center items-center">
          <Typography variant="subtitle1" color="primary">
            您的資料不完整，請先完成部分資訊！
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="w-full rounded-full"
            aria-label="Login"
            value="legacy"
          >
            填寫報名資訊
          </Button>
        </div>
      </Link>
    );
  }

  /* 未報名 */
  if (!isApplied) {
    return (
      <div className="w-full flex flex-col my-8">
        {/* Applicants Count */}
        {eventQueueingInfos['succeededCount'] >=
        eventDetail.maximumOfApplicants ? (
          <div className="flex justify-between items-center">
            {/* 額滿 */}
            <div>
              <Typography variant="caption">
                已有 {eventQueueingInfos['succeededCount']} 人報名
              </Typography>
            </div>
            <div>
              <Typography variant="caption">已額滿</Typography>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            {/* 還有名額 */}
            <div>
              <Typography variant="caption">
                已有 {eventQueueingInfos['succeededCount']} 人報名
              </Typography>
            </div>
            <div>
              <Typography variant="caption">
                還有
                {eventDetail.maximumOfApplicants -
                  eventQueueingInfos['succeededCount']}
                個名額
              </Typography>
            </div>
          </div>
        )}
        <BorderLinearProgress
          variant="determinate"
          color="secondary"
          className="rounded-12 h-20 my-8"
          value={
            Math.round(
              (eventQueueingInfos['succeededCount'] /
                eventDetail.maximumOfApplicants) *
                100
            ) || 0
          }
        />

        {/* 填寫活動前問卷 */}
        <PreQuestionFormSection
          preQuestionList={eventDetail.preQuestionList}
          form={form}
          handleChange={handleChange}
        />

        {/* Term */}
        {!isApplied && (
          <div className="w-full flex flex-col justify-center my-4">
            <p>1.本課程以15-29歲青年為優先報名對象。</p>
            <p>
              2.填寫報名資料不代表報名成功，報名成功者將於活動前3-5天以簡訊通知，活動當天憑報名成功簡訊入場。
            </p>
            <p>
              3.已報名成功者，若欲取消活動，請務必提前兩天來電取消 07-2313232。
            </p>
            <p>
              4.報名資料為本中心及講師為了解學員背景規劃活動內容所需，請詳細填寫。
            </p>
            <p>
              5.免費講座資源珍貴，報名後勿無故缺席，以免資源浪費，影響他人參加權益！
            </p>
            <p>6.參與講座請務必準時，活動開始後20分鐘不予入場。</p>
            <p>7.為維護活動品質，講座不開放現場報名、候補及旁聽。</p>
            <p>
              8.若需YS提供「服務學習時數認證」請於活動前告知工作同仁，並依照當天上課學習狀況，評核是否提供蓋章認證。
            </p>
            <p>9.YS保留修改活動與細節權利，以YS公告為主。</p>
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
          </div>
        )}

        {/* Apply Button, Check has login first */}
        {renderApplyButton()}
      </div>
    );
  }

  /* 未填寫活動前問卷 */
  /* if (false) {
    return (
      <div>未填寫活動前問卷</div>
    )
  } */

  /* 未簽到 */
  if (!selfEventActivityLog['checkinStatus']) {
    return (
      <div className="flex w-full flex-col justify-center items-center">
        <Typography variant="subtitle1" color="secondary">
          請於活動地點簽到處簽到！
        </Typography>
      </div>
    );
  }

  return (
    <ReviewsSection
      eventDetail={eventDetail}
      selfEventActivityLog={selfEventActivityLog}
    />
  );
}

export default ButtomSection;
