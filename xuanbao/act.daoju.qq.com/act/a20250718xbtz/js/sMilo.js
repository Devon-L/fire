// //检查是否登录
// Milo.dologin = function (success, fail, isApp = false) {
//     Milo.checkLogin({
//         iUseQQConnect: (milo.request('neiqian') == 1 || milo.request('wegame') == 1 || (milo.request("douyin") == 1 && location.hostname == "app.daoju.qq.com")) ? false : true, //如果当前活动使用的互联登录,请将改参数设置true
//         success: function (user) {
//             $("#unlogin").hide();
//             $("#logined").show();
//             Milo.userInfo = user && user.userInfo;

//             if (milo.cookie.get("acctype") == "wx") {
//                 Milo.acctype = "wx";
//             } else {
//                 Milo.acctype = user.userInfo.acctype;
//             }
//             if (milo.request("douyin") == 1 && location.hostname == "app.daoju.qq.com" && Milo.acctype != "pt") {
//                 Milo.tologout();
//                 return;
//             }
//             if (isApp) {
//                 Milo.isApp(function () {
//                     $.isFunction(success) && success(user);
//                 })
//             } else {
//                 $.isFunction(success) && success(user);
//             }
//         },
//         fail: function (res) {
//             if (!res.isLogin) {
//                 $("#unlogin").show();
//                 $("#logined").hide();
//                 Milo.tologin();
//             }
//             $.isFunction(fail) && fail();
//         }
//     });
// }
//登录
// Milo.tologin = function () {
//     $("#unlogin").show();
//     $("#logined").hide();
//     window.iUseQQConnect = (milo.request('neiqian') == 1 || milo.request('wegame') == 1) ? 0 : 1;
//     if (milo.request("douyin") == 1 && location.hostname == "app.daoju.qq.com") {
//         window.iUseQQConnect = 0;
//         Milo.mobileLoginByQQ({
//             sData: {
//                 //传pt_no_onekey:1 可以屏蔽一键登录
//                 pt_no_onekey: 1
//             }
//         });
//         return;
//     }
//     if (window.iUseQQConnect == 0) {
//         Milo.loginByQQ();
//         return;
//     }
//     if (Milo.isQQApp()) {
//         Milo.mobileLoginByQQConnect();
//     } else if (Milo.isWxApp()) {
//         Milo.mobileLoginByQQConnect();
//     } else if (Milo.isDJApp()) {
//         $("#unlogin").hide();
//     } else if (Milo.isMobile()) {
//         if (milo.request("test") == 1) {
//             Milo.loginByQQConnect();
//             return;
//         }
//         Milo.mobileLoginByQQConnect();
//     } else {
//         Milo.loginByQQConnect();
//     }

// }

// //注销
// Milo.tologout = function () {
//     Milo.logout({
//         // 退出回调
//         callback: function () {
//             $("#unlogin").show();
//             $("#logined").hide();
//             // setTimeout(function () {
//             //     location.reload();
//             // }, 1000)
//         }
//     });
//     $("#unlogin").show();
//     $("#logined").hide();
//     setTimeout(function () {
//         location.reload();
//     }, 1000)
// }

//道聚城判断
Milo.isDJApp = function () {
    var result = milo.cookie.get("djc_appVersion") != null && milo.cookie.get("djc_appVersion") >= 62 || typeof HostApp != "undefined";
    return result;
}

