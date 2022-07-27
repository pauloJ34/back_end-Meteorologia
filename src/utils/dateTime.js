export function dateTime() {
  const date = new Date();

  //	3 horas => milisegundos -> segundos -> minutos -> horas
  date.setTime(date.getTime() + (-3 * 60 * 60 * 1000));

  const day = ("0" + date.getDate()).slice(-2)
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `\n${day}/${month}/${year},${hour}:${minute}:${second}`
}