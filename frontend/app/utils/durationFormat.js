export default function formatTime(decimalTime) {
  let seconds = Math.floor(decimalTime);
  if (seconds === 60) return "1:00";
  return "0:" + (seconds < 10 ? "0" : "") + seconds.toString();
}

//7 -> 0:07
//10 -> 0:10
//51 -> 0:51
