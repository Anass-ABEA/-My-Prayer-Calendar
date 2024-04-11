export default class StringHelper{

  static numberFormatter(num: number, length: number){
    return num.toString().padStart(length, '0');
  }
}
