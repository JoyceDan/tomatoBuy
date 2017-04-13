var util = require('../../utils/util.js');
function order(id, name, remark, date){
  this.id = id;
  this.name = name;
  this.remark = remark;
  this.date = date;
}
Page({
  data: {
    list: '',
  },
  onLoad: function() {
    //从缓存中读取数据
    var that = this
    wx.getStorage({
      key: 'list',
      success: function(res) {
        that.setData({
          list: res.data
        })
      }
    })
  },
  //Debug Tool 查看storage
  showStorage: function() {
    wx.getStorage({
      key: 'list',
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  writeStorage: function(){
    try {
      wx.setStorageSync('list', this.data.list)
    } catch (e) {

    }
  },
  addOrder: function(){
    var dic = {}
    var key = Date.now()
    var newOrder = new order(Date.now(), this.data.name, this.data.remark, util.formatTime(new Date));
    dic[key] = newOrder
    var newOrder_list = [{
      id: Date.now(),
      name: this.data.name,
      remark: this.data.remark,
      date: util.formatTime(new Date)
    }];
    this.data.list = this.data.list.concat(newOrder_list);
    //同步缓存
    this.writeStorage()
    this.showStorage()
    this.setData({
      list: this.data.list
    });
    wx.switchTab({
      url: '../list/list'
    });
  },
  bindRemark: function(remark) {
    this.setData({
      remark: remark.detail.value
    });
  },
  bindName: function(name) {
    this.setData({
      name: name.detail.value
    });
  }
})
