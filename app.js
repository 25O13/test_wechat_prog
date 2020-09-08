//app.js
const AV = require('./libs/av-core-min');
const adapters = require('./libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
AV.init({
  appId: '7EhEdeG3i8DXDCAOsBh78RpP-gzGzoHsz',
  appKey: 'j2PDWw00xqp7MjHRc5mf7lFF',
  // 请将 xxx.example.com 替换为你的应用绑定的自定义 API 域名
  serverURLs: "https://7ehedeg3.lc-cn-n1-shared.com",
});


App({
  onLaunch: function () {

    var that = this;

    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {

        that.globalData.scrH = res.screenHeight;
        that.globalData.scrW = res.screenWidth;

      }
    });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    score:0,
    countiDays: 0,
    lastBrush:"",
    lastScore:"",
    scoreList:[],
    brushList:[],
    timesCounter: [0, 0, 0],
    user: null,
    gender:null,
    choosen_butt_func:0,
    choosen_butt_age:0,
    scrH: undefined,
    scrW: undefined,
    dental_start_date: "",
    brush_start_date: "",
    birthday:"",
    // end_date: "",
    // num:undefined,
    theme_color: "#ff9999",
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    userInfo: null,
    list: [{
      able: false,
      hint_txt: "起床后提醒我",
      hour: 8,
      min: 0,
      value: [8, 0],
    }, {
      able: false,
      hint_txt: "睡觉前提醒我",
      hour: 20,
      min: 0,
      value: [20, 0],
    }],
  }
})