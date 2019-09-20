export const borrowFormChecker = form => (
  !!form.institutionName &&
  !!form.institutionAddress &&
  !!form.borrowingDate &&
  !!form.borrowingTimeSlot &&
  !!form.borrowingNumber &&
  !!form.borrowingSpace &&
  !!form.borrowingIntention &&
  !!form.borrowingHeardFrom
)