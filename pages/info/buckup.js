var util = require('../../utils/util.js');
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
Page({
  data: {
    list: '',
    id: ''
  },
  onLoad: function(goodies) {
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
    that.setData({
      id: goodies.id
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
    var key = this.data.id
    //var newOrder = new order(key, this.data.name, this.data.remark, util.formatTime(new Date));
    //this.data.list[key] = newOrder
    var newOrder = this.data.list[key]
    newOrder["name"] = this.data.name
    newOrder["remark"] = this.data.remark
    newOrder["date"] = util.formatTime(new Date)
    //同步缓存
    this.writeStorage()
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
