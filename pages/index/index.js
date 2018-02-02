//index.js
const time = require('../../common/time.js');

//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        loveTime:'',
        loveShow:''
    },
    onLoad:function(){
        var _this = this;
        wx.request({
            url: app.globalData.baseUrl+'showlove',
            method:'GET',
            success:function(res){
                console.log(res.data)
                _this.setData({
                    loveShow:res.data.show
                })
            },
            fail:function(e){
                console.log(e.errMsg)
            }
        })
    },
    onShow: function () {
        // console.log(time.time())
        // siteTime()
        this.setData({
            loveTime: time.time()
        });
        var _this = this;
        setInterval(function(){
            _this.setData({
                loveTime: time.time()
            })
        }, 1000);
    }
})
