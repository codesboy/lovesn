// pages/timeline/timeline.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        timelines:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
       
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
    // 下拉刷新
    onPullDownRefresh (e) {
        this.loadData();
    },
    loadData(){
        var _this = this;
        if (wx.showLoading) {
            wx.showLoading({
                title: "加载中"
            })
        }
        wx.request({
            url: app.globalData.baseUrl + 'timeline',
            success: function (res) {
                console.log(res.data)
                _this.setData({
                    timelines: res.data
                })
            },
            fail:function(){

            },
            complete:function(){
                wx.stopPullDownRefresh()
                if (wx.hideLoading) {
                    wx.hideLoading();
                }
            }
        })
    }
})