function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// order 对象和方法 
function order(id, name, remark, date){
  this.id = id;
  this.name = name;
  this.remark = remark;
  this.date = date;
  this.newName = rename;
  this.newRemark = reremark;
};
function rename(name){
  this.name = name
};
function reremark(remark){
  this.remark = remark
};

module.exports = {
  formatTime: formatTime,
  order: order
}
