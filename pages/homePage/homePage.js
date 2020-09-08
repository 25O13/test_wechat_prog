// pages/mytheme/mytheme.js
const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countiDays: 0,
    score: 0,
    co1: "#ff9999",
    bco1: "#ffffff",
    co2: "#ffffff",
    bco2: "#ff9999",
    co4: "#ffffff",
    bco4: "#ff9999",
    co5: "#ffffff",
    bco5: "#ff9999",
    brush_start_date: "",
    dental_start_date: "",
    today: "",
    brush_num: 0,
    dental_num: 0,
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

  },

  num_data: function () {
    var start_date_1 = new Date(this.data.brush_start_date.replace(/-/g, "/"));
    var start_date_2 = new Date(this.data.dental_start_date.replace(/-/g, "/"));
    var end_date = new Date(this.data.today.replace(/-/g, "/"));
    var days_1 = end_date.getTime() - start_date_1.getTime();
    var days_2 = end_date.getTime() - start_date_2.getTime();
    var day_1 = parseInt(days_1 / (1000 * 60 * 60 * 24));
    var day_2 = parseInt(days_2 / (1000 * 60 * 60 * 24));

    this.setData({
      brush_num: day_1,
      dental_num: day_2,
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


  tap_5: function () {
    wx.redirectTo({
      url: '/pages/mine/mine',
    })
  },

  go_game: function () {
    wx.navigateTo({
      url: '/pages/youxi/youxi',
    })
  },

  go_reminder: function () {
    wx.navigateTo({
      url: '/pages/reminder/brush/brush',
    })
  },

  go_brush: function () {
    wx.navigateTo({
      url: '/pages/parents/parents',
    })
  },

  go_change: function () {
    wx.navigateTo({
      url: '/pages/reminder/change/change',
    })
  },

  go_dental: function () {
    wx.navigateTo({
      url: '/pages/reminder/dental/dental',
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
      score: app.globalData.score,
      co1: app.globalData.theme_color,
      bco2: app.globalData.theme_color,
      bco4: app.globalData.theme_color,
      bco5: app.globalData.theme_color,
      countiDays: app.globalData.countiDays
    })

    var that = this
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      today: time,
      brush_start_date: app.globalData.brush_start_date,
      dental_start_date: app.globalData.dental_start_date,
    });
    this.num_data()
    var start = new Date(app.globalData.lastBrush.replace(/-/g, "/"));
    var end = new Date(time.replace(/-/g, "/"));
    var ms = end.getTime() - start.getTime();
    var day = parseInt(ms / 1000 / 60 / 60 / 24)

    if (!(day == 1 || app.globalData.lastBrush == "")) {
      that.setData({
        countiDays: 0,
      })
      app.globalData.countiDays = 0
    }





    // console.log(this.data)
    console.log(app.globalData)


    // // // 设定账号调试用
    // app.globalData.user.set("scoreList", [{
    //   num: 5,
    //   date: "7/16"
    // }, {
    //   num: 10,
    //   date: "7/17"
    // }, {
    //   num: 15,
    //   date: "8/15"
    // }, {
    //   num: 20,
    //   date: "8/18"
    // }, {
    //   num: 25,
    //   date: "8/23"
    // },{
    //   num:30,
    //   date:"9/10"
    // },{
    //   num:35,
    //   date:"9/11"
    // },{
    //   num:40,
    //   date:"9/12"
    // },{
    //   num:45,
    //   date:"9/13"
    // },{
    //   num:50,
    //   date:"9/14"
    // },{
    //   num:55,
    //   date:"9/15"
    // },{
    //   num:60,
    //   date:"9/16"
    // },{
    //   num:65,
    //   date:"9/17"
    // },{
    //   num:70,
    //   date:"9/18"
    // },{
    //   num:75,
    //   date:"9/19"
    // },{
    //   num:80,
    //   date:"9/20"
    // },{
    //   num:85,
    //   date:"9/21"
    // },{
    //   num:90,
    //   date:"9/22"
    // },{
    //   num:95,
    //   date:"9/23"
    // },{
    //   num:100,
    //   date:"9/24"
    // }])
    // app.globalData.user.set("timesCounter", [0, 0, 0])



    // // // app.globalData.user.set("lastScore", "2020/08/22")
    // // // app.globalData.user.set("lastScore", "2020/08/22")
    // // // app.globalData.user.set("lastScore", "2020/08/22")
    // // // app.globalData.user.set("lastScore", "2020/08/22")
    // // // app.globalData.user.set("lastScore", "2020/08/22")
    // // // app.globalData.user.set("lastScore", "2020/08/21")



    // app.globalData.user.set("lastBrush", "2020/08/20")
    // app.globalData.user.set("countiDays", 12)
    // app.globalData.user.save()



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