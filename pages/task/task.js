// pages/task/task.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosen_butt_age: 0,
    butt_co: [{
      but_co: "white",
      but_bco: "",
    }, {
      but_co: "white",
      but_bco: "",
    }, {
      but_co: "white",
      but_bco: "",
    }, {
      but_co: "white",
      but_bco: "",
    }, {
      but_co: "white",
      but_bco: "",
    }, {
      but_co: "white",
      but_bco: "",
    }],
    co1: "#ffffff",
    bco1: "#ff9999",
    co2: "#ffffff",
    bco2: "#ff9999",
    co4: "#ff9999",
    bco4: "#ffffff",
    co5: "#ffffff",
    bco5: "#ff9999",
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度


  },

  go_know: function (e) {
    var mybutt = e.currentTarget.id;
    var butt_func = parseInt(mybutt)-1
    // if (mybutt == '1') {
    //   butt_func = 0;
    // } else if (mybutt == '2') {
    //   butt_func = 1;
    // } else {
    //   butt_func = 2;
    // }
    app.globalData.choosen_butt_func = butt_func;
    wx.navigateTo({
      url: '/pages/knowledge/clean/clean',
    })
  },

  tapButton: function (e) {
    this.setData({
      choosen_butt_age: parseInt(e.currentTarget.id)
    })
    app.globalData.choosen_butt_age = this.data.choosen_butt_age;
    console.log(app)
    this.onShow()
  },

  getThemeButtonColor: function () {
    for (let i = 0; i < 6; i++) {
      this.setData({
        [`butt_co[${i}].but_bco`]: app.globalData.theme_color,
        [`butt_co[${i}].but_co`]: "white"
      })
    }
  },

  setThemeButtonColor: function () {
    const myIndex = this.data.choosen_butt_age
    this.setData({
      [`butt_co[${myIndex}].but_co`]: app.globalData.theme_color,
      [`butt_co[${myIndex}].but_bco`]: "white"
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

  tap_5: function () {
    wx.redirectTo({
      url: '/pages/mine/mine',
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
      bco1: app.globalData.theme_color,
      bco2: app.globalData.theme_color,
      co4: app.globalData.theme_color,
      bco5: app.globalData.theme_color,
    })

    this.getThemeButtonColor()
    this.setThemeButtonColor()

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