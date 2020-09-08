// pages/reminder/brush/brush.js
const hours = []
const mins = []
const app = getApp()

for (let i = 0; i <= 23; i++) {
  if (i < 10) {
    hours.push("0" + i.toString())
  } else {
    hours.push(i.toString())
  }
}

for (let i = 0; i <= 59; i++) {
  if (i < 10) {
    mins.push("0" + i.toString())
  } else {
    mins.push(i.toString())
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度
    hours: hours,
    mins: mins,
    list: [],
    tips: "建议：至少早晚刷牙两次",
  },

  //测试删除功能，已经实现删除并实时刷新,点击时间即可删除
  // test_tap: function (e) {
  //   console.log(e)
  //   const del_index = e.currentTarget.dataset.myid
  //   var that = this;
  //   that.data.list.splice(del_index, 1);
  //   that.setData({
  //     list: that.data.list
  //   })
  //   console.log(del_index)
  // },

  back: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  test_swt: function (e) {
    const myid = e.target.dataset.myid
    const new_able = e.detail.value
    this.setData({
      [`list[${myid}].able`]: new_able,
    })

    console.log(e)
  },

  add_reminder: function (e) {
    const newid = this.data.list.length
    this.setData({
      [`list[${newid}].hint_txt`]: "自定提醒 " + (newid - 1).toString(),
      [`list[${newid}].hour`]: 12,
      [`list[${newid}].min`]: 0,
      [`list[${newid}].value`]: [12, 0],
    })
    console.log(newid)
  },

  delete_reminder:function(e){
    const del_index = e.currentTarget.dataset.myid
    var that = this;
    that.data.list.splice(del_index, 1);
    that.setData({
      list: that.data.list
    })
    console.log(del_index)
    for(let i=2;i<this.data.list.length;i++){
      this.setData({
        [`list[${i}].hint_txt`]: "自定提醒 " + (i - 1).toString(),
      })
    }
  },

  bindChange: function (e) {
    const val = e.detail.value
    const myid = e.target.dataset.myid
    this.setData({
      [`list[${myid}].hour`]: val[0],
      [`list[${myid}].min`]: val[1],
      [`list[${myid}].value`]: val,
    })
    app.globalData.list = this.data.list
    console.log(this.data)
    console.log(myid)
    console.log(e)
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

  /*
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      list: app.globalData.list,
      theme_color: app.globalData.theme_color
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