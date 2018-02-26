function siteTime() {

    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    // var today = new Date();
    // var todayYear = today.getFullYear();
    // var todayMonth = today.getMonth();
    // var todayDate = today.getDate();
    // var todayHour = today.getHours();
    // var todayMinute = today.getMinutes();
    // var todaySecond = today.getSeconds();
    var nowTime = new Date().getTime();//当前时间戳
    var loveBeginTime = new Date('2018 / 02 / 18').getTime();//恋爱开始时间戳
    var diff = nowTime - loveBeginTime;//恋爱的时长
    var diffYears = Math.floor(diff / years);
    var diffDays = Math.floor((diff / days) - diffYears * 365);
    var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
    var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
    var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
    if (diffSeconds.toString().length == 1) {
        diffSeconds = '0' + diffSeconds;
    }
    return (diffYears + "年" + diffDays + "天" + diffHours + "小时" + diffMinutes + "分钟" + diffSeconds + "秒");
}

module.exports.time =siteTime;