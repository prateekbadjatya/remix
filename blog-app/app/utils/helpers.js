
export function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
  const timezoneSign = timezoneOffset >= 0 ? '-' : '+';

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${String(timezoneOffsetHours).padStart(2, '0')}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;
  
  return formattedDate;
}

export function fakeDelay(time) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, time); // 3 seconds delay
  });
}

export function countWords(str){
  const wordsArray = str.split(/\s+/);
  const filteredArray = wordsArray.filter(word => word.trim() !== '' );
  return filteredArray.length
}