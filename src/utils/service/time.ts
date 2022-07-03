
export class Time {

  toTalk(dateTime: number) {
    const d: Date = new Date(dateTime)
    const year = d.getFullYear().toString().slice(2, 4);
    const month = d.getMonth()+1 >= 10 ? d.getMonth()+1 : "0" + (d.getMonth()+1).toString();
    const date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate().toString();
    const hours = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours().toString();
    const miuntes = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes().toString();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const result = `${year}.${month}.${date} ${ampm} ${hours}:${miuntes}`;
    
    return result
  }

   KorDate()  {
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff);
    return koreaNow
  }

  getToBeDeletedDate () {
    var date = this.KorDate();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
  
    return parseInt(year + month + day);
  }
}