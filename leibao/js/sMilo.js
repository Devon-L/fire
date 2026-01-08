//����Ƿ��¼
//��¼

        Milo.mobileLoginByQQConnectAndWX({
            oQQConnectParams: {
                appId: "101491592",
                scope: "get_user_info",
                state: "STATE",
                redirectUri: "https://milo.qq.com/comm-htdocs/login/qc_redirect.html",
                sUrl: '',//��¼֮�����ת��ַ
                callback: null,//��¼�ɹ���Ļص�
                showParams: {}//�Ḳ�ǹ�����showParams
            },
            oWXParams: {
                appId: 'wxb406849bf1dd54fc', //��Ϸ��΢�ŵ�appid��Ĭ��Ϊ��Ѷ��Ϸ���
                gameDomain: 'cf.qq.com', // ΢�ſ���ƽ̨��������ǼǵĻص���
                redirectUri: '', //��Ȩҳ�棬Ĭ��ΪϵͳĬ�ϵ�comm-htdocs/login/milosdk/wx_mobile_redirect.html
                sUrl: '', //��Ȩ�ɹ����ص�ҳ�棬Ĭ��Ϊ��ǰҳ��
                scope: 'snsapi_base', //Ĭ�Ͼ�Ĭ��Ȩ
                lang: 'zh_CN', //���ص��û���Ϣ��ʡ�е����԰汾
                openlink: '', //openlink����������ˣ����ڴ���΢�ŵ�¼��ʱ�򣬻�ӵ���������΢����
            },
        });



    } else {
        // Milo.loginByQQConnect();
        Milo.loginByQQConnectAndWX({
            oQQConnectParams: {
                appId: '101491592',
                scope: 'get_user_info',
                state: 'STATE',
                redirectUri: 'https://milo.qq.com/comm-htdocs/login/qc_redirect.html',
                sUrl: '', //��¼֮�����ת��ַ
            },
            oWXParams: {
                appId: 'wx1a1e2a86da71ea87',//��Ϸ��΢�ŵ�appid��Ĭ��Ϊ��Ѷ��Ϸ���
                gameDomain: 'daoju.qq.com',
                lang: 'zh_CN',//���ص��û���Ϣ��ʡ�е����԰汾
                callback: null,//��¼�ɹ���Ļص�
                showParams: {}//�Ḳ�ǹ�����showParams
            },
        });
    }
}

//ע��
Milo.tologout = function () {
    Milo.logout({
        // �˳��ص�
        callback: function () {
            $("#unlogin-gx").show();
            $("#logined-gx").hide();
            // setTimeout(function () {
            //     location.reload();
            // }, 1000)
        }
    });
    $("#unlogin-gx").show();
    $("#logined-gx").hide();
    setTimeout(function () {
        location.reload();
    }, 1000)
}

//���۳��ж�
Milo.isDJApp = function () {
    var result = milo.cookie.get("djc_appVersion") != null && milo.cookie.get("djc_appVersion") >= 62 || typeof HostApp != "undefined";
    return result;
}

//�ж�ios
Milo.isIOS = function () {
    var u = navigator.userAgent;
    var result = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return result;
}
//�ж��ƻ�
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

