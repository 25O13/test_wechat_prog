// pages/reminder/reminder.js
const app = getApp()
var util = require('../../utils/util.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        theme_color: "",
        jiaonangHeight: 42, // data中定义
        statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度
        mor_h: '', //app.globalData.mor_h.toString(),
        mor_m: '', //app.globalData.mor_m,
        mor_e: '',
        eve_h: '', //app.globalData.eve_h,
        eve_m: '', //app.globalData.eve_m,
        eve_e: '',
        brush_start_date: "",
        brush_end_date: "",
        brush_num: 0,
        dental_start_date: "",
        dental_end_date: "",
        dental_num: 0,
    },

    brush_num_data: function () {
        var start_date = new Date(this.data.brush_start_date.replace(/-/g, "/"));
        var end_date = new Date(this.data.brush_end_date.replace(/-/g, "/"));
        var days = end_date.getTime() - start_date.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));

        this.setData({
            brush_num: day
        })
    },

    dental_num_data: function () {
        var start_date = new Date(this.data.dental_start_date.replace(/-/g, "/"));
        var end_date = new Date(this.data.dental_end_date.replace(/-/g, "/"));
        var days = end_date.getTime() - start_date.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));

        this.setData({
            dental_num: day
        })
    },

    back: function () {
        wx.navigateBack({
            delta: 1,
        })
    },

    brush: function (e) {
        wx.navigateTo({
            url: '/pages/reminder/brush/brush',
        })
    },

    change: function (e) {
        wx.navigateTo({
            url: '/pages/reminder/change/change',
        })
    },

    dental: function (e) {
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
        var my_mor_m = null
        var my_eve_m = null
        if (app.globalData.list[0].min < 10) {
            my_mor_m = "0" + app.globalData.list[0].min.toString()
        } else {
            my_mor_m = app.globalData.list[0].min.toString()
        }
        if (app.globalData.list[1].min < 10) {
            my_eve_m = "0" + app.globalData.list[1].min.toString()
        } else {
            my_eve_m = app.globalData.list[1].min.toString()
        }
        this.setData({
            mor_h: app.globalData.list[0].hour.toString(),
            mor_m: my_mor_m,
            mor_e: app.globalData.list[0].able,
            eve_h: app.globalData.list[1].hour.toString(),
            eve_m: my_eve_m,
            theme_color: app.globalData.theme_color,
            eve_e: app.globalData.list[1].able,
        })

        var time = util.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
            brush_end_date: time,
            dental_end_date: time,
            brush_start_date: app.globalData.brush_start_date,
            dental_start_date: app.globalData.dental_start_date,
        });
        this.brush_num_data()
        this.dental_num_data()


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