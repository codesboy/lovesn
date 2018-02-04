//index.js
const time = require('../../common/time.js');
//获取应用实例
const app = getApp();
// 全局唯一的背景音频管理器
// const backgroundAudioManager = wx.getBackgroundAudioManager();

// 创建并返回内部 audio 上下文 innerAudioContext 对象
const innerAudioContext = wx.createInnerAudioContext();
Page({
    data: {
        toggle: true,
        loveTime: '',
        loveShow: '',
        musicSrc: 'https://me.rehack.cn/lovewei/music/love.mp3'
    },
    onLoad: function () {
        this.loadData();
        
        innerAudioContext.autoplay = true;
        innerAudioContext.loop = true;
        innerAudioContext.src = this.data.musicSrc;
        innerAudioContext.onPlay(() => {
            console.log('开始播放');
        });
        innerAudioContext.onError((res) => {
            console.log(res.errMsg)
            console.log(res.errCode)
        });
    },
    onShow: function () {
        var _this = this;

        setInterval(function () {
            _this.setData({
                loveTime: time.time()
            })
        }, 1000);

        if (innerAudioContext.paused) {//true 当前是暂停或停止
            innerAudioContext.play();
            innerAudioContext.onPlay(() => {
                console.log('onplay')
                _this.setData({
                    toggle: true
                })
            })

        } else {//如果当前在播放
            _this.setData({
                toggle: true
            })
        }

        console.log('show');
    },
    onHide: function () {
        // console.log('page hide')
    },
    audioToggle() {
        var _this = this;
        console.log(innerAudioContext.paused )
        if (innerAudioContext.paused){
            innerAudioContext.play();
            innerAudioContext.onPlay( ()=> {
                console.log('onplay')
                _this.setData({
                    toggle: true
                })
            })
        }else{
            innerAudioContext.pause()
            // wx.pauseBackgroundAudio()
            innerAudioContext.onPause( () =>{
                console.log('onpause')
                _this.setData({
                    toggle: false
                })
            })
        }

        

    },

    // 下拉刷新
    onPullDownRefresh:function(e){
        this.loadData();
    },

    // 请求服务器数据
    loadData(){
        var _this = this;
        if (wx.showLoading) {
            wx.showLoading({
                title: "加载中"
            })
        }
        wx.request({
            url: app.globalData.baseUrl + 'showlove',
            method: 'GET',
            success: function (res) {
                console.log(res.data)
                _this.setData({
                    loveShow: res.data.show
                })
            },
            fail: function (e) {
                console.log(e.errMsg)
            },
            complete:function(){
                wx.stopPullDownRefresh();
                if (wx.hideLoading) {
                    wx.hideLoading();
                }
            }
        });
    }

})
