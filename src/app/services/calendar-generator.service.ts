import {Injectable} from '@angular/core';
import * as moment from "moment-timezone"
import {AthanDataItem, AthanDate} from "../models/AthanDataItem";
import CalendarSettings from "../models/CalendarSettings";
import {Prayers} from "../models/Prayers";

@Injectable({
  providedIn: 'root'
})
export class CalendarGeneratorService {

  constructor() { }

  generateICS(meetingDetails: Array<AthanDataItem>, calendarSettings : CalendarSettings) : string {
    const timeZone = meetingDetails[0].meta.timezone

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//WhiteBatIslam//EN`;

    meetingDetails.forEach((athanData: AthanDataItem) => {

      const now = moment.tz(new Date(), timeZone)
      calendarSettings.prayersToSave.forEach(prayer =>{

        const prayerTimeStr = AthanDataItem.getPrayerTimeStr(athanData,prayer)
        const prayerDate = moment(prayerTimeStr, "DD-MM-YYYYTHH:mm").toDate()
        const reminderStart = moment(prayerTimeStr, "DD-MM-YYYYTHH:mm").toDate()
        const reminderEnd = new Date()
        reminderStart.setMinutes(prayerDate.getMinutes() - calendarSettings.startMinutesBefore)
        const momStart = moment.tz(reminderStart, timeZone)

        if(AthanDate.isFriday(athanData.date) && prayer === Prayers.DUHUR)
          reminderEnd.setTime(reminderStart.getTime() + calendarSettings.jumuaaConfig.durationMinutes * 60000);
        else
          reminderEnd.setTime(reminderStart.getTime() + calendarSettings.durationMinutes * 60000);

        const momEnd = moment.tz(reminderEnd, timeZone)
        if(Object.hasOwn(athanData.timings, prayer))
        icsContent += `
BEGIN:VEVENT
UID:${prayerDate.getFullYear()}-${prayerDate.getMonth()+1}-${prayerDate.getDate()}-${prayer}@whitebat.islam
SUMMARY:Athan for ${prayer} in ${calendarSettings.startMinutesBefore} Minutes
DTSTAMP:${now.format("YYYYMMDDTHHmmss")}
DTSTART:${momStart.format("YYYYMMDDTHHmmss")}
DTEND:${momEnd.format("YYYYMMDDTHHmmss")}
TZOFFSETFROM:${momStart.format("ZZ")}
TZOFFSETTO:${momStart.format("ZZ")}
TZNAME:${timeZone}
END:VEVENT`;

      })
    });

    icsContent += `
END:VCALENDAR`;

    return icsContent;
  }
  private static generateUID() {
    return Math.random().toString(36).substr(2, 9);
  }


  async generate(athanTime : Array<AthanDataItem>){
    const icsContent = this.generateICS(athanTime, new CalendarSettings());
    console.log(icsContent);


  }
}
