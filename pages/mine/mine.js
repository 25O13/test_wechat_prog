//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    co1: "#ffffff",
    bco1: "#ff9999",
    co2: "#ffffff",
    bco2: "#ff9999",
    co4: "#ffffff",
    bco4: "#ff9999",
    co5: "#ff9999",
    bco5: "#ffffff",
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

  },

  go_data: function () {
    wx.navigateTo({
      url: '/pages/parents/parents',
    })
  },

  go_theme: function () {
    wx.navigateTo({
      url: '/pages/mytheme/mytheme',
    })
  },

  go_reminder: function () {
    wx.navigateTo({
      url: '/pages/reminder/reminder',
    })
  },

  go_base: function () {
    wx.navigateTo({
      url: '/pages/base/base',
    })

  },

  tap_1: function () {
    wx.redirectTo({
      url: '/pages/homePage/homePage',
    })
  },

  tap_2: function () {
    wx.redirectTo({
      url: '/pages/photograph/photograph',
    })
  },

  tap_3: function () {
    wx.navigateTo({
      url: '/pages/shuaya/shuaya',
    })
  },

  tap_4: function () {
    wx.redirectTo({
      url: '/pages/task/task',
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    this.setData({
      userInfo: app.globalData.userInfo,
    })

    console.log(this.data.userInfo)

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
      bco1: app.globalData.theme_color,
      bco2: app.globalData.theme_color,
      bco4: app.globalData.theme_color,
      co5: app.globalData.theme_color,
    })

  },
})