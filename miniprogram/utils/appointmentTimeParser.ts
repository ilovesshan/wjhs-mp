import { formatTime } from "./util";

export const timeRangeValues = ['8:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];
export const timeRangeKeys = ['今天', '明天', '后天'];

export function parseTime(keyIndex: number, valueIndex: number): Array<string> {
  const beginTime = new Date();
  beginTime.setDate(beginTime.getDate() + keyIndex);

  const endTime = new Date();
  endTime.setDate(endTime.getDate() + keyIndex);

  let beginHour = 0;
  let endHour = 0;

  switch (valueIndex) {
    case 0:
      beginHour = 8;
      endHour = 10;
      break;
    case 1:
      beginHour = 10;
      endHour = 12;
      break;
    case 2:
      beginHour = 14;
      endHour = 16;
      break;
    default:
      beginHour = 16;
      endHour = 18;
  }

  beginTime.setHours(beginHour);
  beginTime.setMinutes(0);
  beginTime.setSeconds(0);

  endTime.setHours(endHour);
  endTime.setMinutes(0);
  endTime.setSeconds(0);
  const appointmentBeginTime = formatTime(beginTime);
  const appointmentEndTime = formatTime(endTime);
  const appointmentShowTime = timeRangeKeys[keyIndex] + '\xa0\xa0' + timeRangeValues[valueIndex];
  return [appointmentBeginTime, appointmentEndTime, appointmentShowTime];
}