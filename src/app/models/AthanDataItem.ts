export class AthanApiResult{
  code: number
  data: Array<AthanDataItem>;
  status : string


  constructor(code: number, data: Array<AthanDataItem>, status: string) {
    this.code = code;
    this.data = data;
    this.status = status;
  }
}

export class AthanDataItem{
  timings : AthanTimings
  date: AthanDate
  meta: AthanMeta


  constructor(timings: AthanTimings, date: AthanDate, meta: AthanMeta) {
    this.timings = timings;
    this.date = date;
    this.meta = meta;
  }


  static getPrayerTimeStr(athanItem: AthanDataItem, prayer : string): string{
    // @ts-ignore
    return athanItem.date.gregorian.date+"T"+(athanItem.timings[prayer] || "").split(" ")[0]
  }



  static getSimpleTimeStr(athanItem: AthanDataItem, prayer : string): string{
    // @ts-ignore
    return athanItem.timings[prayer]
  }

}

export class AthanMeta{
  latitude : number;
  longitude : number;
  timezone: string;
  method : {
    id : number,
    name : String,
    location : {
      latitude: number,
      longitude : number,
    },
    latitudeAdjustmentMethod: string,
    midnightMode: string
    school: string
    offset: {
      Imsak: number,
      Fajr: number,
      Sunrise: number,
      Dhuhr: number,
      Asr: number,
      Maghrib: number,
      Sunset: number,
      Isha: number,
      Midnight: number
    }
  }


  constructor(latitude: number, longitude: number, timezone: string, method: { id: number; name: String; location: { latitude: number; longitude: number }; latitudeAdjustmentMethod: string; midnightMode: string; school: string; offset: { Imsak: number; Fajr: number; Sunrise: number; Dhuhr: number; Asr: number; Maghrib: number; Sunset: number; Isha: number; Midnight: number } }) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.timezone = timezone;
    this.method = method;
  }
}

export class AthanDate{
  readable : string
  timestamp : string
  gregorian : AthanDateDetails
  hijri: AthanDateDetails


  constructor(readable: string, timestamp: string, georgian: AthanDateDetails, hijri: AthanDateDetails) {
    this.readable = readable;
    this.timestamp = timestamp;
    this.gregorian = georgian;
    this.hijri = hijri;
  }

  static isFriday(date: AthanDate){
    return date.gregorian.weekday.en === "Friday"
  }
}

class AthanDateDetails{
  date: string
  format: string
  day: string
  weekday: {
    en : string,
    ar?: string
  }
  month: {
    number: number,
    en: string
    ar?: string
  }
  year : string


  constructor(date: string, format: string, day: string, weekday: { en: string, ar?: string }, month: { number: number, en: string, ar?: string }, year: string) {
    this.date = date;
    this.format = format;
    this.day = day;
    this.weekday = weekday;
    this.month = month;
    this.year = year;
  }
}

export class AthanTimings {
  Imsak: string
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Sunset: string
  Isha: string
  Midnight: string


  constructor(Imsak: string, Fajr: string, Sunrise: string, Dhuhr: string, Asr: string, Maghrib: string, Sunset: string, Isha: string, Midnight: string) {
    this.Imsak = Imsak;
    this.Fajr = Fajr;
    this.Sunrise = Sunrise;
    this.Dhuhr = Dhuhr;
    this.Asr = Asr;
    this.Maghrib = Maghrib;
    this.Sunset = Sunset;
    this.Isha = Isha;
    this.Midnight = Midnight;
  }

}
