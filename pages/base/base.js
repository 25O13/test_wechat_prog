// pages/mytheme/mytheme.js
const app = getApp()
const util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: "",
        account: "",
        age: null,
        birthday: "",
        gender: "男孩子",
        theme_color: "",
        jiaonangHeight: 42, // data中定义
        statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

    },

    back: function () {
        wx.navigateBack({
            delta: 1,
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
        var time = util.formatTime(new Date());

        this.setData({
            theme_color: app.globalData.theme_color,
            nickname: app.globalData.userInfo.nickName,
            account: app.globalData.user.attributes.username,
            birthday: app.globalData.user.attributes.birthday,
        })
        const mygender = app.globalData.user.attributes.gender;
        if (mygender == 0) {
            this.setData({
                gender: "女孩子"
            })
        }
        var start_date = new Date(this.data.birthday.replace(/-/g, "/"));
        var end_date = new Date(time.replace(/-/g, "/"));
        var days = end_date.getTime() - start_date.getTime();
        var day = days / 24 / 60 / 60 / 1000;
        var age = parseInt(day / 365);

        this.setData({
            age:age
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