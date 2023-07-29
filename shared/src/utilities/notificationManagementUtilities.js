module.exports.getStartDayAndEndDay = function getStartDayAndEndDay({
  dueNumber,
  isLater = true,
}) {
  const today = new Date();

  let aPointInTime;
  if (isLater) {
    aPointInTime = new Date(today.getTime() + dueNumber * 24 * 60 * 60 * 1000); // add 10 days to current date
     
  } else {
    aPointInTime = new Date(today.getTime() - dueNumber * 24 * 60 * 60 * 1000);
     
  }
  aPointInTime.setHours(0, 0, 0, 0);

  // Set time to start of day (00:00:00)
  const startOfDay = new Date(
    aPointInTime.getFullYear(),
    aPointInTime.getMonth(),
    aPointInTime.getDate(),
    0,
    0,
    0
  ).toISOString();
  // Set time to end of day (23:59:59)
  const endOfDay = new Date(
    aPointInTime.getFullYear(),
    aPointInTime.getMonth(),
    aPointInTime.getDate(),
    23,
    59,
    59
  ).toISOString();

  const LowerLimitTillToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  ).toISOString();

  return {
    startOfDay: startOfDay,
    endOfDay: endOfDay,
    aPointInTime: aPointInTime,
    LowerLimitTillToday: LowerLimitTillToday
  };
};
