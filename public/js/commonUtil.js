var commonUtil = (function (util) {

    util.test = function () {
        window.console.log('test');
    };

    // Ajax Post 请求
    util.ajaxPost = function (url, data, dataType, sucCallback, errCallback, beforeCallback) {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: dataType,
            beforeSend: function (xhr) {
                return beforeCallback && beforeCallback(xhr);
            },
            success: function (result) {
                return sucCallback && sucCallback(result);
            },
            error: function (err) {
                console.log('ajaxPost_err', err);
                return errCallback && errCallback(err);
            }
        });
    };

    // Ajax Get 请求
    util.ajaxGet = function (url, data, dataType, sucCallback, errCallback) {
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: dataType,
            success: function (result) {
                return sucCallback && sucCallback(result);
            },
            error: function (err) {
                console.log('ajaxGet_err', err);
                return errCallback && errCallback(err);
            }
        });
    };

    // 获取字符串长度
    util.strlen = function(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1 
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            }
            else {
                len += 2;
            }
        }
        return len;
    };

    // 截取字符串
    util.subString = function(str, len, hasDot) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;

        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            }
            else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    };

    //将秒数格式化为0:0:0的格式
    util.formateTime = function (time) {
        var hours = parseInt(time/3600,10);
        var minit = parseInt((time - hours*3600)/60,10);
        var seconds = parseInt(time - hours*3600 - minit*60,10);
        var formateTime = hours+":"+minit+":"+seconds;
        return formateTime;
    };

    //将秒数格式化为00:00:00的格式
    util.formateTimeNew = function (time) {
        var hours = parseInt(time/3600,10);
        var minit = parseInt((time - hours*3600)/60,10);
        var seconds = parseInt(time - hours*3600 - minit*60,10);
        if (hours < 10) {
            hours = '0' + hours;
        }else{
            hours = hours;
        }
        if (minit < 10) {
            minit = '0' + minit;
        }else{
            minit = minit;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }else{
            seconds = seconds;
        }
        var formateTime = hours+":"+minit+":"+seconds;
        return formateTime;
    };

    //数据判断，超过100000转文字单位，保留1位小数
    util.formateNum = function (num) {
        var result;
        if (num >= 100000) {
            num = parseInt(num/1000)/10;
            result = num + "万";
        } else {
            result = num;
        }

        return result;
    };

    // 生成 UDID
    util.guid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    // 裁剪封面图尺寸
    util.cutCoverImage = function(element) {
        var eleWidth = $(element).width();
        $(element).css({"height":eleWidth})
        window.onresize = function() {
            var eleWidth = $(element).width();
            $(element).css({"height":eleWidth})
        }
    }

    // 防止 script 脚本注入
    util.formatBeforeShow = function (text) {
        if (!text) {
            return;
        }
        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        //text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return text;
    };

    // 获取当前时间
    util.getCurrentTime = function () {
        var myDate = new Date();
        var hour = myDate.getHours();
        var minute = myDate.getMinutes();
        var second = myDate.getSeconds();
        var ms = myDate.getMilliseconds();

        hour = (hour < 10) ? ('0' + hour) : hour;
        minute = (minute < 10) ? ('0' + minute) : minute;
        second = (second < 10) ? ('0' + second) : second;

        return hour + ':' + minute + ':' + second + '.' + ms;
    }

    // 通过秒数获取 天, 时，分，秒
    util.getDhmsFromSecond = function (liveLength) {
        var minute = parseInt(liveLength / 60, 10);
        var hour = parseInt(minute / 60, 10);
        if (hour < 10)
            hour = '0' + hour;

        minute = parseInt(minute % 60, 10);
        if (minute < 10)
            minute = '0' + minute;

        var second = parseInt(liveLength % 60, 10);
        if (second < 10)
            second = '0' + second;

        //console.log('getHmsFromSecond', hour);

        if (hour >= 24) {
            var day = parseInt(hour / 24, 10);
            hour = hour - day * 24;

            if (hour < 10)
                hour = '0' + hour;

            return {
                day: day.toString(),
                hour: hour.toString(),
                minute: minute.toString(),
                second: second.toString()
            };
        }
        else {
            return {
                day: '0',
                hour: hour.toString(),
                minute: minute.toString(),
                second: second.toString()
            };
        }
    };

    // 打印日志
    util.consoleLog = function () {
        window.console.log(this.getCurrentTime(), arguments);
    }

    // 去除空格
    util.trim = function (str) {
        return str.replace(/^\s*|\s*$/g, '');
    };

    return util;

}(commonUtil || {}));