//ɾ����ַָ�����������µ�ַ
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
//�Ƿ������ϵ��۳���
Milo.isApp = function (callback, url = location.href) {
    if (Milo.isDJApp()) {
        typeof callback == "function" ? callback() : console.log("no callback function")
    } else {
        //վ��ӻ������ҳ�Ĵ����ǲ��������⣬û�д�biz��Ϣ����������ҳ���ǰ���ҵ��biz����ʾ��
        // 3.������ҳ����APP�����Ӳ��ԣ���Ҫ����ȫ��������adtag����
        // ��������ӣ�
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
        Milo.sConfirm("�û���������ϵ��۳�APP�ڲ��룬<br>ȷ����ת���ϵ��۳�APP������", function () {
            //����㣺��ַ������+�ŵĻ��ɿո�%20����ȡ����ʱת��һ��
            //��  :str=m/OpABqfnjfJAO0RXk5VGhD9TwYP+6bVcBU79CEE4Mh5nUlmLQkvLWAca0A7MH6V
            //���:str=m/OpABqfnjfJAO0RXk5VGhD9TwYP%206bVcBU79CEE4Mh5nUlmLQkvLWAca0A7MH6V
            //location.href = "https://app.daoju.qq.com/download/index.html?customUrl=" + encodeURI(url);
            //
            location.href = "https://app.daoju.qq.com/download/index.html?biz=" + Milo.aParams.bizCode + "&app=" + Milo.aParams.bizCode + "&customUrl=" + encodeURIComponent(url)
        })
    }
}
//����
Milo.sConfirm = function (msg, callback, callback1) {
    Milo.miloAlert({
        message: msg,
        type: 'info',
        title: '��ʾ',
        cancelTitle: 'ȡ��',
        confirmTitle: 'ȷ��',
        cancelColor: '',
        confirmColor: '',
        isShowCancel: true,
        isHtml: true,
        zIndex: 9999,
        onConfirm() {
            // ���ȷ�ϰ�ť�Ļص�����
            typeof callback == "function" ? callback() : console.log("no callback")
        },
        onClose() {
            // ����ر�icon�Ļص�����
            // �ƶ���onClose��Ч
        },
        onCancel() {
            // ���ȡ����ť�Ļص�����
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

//������ʼ��
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
                wx_appid: 'wxf8773b4d31a9a719', //΢�Ź��ں�appid
                title: share.title,// �������⣬Ĭ��Ϊ�ҳ����⣨���ֶ�������
                desc: share.desc, //��������
                link: share.link, //��������
                imgUrl: share.icon //���������ѿ�����ͼ��
            };
            mClient.shareAll(obj);
        })
    }
}

//����Ӫ���ж�
Milo.isSmobaZsApp = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    return /gamehelper/i.test(ua);
}
//�������ж�
Milo.isMocApp = function () {
    var mocappid = milo.cookie.get("mocappid");
    return mocappid == "1106283169";
}
//lolapp����app
Milo.isLoLApp = function () {
    return /lolapp/.test(navigator.userAgent.toLowerCase());
}

//��װһ������
function doAmsSubmit(obj, isApp = false) {
    var flow_obj = {};
    flow_obj = $.extend({}, flow_obj, obj);
    flow_obj.actId = Milo.aParams.amsActId;
    //�ɹ��¼�
    flow_obj.success = function (res) {
        typeof obj.success == "function" ? obj.success(res) : alert(res.sMsg);
    }
    //ʧ���¼�
    flow_obj.fail = function (res) {
        if (res.iRet == 101) {
            Milo.tologin();
            return;
        }
        if (res.iRet == "-9998") {
            //ȡ���ر�
            return;
        }
        console.log("=====" + flow_obj.token + "===========sAmsSerial=============" + res.sAmsSerial)
        typeof obj.fail == "function" ? obj.fail(res) : alert(res.sMsg);
    }
    //��������
    if (flow_obj.token != "bindinit" && flow_obj.token != "bind") {
        Milo.bindInfo = typeof Milo.bindInfo == "undefined" ? {} : Milo.bindInfo;
        if (typeof Milo.bindInfo.sArea == "undefined") {
            Hx.bindinit();
            return;
        }
        flow_obj.sData = $.extend({}, flow_obj.sData, Milo.bindInfo);
    }

    if (milo.request('algorithm') == 'itop') {
        //��Ϸ�ڵ�¼̬
        var params = {
            algorithm: milo.request("algorithm"),
            encode: milo.request("encode"),
            channelid: milo.request("channelid"),
            gameid: milo.request("gameid"),
            os: milo.request("os"),
            ts: milo.request("ts"),
            version: milo.request("version"),
            sig: milo.request("sig"),
            itopencodeparam: milo.request("itopencodeparam"),
        }
        Object.assign(flow_obj.sData, params);
        flow_obj.sData.ams_targetappid = 'wx79db870bffc454f4';
    } else {
        // �� ams_targetappid
        if (milo.cookie.get("acctype") == "wx") {
            flow_obj.sData.ams_targetappid = 'wx79db870bffc454f4';
        }
    }
    //idip���Է�����
    flow_obj.sData.useItopPrdEnv = Milo.aParams.useItopPrdEnv;

    console.log("======================" + JSON.stringify(flow_obj) + "========================");
    //����������
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

//�ϱ���װ
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