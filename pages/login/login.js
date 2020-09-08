// pages/knowledge/clean/clean.js
const app = getApp()
const AV = require('../../libs/av-core-min.js')
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

    username: '',
    password: '',

  },
  inputUsername(e) {
    this.setData({
      username: e.detail.value,
    })
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value,
    })
  },


  login: function () {

    var time = util.formatTime(new Date());

    AV.User.logIn(this.data.username, this.data.password).then((user) => {
      // console.log(user)
      app.globalData.brush_start_date = user.attributes.brush;
      app.globalData.dental_start_date = user.attributes.dental;
      app.globalData.birthday = user.attributes.birthday;
      app.globalData.gender = user.attributes.gender;
      app.globalData.user = user;
      app.globalData.theme_color = user.attributes.theme_color;
      app.globalData.countiDays = user.attributes.countiDays;
      if (user.attributes.brushList) {
        app.globalData.brushList = user.attributes.brushList;
      }
      if (user.attributes.scoreList) {
        app.globalData.scoreList = user.attributes.scoreList;
      }
      if (user.attributes.lastBrush) {
        app.globalData.lastBrush = user.attributes.lastBrush;
      }
      if (user.attributes.lastScore) {
        app.globalData.lastScore = user.attributes.lastScore;
        if (user.attributes.timesCounter && user.attributes.lastScore == time) {
          app.globalData.timesCounter = user.attributes.timesCounter;
        }
        if (user.attributes.score && user.attributes.lastScore == time){
          app.globalData.score = user.attributes.score;
        }
      }
      if (user.attributes.countiDays) {
        app.globalData.countiDays = user.attributes.countiDays;
      }


      wx.redirectTo({
        url: '/pages/homePage/homePage',
      })
    }, (error) => {
      wx.showToast({
        title: '登录失败',
        icon: 'none',
      })
    });


  },
  toregister: function () {
    wx.navigateTo({
      url: '/pages/register/register',
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
      theme_color: app.globalData.theme_color,
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

  },


})