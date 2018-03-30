//index.js
const time = require('../../common/time.js');
// const garden = require('../../common/garden.js');
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
        musicSrc: 'https://me.rehack.cn/lovesr/music/love.mp3',
        timer:null,
        tpl:'123456'
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
        // console.log(this.data.timer)
        clearInterval(this.data.timer);
        if (wx.showLoading) {
            wx.showLoading({
                title: "Love's coming"
            })
        }
        wx.request({
            url: app.globalData.baseUrl + 'showlove',
            method: 'GET',
            success: (res)=> {
                let n = 0;
                this.setData({
                    timer: setInterval(() => {
                        this.setData({
                            loveShow: res.data.show.substring(0,n)
                        })
                        n++;
                        // console.log(this.data.loveShow)
                        if (this.data.loveShow == res.data.show) {
                            clearInterval(this.data.timer)
                        }

                    }, 150)
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