//判断ios
Milo.isIOS = function () {
    var u = navigator.userAgent;
    var result = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return result;
}
//判断掌火
Milo.isCfApp = function () {
    if ((new RegExp('cfapp').test(navigator.userAgent)) || /GameHelper/.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

//
Milo.template = function (g, tpl, id, call) {
    need("util.template", function (template) {
        $(id).html(template.parseDOMTemplate(tpl).process(g, tpl));
        $.isFunction(call) && call();
    });
}

//删除地址指定参数返回新地址
Milo.urlDelParams = function (name) {
    var loca = window.location
    var baseUrl = loca.origin + loca.pathname + '?'
    var query = loca.search.substr(1);
    if (query.indexOf(name) > -1) {
        var obj = {}
        var arr = query.split('&')
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split('=')
            obj[arr[i][0]] = arr[i][1]
        }
        delete obj[name]
        var url =
            baseUrl +
            JSON.stringify(obj)
                .replace(/[\"\{\}]/g, '')
                .replace(/\:/g, '=')
                .replace(/\,/g, '&')
        return url;
    }
}
//是否在掌上道聚城内
Milo.isApp = function (callback, url = location.href) {
    if (Milo.isDJApp()) {
        typeof callback == "function" ? callback() : console.log("no callback function")
    } else {
        //站外从活动跳下载页的传参是不是有问题，没有穿biz信息，导致下载页不是按照业务biz来显示的
        // 3.从下载页拉起APP的链接不对，需要带上全屏参数，adtag参数
        // 用这个链接：
        //https://app.daoju.qq.com/act/a20230818eleven/index.html?biz=dj&biztag=dj&adtag=share&full_screen=1
        // var params = Milo.getUrlParams();
        // if (!params["biz"]) {
        //     params["biz"] = "dj";
        // }
        // if (!params["biztag"]) {
        //     params["biztag"] = "dj";
        // }
        // if (!params["adtag"]) {
        //     params["adtag"] = "share";
        // }
        // if (!params["full_screen"]) {
        //     params["full_screen"] = "1";
        // }
        //url = "https://app.daoju.qq.com/act/a20230818eleven/index.html?" + $.param(params);
        if (!/tencent-daojucheng:\/\//.test(url)) {
            url = "tencent-daojucheng://webpage?url=" + encodeURIComponent(url);
        }

        // Milo.pop_wxts = function () {
        //     Milo.dtReport('11_5_app_click');
        //     location.href = "https://app.daoju.qq.com/download/index.html?biz=" + params["biz"] + "&app=" + params["biz"] + "&customUrl=" + encodeURIComponent(url)
        // }
        // TGDialogS("pop_wxts");
        Milo.sConfirm("该活动仅能在掌上道聚城APP内参与，<br>确认跳转掌上道聚城APP参与活动吗？", function () {
            //特殊点：地址参数有+号的会变成空格（%20）获取参数时转化一下
            //例  :str=m/OpABqfnjfJAO0RXk5VGhD9TwYP+6bVcBU79CEE4Mh5nUlmLQkvLWAca0A7MH6V
            //变成:str=m/OpABqfnjfJAO0RXk5VGhD9TwYP%206bVcBU79CEE4Mh5nUlmLQkvLWAca0A7MH6V
            //location.href = "https://app.daoju.qq.com/download/index.html?customUrl=" + encodeURI(url);
            //
            location.href = "https://app.daoju.qq.com/download/index.html?biz=" + Milo.aParams.bizCode + "&app=" + Milo.aParams.bizCode + "&customUrl=" + encodeURIComponent(url)
        })
    }
}
//弹框
Milo.sConfirm = function (msg, callback, callback1) {
    Milo.miloAlert({
        message: msg,
        type: 'info',
        title: '提示',
        cancelTitle: '取消',
        confirmTitle: '确认',
        cancelColor: '',
        confirmColor: '',
        isShowCancel: true,
        isHtml: true,
        zIndex: 9999,
        onConfirm() {
            // 点击确认按钮的回调函数
            typeof callback == "function" ? callback() : console.log("no callback")
        },
        onClose() {
            // 点击关闭icon的回调函数
            // 移动端onClose无效
        },
        onCancel() {
            // 点击取消按钮的回调函数
            typeof callback1 == "function" ? callback1() : console.log("no callback1")
        }
    })
}
Milo.sAlert = function (msg, callback) {
    Milo.miloAlert({
        "message": msg,
        "isShowCancel": false,
        "zIndex": 9999,
        "onConfirm": function () {
            typeof callback == "function" ? callback() : console.log("no callback")
        }
    });
}

//分享初始化
Milo.shareInit = function (share) {
    if (typeof HostApp != "undefined") {
        var option = {
            "title": share.title,
            "pic": share.icon,
            "content": share.desc,
            "share_url": share.link,
            "type": '1,2,3,4,5,6'
        };
        HostApp._registerShareInfo = $.param(option);
    } else {
        need("biz.mobileclient", function (mClient) {
            var obj = {
                wx_appid: 'wxf8773b4d31a9a719', //微信公众号appid
                title: share.title,// 分享标题，默认为活动页面标题（可手动调整）
                desc: share.desc, //分享活动简介
                link: share.link, //分享链接
                imgUrl: share.icon //分享后朋友看到的图标
            };
            mClient.shareAll(obj);
        })
    }
}

//王者营地判断
Milo.isSmobaZsApp = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    return /gamehelper/i.test(ua);
}
//加速器判断
Milo.isMocApp = function () {
    var mocappid = milo.cookie.get("mocappid");
    return mocappid == "1106283169";
}
//lolapp掌盟app
Milo.isLoLApp = function () {
    return /lolapp/.test(navigator.userAgent.toLowerCase());
}

//封装一下请求
function doAmsSubmit(obj, isApp = false) {
    var flow_obj = {};
    flow_obj.loading = true;// 开启loading浮层,默认不开启
    flow_obj = $.extend({}, flow_obj, obj);
    flow_obj.actId = Milo.aParams.amsActId;
    //成功事件
    flow_obj.success = function (res) {
        typeof obj.success == "function" ? obj.success(res) : alert(res.sMsg);
    }
    //失败事件
    flow_obj.fail = function (res) {
        if (res.iRet == 101) {
            Milo.tologin();
            return;
        }
        if (res.iRet == "-9998") {
            //取消关闭
            return;
        }
        console.log("=====" + flow_obj.token + "===========sAmsSerial=============" + res.sAmsSerial)
        typeof obj.fail == "function" ? obj.fail(res) : alert(res.sMsg);
    }
    //大区参数
    if (flow_obj.token != "bindinit" && flow_obj.token != "bind") {
        Milo.bindInfo = typeof Milo.bindInfo == "undefined" ? {} : Milo.bindInfo;
        if (typeof Milo.bindInfo.sArea == "undefined") {
            Hx.bindinit();
            return;
        }
        flow_obj.sData = $.extend({}, flow_obj.sData, Milo.bindInfo);
    }
    console.log("======================" + JSON.stringify(flow_obj) + "========================");
    //添加流程锁
    if (obj.flowLock) {
        if (window["flowLock_" + flow_obj.token]) {
            return;
        }
        window["flowLock_" + flow_obj.token] = true;
        setTimeout(function () {
            window["flowLock_" + flow_obj.token] = false;
        }, obj.flowLock)
    }
    Milo.emit(flow_obj);
}

//上报封装
function report(ecContent) {
    var openid = "";
    var sPlatId = "";
    if (Milo.bindInfo && Milo.bindInfo.openid) {
        openid = Milo.bindInfo.openid;
        sPlatId = Milo.bindInfo.sPlatId;
    }
    need('daoju.ping', function (ping) {
        var obj = {
            biz: Milo.aParams.bizCode,
            actid: Milo.aParams.liveActId,
            appid: "1101",
            ec: ecContent,
            openid: openid,
            plat: sPlatId,
            vUrl: location.href
        };
        ping.easReport(obj);
    })
}