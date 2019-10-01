export const consultingFormChecker = form =>
  !!form.consultingDate &&
  !!form.consultingTimeSlot &&
  !!form.consultingTopic &&
  !!form.consultingIntention &&
  !!form.consultingexpectation;

export const borrowFormChecker = form =>
  !!form.institutionName &&
  !!form.institutionAddress &&
  !!form.borrowingDate &&
  !!form.borrowingTimeSlot &&
  !!form.borrowingNumber &&
  !!form.borrowingSpace &&
  !!form.borrowingIntention &&
  !!form.borrowingHeardFrom;

export const guideFormChecker = form =>
  !!form.institutionName &&
  !!form.institutionAddress &&
  !!form.guideDate &&
  !!form.guideTimeSlot &&
  !!form.guideNumber &&
  !!form.guideIntention &&
  !!form.guideHeardFrom;
