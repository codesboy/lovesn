// pages/photos/photos/photoas.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        this.setData({
            albumId: options.id
        })
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
    onPullDownRefresh(e) {
        this.loadData();
    },
    // 获取数据
    loadData() {
        var _this = this;
        if (wx.showLoading) {
            wx.showLoading({
                title: "Love's coming"
            })
        }
        wx.request({
            url: app.globalData.baseUrl + 'getphotos?id=' + this.data.albumId,
            success: function (res) {
                // console.log(res.data)
                var data = res.data.items;
                _this.setData({
                    photos: data
                })
                var urls = [];
                for (var i in data) {
                    urls.push('https://me.rehack.cn' + data[i].img.url)
                }
                _this.setData({
                    urls
                })
            },
            fail: function (e) {
                console.log(e.errMsg)
            },
            complete: function () {
                wx.stopPullDownRefresh()
                if (wx.hideLoading) {
                    wx.hideLoading();
                }
            }
        })
    },

    // 预览原图
    preview(e) {
        // console.log(e.currentTarget.dataset.src)
        console.log(this.data.urls)
        var src = 'https://me.rehack.cn' + e.currentTarget.dataset.src;

        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: this.data.urls
        })
    }
})