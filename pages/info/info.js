var util = require('../../utils/util.js');
Page({
  data: {
    list: {},
    id: ''
  },
  onLoad: function(goodies) {
    //从缓存中读取数据
    var that = this
    wx.getStorage({
      key: 'list',
      success: function(res) {
        that.setData({
          list: res.data,
          id: goodies.id,
          newOrder: new util.order(goodies.id, res.data[goodies.id].name, res.data[goodies.id].remark, util.formatTime(new Date))
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
  saveOrder: function(){
    this.data.list[this.data.id] = this.data.newOrder
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
    this.data.newOrder.newRemark(remark.detail.value)
  },
  bindName: function(name) {
    this.data.newOrder.newName(name.detail.value)
  }
})
