const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const shuffle = arr =>{
  //洗牌数组
  var i = arr.length, t, j;
  while (i) {
    j = Math.floor(Math.random() * i--);
    t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

module.exports = {
  formatTime: formatTime,
  shuffle: shuffle
}
