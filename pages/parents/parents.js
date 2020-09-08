// pages/parents/parents.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countiDays: 0,
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度
    bcol1: "#FFFFFF",
    col1: "#FF9999",
    bcol2: "#FF9999",
    col2: "#FFFFFF",
    list: [],
    list1:[]
  },
  change_color1: function (e) {
    this.setData({
      bcol1: "#FF9999",
      col1: "#FFFFFF",
      bcol2: "#FFFFFF",
      col2: "#FF9999",
      theme_color: app.globalData.theme_color,
      col2: app.globalData.theme_color,
      bcol1: app.globalData.theme_color,
    });
  },
  back: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  //改变左边按钮样式
  change_color2: function () {
    this.setData({
      bcol1: "#FFFFFF",
      col1: "#FF9999",
      bcol2: "#FF9999",
      col2: "#FFFFFF",
      theme_color: app.globalData.theme_color,
      col1: app.globalData.theme_color,
      bcol2: app.globalData.theme_color,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getMenuButtonBoundingClientRect( //获取胶囊的干度及其他参数
      {
        success: e => {
          that.data.jiaonangHeight = e.height
        }
      }
    )


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      countiDays:app.globalData.countiDays,
      bcol1: "#FFFFFF",
      col1: "#FF9999",
      bcol2: "#FF9999",
      col2: "#FFFFFF",
      theme_color: app.globalData.theme_color,
      col1: app.globalData.theme_color,
      bcol2: app.globalData.theme_color,
      list: app.globalData.brushList.reverse(),
      list1: app.globalData.scoreList.reverse()
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})