// pages/register/register.js
const app = getApp()
const AV = require('../../libs/av-core-min.js')
var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    brush_start_date: "",
    today: "",
    gender: 0, //0女 1男
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

    username: '',
    password: '',
    password_asr: '',
    date: '2000-11-02',
    array: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
    index: 0,
  },

  setBrushDate(e) {
    // var date_1 = new Date(this.data.brush_start_date.replace(/-/g, "/"));
    var date_2 = new Date(this.data.today.replace(/-/g, "/"));
    var days_2 = date_2.getTime();
    var days_1 = days_2 - e * 1000 * 60 * 60 * 24*30
    var date = new Date(days_1)
    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    var myday =  [year, month, day].map(formatNumber).join('/')
    this.setData({
      brush_start_date: myday,
    })
  },

  girl() {
    this.setData({
      gender: 0
    })
  },

  boy() {
    this.setData({
      gender: 1
    })
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

  inputPassword_asr(e) {
    this.setData({
      password_asr: e.detail.value,
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    console.log(this.data.date)
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.setBrushDate(this.data.index)
  },


  choose: function () {

  },

  tologin: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  login: function () {
    wx.redirectTo({
      url: '/pages/homePage/homePage',
    })
  },

  register() {
    console.log(this.data)
    if (this.data.username.length < 6) {
      wx.showToast({
        title: '账号过短',
        icon: 'none',
      })
    } else {
      if (this.data.password.length < 6) {
        wx.showToast({
          title: '密码过短',
          icon: 'none',
        })
      } else {
        if (this.data.password != this.data.password_asr) {
          wx.showToast({
            title: '两次密码不同',
            icon: 'none',
          })
        } else {

          const {
            username,
            password,
          } = this.data;
          const user = new AV.User();
          if (username) user.set({
            username
          });
          if (password) user.set({
            password
          });
          user.set("birthday", this.data.date.replace(/-/g, "/"))
          user.set("gender", this.data.gender)
          user.set("theme_color", "#ff9999")
          user.set("brush", this.data.brush_start_date)
          user.set("dental",this.data.today)
          user.set("countiDays", 0)
          user.save().then(() => {
            wx.showToast({
              title: '注册成功啦~',
              icon: 'success',
            });
            setTimeout(function() {
              wx.navigateBack({
                delta: 1,
              })
            },1000);
          }).catch(error => {
            wx.showToast({
              title: '注册失败',
              icon: 'none',
            })
          });
        }
      }
    }
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

    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      today: time,
      brush_start_date: time
    });
    // this.num_data()
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