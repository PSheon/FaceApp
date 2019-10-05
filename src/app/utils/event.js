import moment from 'moment';

export const eventReviewStarsExtractot = (eventActivityLogs = []) => {
  let validCount = 0;
  let eventStarsCount = 0;
  let speakerStarsCount = 0;

  eventActivityLogs.forEach(log => {
    if (log.eventStars && log.speakerStars) {
      validCount++;
      eventStarsCount += log.eventStars;
      speakerStarsCount += log.speakerStars;
    }
  });

  if (validCount === 0) validCount = 1;

  return {
    eventStarsAvg: (eventStarsCount / validCount).toFixed(1),
    speakerStarsAvg: (speakerStarsCount / validCount).toFixed(1)
  };
};

export const eventDateStatus = (enrollDeadline, startDate, endDate) => {
  const now = moment();
  const enrollEnd = moment(enrollDeadline);
  const start = moment(startDate);
  const end = moment(endDate);

  if (now.isBefore(enrollDeadline)) {
    /* 報名倒數天數 */
    return {
      statusCode: 0,
      humanize: `距離報名截止還有 ${enrollEnd.diff(now, 'days')} 天`,
      label: '活動報名中'
    };
  } else if (now.isBetween(enrollEnd, start)) {
    /* 活動開始倒數天數 */
    return {
      statusCode: 1,
      humanize: `距離活動開始還有 ${start.diff(now, 'days')} 天`,
      label: '活動準備中'
    };
  } else if (now.isBetween(start, end)) {
    /* 活動進行中 */
    return {
      statusCode: 2,
      humanize: `活動進行中`,
      label: '活動進行中'
    };
  } else {
    return {
      statusCode: 3,
      humanize: '活動已經結束',
      label: '活動已經結束'
    };
  }
};

export const permitToSelfCancel = eventDetail => {
  const now = moment();
  const start = moment(eventDetail.startDate);

  return start.diff(now, 'days', true) >= 3;
};

export const eventLogToCsvConverter = originalJson =>
  originalJson.map(userEventLog => {
    return {
      隊列編號:
        userEventLog['queueOrder'] > 0
          ? userEventLog['queueOrder']
          : '等待同意中',
      申請人全名: userEventLog.applicant['fullName'],
      申請人電話: userEventLog.applicant['phone'],
      申請人信箱: userEventLog.applicant['email'],
      想參加本次活動的原因: userEventLog['participateReason'] || '未填寫',
      如何得知本次活動訊息: userEventLog['participantHeardFrom'] || '未填寫',
      學員期待: userEventLog['participantExpectation'] || '未填寫',
      身分證字號: userEventLog['participantID'] || '未填寫',
      是否有管理職: userEventLog['participantIsManager'] || '未填寫',
      參加中午餐敘與否: userEventLog['participateLunch'] || '未填寫',
      葷素: userEventLog['lunchType'] || '未填寫',
      簽到狀況: userEventLog['checkinStatus'] ? '已簽到' : '未簽到',

      給予活動評價: userEventLog['eventStars'] || '尚未給予評價',
      給予講師整體評價: userEventLog['speakerStars'] || '尚未給予評價',
      給予講師表達方式評價:
        userEventLog['speakerExpressionStars'] || '尚未給予評價',
      給予講師內容評價: userEventLog['speakerContentStars'] || '尚未給予評價',
      給予活動評論: userEventLog['eventComments'] || '尚未給予評論'
    };
  });
