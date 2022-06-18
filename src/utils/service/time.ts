
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
}