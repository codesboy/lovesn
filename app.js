//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        });
        // wx.playBackgroundAudio({
        //     dataUrl: 'https://me.rehack.cn/lovesr/music/love.mp3',
        // })
        // const backgroundAudioManager = wx.getBackgroundAudioManager();
        // backgroundAudioManager.src = 'https://me.rehack.cn/lovesr/music/love.mp3' // 设置了 src 之后会自动播放
    },
    globalData: {
        userInfo: null,
        baseUrl: 'https://me.rehack.cn/api/v1/',
        // playStatus:true
    },
    // onHide: function () {
    //     console.log('应用hide')
    //     wx.stopBackgroundAudio()
    //     this.globalData.playStatus=false
    // }
})