//index.js
//获取应用实例
var app = getApp()
Page({
  //事件处理函数
  data: {
    list: {}
  },
  bindViewTap: function() {
    wx.switchTab({
      url: '../list/list'
    })
  },
  writeStorage: function() {
    try {
      wx.setStorageSync('list', this.data.list)
    } catch (e) {

    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    // 把数据写进缓存
    // that.writeStorage()
  }
})
