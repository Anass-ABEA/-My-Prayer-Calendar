import {Prayers} from "./Prayers";

export default class CalendarSettings{
  month: number
  year: number
  durationMinutes : number;
  startMinutesBefore: number;
  prayersToSave: Array<Prayers> = [
    Prayers.FAJR, Prayers.DUHUR, Prayers.ASR, Prayers.MAGHRIB, Prayers.ISHA, Prayers.JUMUAA
  ]
  jumuaaConfig = {
    durationMinutes: 60
  }


  constructor() {
    this.month = new Date().getMonth()+ 1;
    this.year = new Date().getFullYear();
    this.durationMinutes = 15;
    this.startMinutesBefore = 5;
    this.jumuaaConfig = {durationMinutes: 90};
  }


}
