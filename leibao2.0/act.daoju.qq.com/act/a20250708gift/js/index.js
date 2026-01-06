<!-- sync test -->
milo.ready(function () {
    Milo.aParams = {
        amsActId: "752405",
        hsActId: "42261",
        bizCode: "cf",
        urlimg: "https://game.gtimg.cn/images/actdaoju/act/a20250708gift/",
        lotUrl1: "https://game.gtimg.cn/images/actdaoju/act/a20250708gift/lot/lota",//�齱չʾͼ1-��̬����
        lotUrl2: "https://game.gtimg.cn/images/actdaoju/act/a20250708gift/lot/lotb",//�齱չʾͼ2-�̶�����
        share: {
            title: '�ױ����ߣ�ȫ���׷�',
            desc: 'AK47-�ױ����ߣ�USP-�ױ����ߣ���������',
            link: "https://app.daoju.qq.com/act/a20250708gift/index.html",
            icon: "https://game.gtimg.cn/images/actdaoju/act/a20250708gift/share.jpg",
            content: 'AK47-�ױ����ߣ�USP-�ױ����ߣ���������',
            pic: "https://game.gtimg.cn/images/actdaoju/act/a20250708gift/share.jpg",
            shareUrl: "https://app.daoju.qq.com/act/a20250708gift/index.html",
        },
        lotteryMap: {
            "6704948": { "imgNum": "1", "name": "ӥ", "show": "1" },
            "6704952": { "imgNum": "2", "name": "AK47-�ױ�����", "show": "2" },
            "6704980": { "imgNum": "3", "name": "USP-�ױ�����", "show": "3" },
            "6704981": { "imgNum": "4", "name": "����-��", "show": "4" },
            "6704982": { "imgNum": "5", "name": "˹̩��-����", "show": "5" },
            "6704983": { "imgNum": "6", "name": "ն��-�ױ�����", "show": "6" },
            "6704984": { "imgNum": "7", "name": "���㱦��", "show": "7" },
            "6705052": { "imgNum": "8", "name": "�߱�����-�ױ�����", "show": "8" },
            "6705053": { "imgNum": "9", "name": "������-�ױ�����", "show": "9" },
            "6705055": { "imgNum": "10", "name": "���ⵯ-�ױ�����", "show": "10" },
            "6705056": { "imgNum": "11", "name": "����֮ʯx1", "show": "0" },
            "6705062": { "imgNum": "12", "name": "����x100", "show": "0" },
            "6705063": { "imgNum": "13", "name": "����x15", "show": "0" },
            "6705064": { "imgNum": "14", "name": "����x9", "show": "0" },
            "6705065": { "imgNum": "15", "name": "����x8", "show": "0" },
            "6705066": { "imgNum": "16", "name": "����x7", "show": "0" }
        }
    }
    //alert = Milo.sAlert;
    //confirm = Milo.sConfirm;
    //�޸ĵ���
    window.alert = function (msg, callback) {
        if (msg == "ok" || msg == "ȡ���ر�") {
            return;
        }
        $("#text7 .fc_box4 p").html(msg);
        window.alert_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#text7 .fc_btnqd2").attr("href", "javascript: window.alert_call();");
        TGDialogS('text7');
    }

    window.confirm = function (msg, callback) {
        $("#text8 .fc_box4 p").html(msg);
        window.confirm_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#text8 .fc_btnqd1").attr("href", "javascript: window.confirm_call();");
        TGDialogS('text8');
    }

    window.confirm_dt = function (msg, callback, ishow = 5) {
        $("#text6 .fc_box4 p").html(msg);
        window.confirm_dt_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }

        $("#text6 .fc_txt4").html("����ʱ��" + ishow);
        $("#text6 .fc_btnqd1").addClass("gray");
        $("#text6 .fc_btnqd1").attr("href", "javascript: void(0);");
        if (Milo.aParams.interval) {
            clearInterval(Milo.aParams.interval);
        }
        // ÿ����µ���ʱ
        Milo.aParams.interval = setInterval(() => {
            ishow--;
            $("#text6 .fc_txt4").html("����ʱ��" + ishow);
            // ����ʱ����
            if (ishow === 0) {
                $("#text6 .fc_btnqd1").removeClass("gray");
                clearInterval(Milo.aParams.interval);
                $("#text6 .fc_btnqd1").attr("href", "javascript: window.confirm_dt_call();");
            }
        }, 1000);
        TGDialogS('text6');
    }

    Milo.bindInfo = {};
    if (Milo.isMobile() && location.hostname == "act.daoju.qq.com" && milo.request("test") != 1) {
        location.href = "https://app.daoju.qq.com/act/a20250708gift/index.html";
    }
    if (!Milo.isMobile() && location.hostname == "app.daoju.qq.com" && milo.request("test") != 1) {
        location.href = "index.html";
    }
    if (Milo.isDJApp() && milo.request("plat_support") != "all") {
        location.href = "https://app.daoju.qq.com/act/a20250708gift/index.html?plat_support=all";
    }

    if (Milo.isMobile()) {
        Milo.shareInit(Milo.aParams.share);
        if (!Milo.isDJApp()) {
            $('#J_shareBtn').hide();
            $('#J_shareTitle').css("display", "block")
        }
    }

    Milo.dologin(function () {
        $("#login_qq_span").html(Milo.userInfo.nickName);
        $("#userinfo").html(Milo.userInfo.nickName);
        if (Milo.isDJApp()) {
            $("#ptLogoutBtn,#btn_logout,#dologout").hide();
        }
        Hx.bindinit();
    })
    need(["ams.daoju_buy_v2.appid"], function (autoappid) {
        autoappid.init(Milo.aParams.bizCode, Milo.aParams.hsActId, function (final_appid) {
            console.log(final_appid)
        });
    })

    // Milo.showVConsole();

    queryBroadcast();
})

var Hx = {
    //��ѯ�Ƿ�󶨵�����
    bindinit: function () {
        doAmsSubmit({
            token: 'bindinit',
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                query: true,
                ams_targetappid: 'wx79db870bffc454f4', //�й�ת����Ŀ��appid(һ��Ϊ��Ϸ��΢��appid)
            },
            openToOpen: { //openidת����ز�����gopenid��ز���,����ο�����˵��
                sAMSTrusteeship: 1, //����Ƿ���Ҫ��΢��/QQ�й�,Ĭ��Ϊ0(1:��΢��/QQ�й�,0:����΢��/QQ�й�)
                ams_targetappid_qc: '1112358227', //�й�ת����Ŀ��appid(һ��Ϊ��Ϸ�Ļ�����¼appid)
                ams_targetappid_wx: 'wx79db870bffc454f4', //�й�ת����Ŀ��appid(һ��Ϊ��Ϸ��΢��appid)
                oGopenidParams: {
                    needGopenid: 1,
                    isPreengage: 0
                },
            },
            success: function (res) {
                //������Ƕ��ת
                if (milo.request('neiqian') == 1 && top.location == location && milo.request('debug') != 1 && milo.request('gc') != 1) {
                    var curHtmlUrl = window.location.href;
                    if (curHtmlUrl.indexOf("hdnq.html") >= 0) { } else {
                        window.location.href = "https://cf.qq.com/act/a20160516ntclsacts/new_index.htm";
                    }
                }
                // //�Ѱ�ʱ����չ����
                if (res.details.jData.bindarea) {
                    if (milo.request("area")) {
                        if (res.details.jData.bindarea.Farea == milo.request("area")) {
                            Hx.bindcall(res.details.jData.bindarea);
                        } else {
                            Hx.bind();
                        }
                    } else {
                        Hx.bindcall(res.details.jData.bindarea);
                    }
                } else {
                    Hx.bind();
                }
            }
        });
    },
    //�ύ�󶨵�����
    bind: function () {
        Milo.dologin(function () {
            var opt = {
                gameId: Milo.aParams.bizCode,
                actId: Milo.aParams.amsActId, // ���߻�ţ�ÿ�λ������Ҫ�޸�
                token: "bind", // �������̱���, ÿ�λ������Ҫ�޸�
                useItopPrdEnv: Milo.aParams.useItopPrdEnv
            };
            AUTO_BIND.autoBindArea(opt, function (res) {
                console.log("====autoBindArea===", res);
                location.reload();
            });
        })

    },
    bindcall: function (data) {
        Milo.bindInfo = {
            sArea: data.Farea,
            sRole: data.FroleId
        };
        var iRoleName = decodeURIComponent(decodeURIComponent(data.FareaName)) + "-" + decodeURIComponent(decodeURIComponent(data.FroleName));
        Hx.originRoleName = decodeURIComponent(decodeURIComponent(data.FroleName));
        Hx.iRoleName = iRoleName;
        Hx.FareaName = decodeURIComponent(decodeURIComponent(data.FareaName));
        Hx.FroleName = decodeURIComponent(decodeURIComponent(data.FroleName));
        $("#milo-roleName").html(iRoleName);
        $("#milo-binded").show();
        $("#milo-unbind").hide();
        $("#unlogin").hide();
        $("#logined").show();
        if (Milo.get("text23_" + Milo.bindInfo.sRole) == "text23") {
            $(".bxcheck a").addClass("cur");
        } else {
            $(".bxcheck a").removeClass("cur");
        }
        Hx.init();
        Hx.recommendSearch();
        Hx.getGroupInfo();
        Hx.showVconsole();
    },
    //չʾvonsole
    showVconsole() {
        //�������û���ʱvconsole
        var sWhiteList = [
            "1557887506"
        ];
        if ($.inArray(Hx.uin, sWhiteList) != -1) {
            Milo.showVConsole();
        }
    },
    binded: function (callback) {
        if (typeof Milo.bindInfo.sArea == "undefined") {
            Hx.bind();
            return;
        }
        $.isFunction(callback) && callback();
    },
    //����ȯ��¼0.
    pop1: function () {
        Hx.binded(function () {
            if (location.hostname == "act.daoju.qq.com") {
                var url = "https://act.daoju.qq.com/act/a20190301yqrh/pop.html?sorce=pc&amp;type=all"
                if (milo.request("neiqian") == 1) {
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
                    url += "&" + $.param(params);
                }
                $("#text1 .iframe").html('<iframe class="iframe1" frameborder="0" height="800px" src="' + url + '" width="810px"></iframe>');
                TGDialogS("text1");
            } else {
                var url = "https://app.daoju.qq.com/act/a20190301yqrh/pop.html?plat_support=all&amp;type=all";
                location.href = url;
            }
        })
    },
    //��ʼ����ѯ
    init: function (callback) {
        doAmsSubmit({
            flowLock: 500,
            token: 'init',
            success: function (res) {
                console.log(res.details.jData)
                var jData = res.details.jData;
                var jfarr = jData.jf_arr;
                var holdarr = jData.hold_arr;
                Hx.boxNums = jData.boxNums;
                //Կ������
                Hx.jf_7332 = parseInt(jfarr[7332]['ticket']);
                $(".jf_7332").html(Hx.jf_7332);
                //��������
                Hx.jf_7340 = parseInt(jfarr[7340]['ticket']);
                $(".jf_7340").html(Hx.jf_7340);
                //����ȯ
                Hx.jf_2327 = parseInt(jData['jf_2327']);
                $(".jf_2327").html(Hx.jf_2327);
                //��������
                if (parseInt(jfarr[7341]['ticket']) > 0) {
                    $("#btnFeedBack").attr("href", "javascript:TGDialogS('text4');");
                }
                if (holdarr["fk_tj"]["iUsedNum"] == 1) {
                    $("#btnFeedBack").attr("href", "javascript:alert('�ѷ�������');").addClass("gray");
                }
                if (holdarr["fk_lq"]["iUsedNum"] == 1) {
                    $("#btnFeedBacklq").addClass("gray");
                }

                //�ֽ�fjMap
                Hx.fjMap = jData.fjMap;
                //���ֶһ�map
                Hx.dhMap = jData.dhMap;
                //ƴ�Ż���
                Hx.groupJFNum = parseInt(jData.groupJFNum);

                //��г�ȡ
                if (parseInt(Hx.boxNums[7397]['ticket']) > 0) {
                    Hx.getGiftBox();
                }

                //ä�г�ȡ
                if (parseInt(Hx.boxNums[7398]['ticket']) > 0) {
                    Hx.getBlindBox();
                }

                $.isFunction(callback) && callback();
            },
            fail: function (res) {

            }
        })
    },
    buyKey: function (propid, dikou) {
        // 支持三种传参场景：
        // 1. buyKey(propid, dikou, num)
        // 2. buyKey(propid, num)  （num 作为第二个参数）
        // 3. buyKey('10') 或 buyKey('buy10') （通过 propid 或 dikou 解析数量）
        var num = 1;
        // 优先使用第三个参数（若为数字）
        if (arguments.length >= 3 && typeof arguments[2] === 'number') {
            num = arguments[2];
        } else if (typeof dikou === 'number') {
            num = dikou;
        } else if (typeof dikou === 'string' && /^\d+$/.test(dikou)) {
            num = parseInt(dikou, 10);
        } else if (typeof propid === 'string' && /^\d+$/.test(propid)) {
            num = parseInt(propid, 10);
        }
        // 支持常见标识映射
        var map = { 'buy1':1, 'buy10':10, 'buy50':50, 'buy100':100, 'buy500':500 };
        if (typeof propid === 'string' && map[propid]) {
            num = map[propid];
        }
        // 限制合理范围并向下取整
        num = Math.max(1, Math.floor(Number(num) || 1));

        window._local = window._local || {};
        window._local.keys = typeof window._local.keys === 'number' ? window._local.keys : 10;
        window._local.points = typeof window._local.points === 'number' ? window._local.points : 100;
        window._local.vouchers = typeof window._local.vouchers === 'number' ? window._local.vouchers : 5;
        // 增加次数
        window._local.keys += num;
        try { $(".jf_7332").html(window._local.keys); } catch (e) {}
        console.log('[本地模拟] buyKey', propid, 'num=', num, 'keys=', window._local.keys);
        alert('本地模拟：购买成功，次数+' + num + '，当前次数：' + window._local.keys);
    },

    // 便捷购买：支持一次购买 1、10、100、500 次数，调用 buyKey 的第三个参数
    buyKeys: function(amount) {
        amount = parseInt(amount) || 1;
        Hx.buyKey(null, null, amount);
    },
    buyKey1: function(){ Hx.buyKeys(1); },
    buyKey10: function(){ Hx.buyKeys(10); },
    buyKey100: function(){ Hx.buyKeys(100); },
    buyKey500: function(){ Hx.buyKeys(500); },

    // 本地抽奖实现：直接从 Milo.aParams.lotteryMap 随机抽取
    lottery: function (num) {
        num = num || 1;
        // 从页面或全局 _local 读取次数
        var keys = 0;
        try { keys = parseInt($(".jf_7332").text()) || 0; } catch (e) { keys = (window._local && window._local.keys) || 0; }
        window._local = window._local || {};
        window._local.keys = typeof window._local.keys === 'number' ? window._local.keys : keys || 10;

        if (window._local.keys < num) {
            alert('次数不足');
            return;
        }
        window._local.keys -= num;
        try { $(".jf_7332").html(window._local.keys); } catch (e) {}

        var map = (typeof Milo !== 'undefined' && Milo.aParams && Milo.aParams.lotteryMap) ? Milo.aParams.lotteryMap : (window._local.lotteryMap || {});
        var ids = Object.keys(map);
        if (!ids || ids.length === 0) {
            alert('无可用奖池数据');
            return;
        }
        var arr = [];
        for (var i = 0; i < num; i++) {
            var randId = ids[Math.floor(Math.random() * ids.length)];
            var item = map[randId] || {};
            arr.push({ id: randId, name: item.name || ('物品' + randId), imgNum: item.imgNum || '1', show: item.show || '0', class: item.class, nTotalInALL: item.nTotalInALL || 0 });
        }
        Hx.show_dj = { dj_arr: arr.slice(), big_arr: arr.filter(function (v) { return v.show != '0'; }), count: num };
        try { Hx.showLottery(); } catch (e) { console.error('本地抽奖展示失败', e); }
    },
    show_dj: {
        "dj_arr": [],
        "big_arr": []
    },
    // 将原服务端 lottery 重命名并禁用，避免覆盖本地实现并向后端发起请求
    lottery_server: function (num) {
        console.log('本地模式：已禁用服务器端抽奖。参数 num=', num);
        // 如果希望调用本地实现，可显式调用 Hx._local_lottery 或 Hx.lottery
        // 例如：Hx.lottery(num);
    },
    pcShowImg: function (iPackageId, nTotalInALL) {
        Hx.show_dj.big_arr = [{
            name: Milo.aParams.lotteryMap[iPackageId]["name"],
            imgNum: Milo.aParams.lotteryMap[iPackageId]["imgNum"],
            show: Milo.aParams.lotteryMap[iPackageId]["show"],
            class: Milo.aParams.lotteryMap[iPackageId]["class"],
            nTotalInALL: nTotalInALL
        }];
        Hx.showLottery(1);
    },
    pcSaveImg: function () {
        alert("��Ǹ������ʧ�ܣ����ֶ���ͼ���档");
    },
    djcAppShare: function () {
        alert("��Ǹ������ʧ�ܣ������н�ͼ������");
    },
    showLottery: function (iCan) {
        console.log(Hx.show_dj);
        //1.չʾ��
        if ($(".bxcheck a").hasClass("cur") && iCan != 1) {
            Hx.show_dj.big_arr = [];
        }
        var big_arr = Hx.show_dj.big_arr;
        $("#lotterybig img").attr("src", "");
        if (big_arr.length > 0) {

            var djimg = Milo.aParams.lotUrl1 + big_arr[0]["imgNum"] + '.png';
            $("#lotterybig img").attr("src", djimg);
            $("#lotterybig a.diablck").attr("href", "javascript: Hx.showLottery();");
            var label_num = 0;
            var nTotalInALL = big_arr[0]["nTotalInALL"];
            if (nTotalInALL >= 51) {
                label_num = 4;
            } else if (nTotalInALL >= 20) {
                label_num = 3;
            } else if (nTotalInALL >= 2) {
                label_num = 2;
            } else if (nTotalInALL == 1) {
                label_num = 1;
            }
            var ewm_img = Milo.aParams.urlimg + "lot/ewm.png";
            var label_img = Milo.aParams.urlimg + "lot/label" + label_num + ".png";
            var textParts = [{
                text: "�ۼƳ�ȡ",
                color: "#251e1e",
                line: 0,
                font: "36px Arial"
            },
            {
                text: nTotalInALL,
                color: "#FF6600",
                line: 0,
                font: "36px Arial"
            },
            {
                text: "�λ��",
                color: "#251e1e",
                line: 0,
                font: "36px Arial"
            },
            {
                text: Hx.FareaName + " " + Hx.FroleName,
                color: "#251e1e",
                line: 1,
                font: "24px Arial"
            }
            ];
            if (label_num == 4) {
                textParts = [{
                    text: Hx.FareaName + " " + Hx.FroleName,
                    color: "#251e1e",
                    line: 1,
                    font: "24px Arial"
                }];
            }
            var lot_img_txt = Milo.aParams.lotUrl2 + big_arr[0]["imgNum"] + '.png?t=' + Date.now(); // ��ʱ������⻺��;
            if (location.hostname == "act.daoju.qq.com") {
                Hx.pcSaveImg = function () {
                    saveImageWithText(djimg, ewm_img, label_img, textParts)
                }
                Hx.pc_qqZoneShare = function (djName, imgName) {
                    $("#_overlay_")[0].style.setProperty('z-index', '798', 'important');
                    $("#lotterybig")[0].style.setProperty('z-index', '799', 'important');
                    need("biz.qzoneShare", function (share) {
                        share.share({
                            // url: dmdv.sMyShareStr, //��������[��ѡ��������ȡҳ��url]
                            title: Milo.aParams.share.title,
                            desc: "���ڡ�" + Milo.aParams.share.title + "���鵽��" + djName + "��Ҫ���ȱȿ�˭������������",
                            pics: imgName,
                            summary: Milo.aParams.share.title,
                            showcount: '0', //1Ĭ����ʾ  0����ʾ
                            md: '1', //1Ĭ�ϲ���������  0��������
                            callback: function (shareId) {
                                alert("�����ɹ���");
                            }
                        });
                    });
                }
                $("#lotterybig .imgshow").attr("href", "javascript:Hx.pc_qqZoneShare('" + big_arr[0]["name"] + "','" + lot_img_txt + "')");
                $("#lotterybig .imgsave").attr("href", "javascript:Hx.pcSaveImg();");


                if (milo.request('neiqian') == 1) {
                    $("#lotterybig img").attr("src", lot_img_txt);
                    $("#lotterybig .fcbtn_box4").hide();
                }
            }
            if (location.hostname == "app.daoju.qq.com") {
                var result = milo.cookie.get("djc_appVersion") != null && milo.cookie.get("djc_appVersion") >= 170;
                if (!result) {
                    $("#lotterybig img").attr("src", lot_img_txt);
                    $("#lotterybig .fcbtn_box4").hide();
                } else {
                    Hx.djcAppShare = function () {
                        if (!result) {
                            alert("�����Ͻǹ��ܰ�ť���ɷ���ͼ����ҫ���ŷ��ʱ�̰�");
                            return;
                        }
                        if (label_num == 4) {
                            lotDescText = "";
                        } else {
                            lotDescText = "<div style=\"color: #251e1e; font-size: 36px;\">�ۼƳ�ȡ<span style=\"color: #FF6600; font-weight: bold;\">" + nTotalInALL + "</span>�λ��</div>";
                        }
                        var option = {
                            codeUrl: "https://app.daoju.qq.com/act/a20251224cfactivity/index.html?plat_support=all", //  ��ά���ַ
                            labelUrl: label_img, // ��ǩ��ַ
                            lotDescText: lotDescText, //�ı���Ϣ����
                            userInfoText: "<div style=\"color: #251e1e; font-size: 24px;\">" + Hx.FareaName + " " + Hx.FroleName + "</div>",
                            lotImgUrl: djimg, // �н��󱳾�ͼ��ַ
                            qrSize: 100 ////��ά���СqrSize��������150��û���������Ĭ��Ϊ150
                        };

                        console.log(option);
                        HostApp.setJsCallBack('picShare', $.param(option), function (msg) {
                            $.isFunction(call) && call(msg);
                        });
                    }
                    $("#lotterybig .imgshow").attr("href", "javascript:Hx.djcAppShare();");
                    $("#lotterybig .imgsave").hide();
                }
            }


            TGDialogS('lotterybig');

            Hx.show_dj.big_arr.shift();
            return;
        }
        //2.չʾ����
        if (Hx.show_dj.dj_arr.length > 0) {
            var dj_arr = Hx.show_dj.dj_arr;
            if (dj_arr.length == 1) {
                $("#lottery1 .lot1").html("");
                $.each(dj_arr, function (k, v) {
                    var _html = '<li>\
                                        <img src="//game.gtimg.cn/images/actdaoju/act/a20250708gift/lot/lot' + v["imgNum"] + '.png" alt="">\
                                </li>';
                    $("#lottery1 .lot1").append(_html);
                })
                $("#lottery1 a").attr("href", "javascript: Hx.showLottery();");
                TGDialogS("lottery1");
                Hx.show_dj.dj_arr = [];
            } else {
                $("#lottery10 .lot10").html("");
                $.each(dj_arr, function (k, v) {
                    var _html = '<li>\
                                        <img src="//game.gtimg.cn/images/actdaoju/act/a20250708gift/lot/lot' + v["imgNum"] + '.png" alt="">\
                                </li>';
                    $("#lottery10 .lot10").append(_html);
                })
                $("#lottery10 a").attr("href", "javascript: Hx.showLottery();");
                TGDialogS("lottery10");
                Hx.show_dj.dj_arr = [];
            }
            return;
        }
        //3.չʾ��ر�
        closeDialog();
        Hx.init(1);
    },
    //�齱��¼
    gift: function (page, id) {
        if (page == "0") {
            return;
        }
        doAmsSubmit({
            token: "gift",
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                pageNow: page,
                pageSize: 6,
                str: "gift",
                sid: id
            },
            success: function (res) {
                console.log(res);
                var lottery = res.details.jData.lottery;
                $('.giftBox').removeClass("cur");
                $('#giftBox_' + id).addClass("cur");
                $('.fc_box2').hide();
                $('#fc_box2_' + id).show();
                $("#getGiftContent1_" + id).html("");
                // �ж��û��Ƿ���Ҫ�Զ���ṹ������Ҫ��Ĭ��ȡ�û��Լ�����Ľṹ
                var idStr = id == 1 ? "#getGiftTemplate3" : "#getGiftTemplate1";
                if ($(idStr).length > 0) {
                    let tpl_html = $(idStr).html();
                    // ��Ⱦ����
                    const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                    $("#getGiftContent1_" + id).html(_html);
                }
                var pageTotal = parseInt(lottery.result.pageTotal);//��ҳ��
                var pageNow = parseInt(lottery.result.pageNow);//��ҳ��
                Hx.nowPage = page;
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//��һҳ
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//��һҳ
                $("#text3 .now_page").html(pageNow + "/" + pageTotal);
                // $("#text3 .now_page").html(pageNow);
                // $("#text3 .total_page").html(pageTotal);
                $("#text3 .btn_prev").attr("href", "javascript:Hx.gift(" + pre + ", " + id + ");");
                $("#text3 .btn_next").attr("href", "javascript:Hx.gift(" + next + ", " + id + ");");

                TGDialogS("text3");
            }
        })
    },
    //�ݴ���
    zcx: function (page) {
        if (page == "0") {
            return;
        }
        doAmsSubmit({
            token: "gift",
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                pageNow: page,
                pageSize: 6,
                str: "zcx",
            },
            success: function (res) {
                console.log(res);
                var lottery = res.details.jData.lottery;
                $("#getGiftContent2").html("");
                // �ж��û��Ƿ���Ҫ�Զ���ṹ������Ҫ��Ĭ��ȡ�û��Լ�����Ľṹ
                if ($("#getGiftTemplate2").length > 0) {
                    let tpl_html = $("#getGiftTemplate2").html();
                    // ��Ⱦ����
                    const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                    $("#getGiftContent2").html(_html);
                }
                var pageTotal = parseInt(lottery.result.pageTotal);//��ҳ��
                var pageNow = parseInt(lottery.result.pageNow);//��ҳ��
                Hx.pageNow = pageNow
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//��һҳ
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//��һҳ
                $("#text2 .now_page").html(pageNow + "/" + pageTotal);
                // $("#showMyGiftContent2 .total_page").html(pageTotal);
                // $("#showMyGiftContent2 .now_page").html(pageNow);
                $("#text2 .btn_prev").attr("href", "javascript:Hx.zcx(" + pre + ");");
                $("#text2 .btn_next").attr("href", "javascript:Hx.zcx(" + next + ");");
                TGDialogS("text2");
            }
        })
    },
    //�ݴ�����ȡ
    zcxlq: function (sid, name, item) {
        confirm("������ȡ���������棬�޷����أ���ȷ���Ƿ����", function () {
            var msg = '��ȷ����ȡ��' + name + '������' + Hx.FareaName + '���µġ�' + Hx.FroleName + '����';
            msg += '<a href="javascript:closeDialog();Hx.bind();" >�л�����</a>';
            confirm_dt(msg, function () {
                doAmsSubmit({
                    token: "zcxlq",
                    sData: {
                        sid: sid
                    },
                    success: function (res) {
                        console.log(res);
                        var jData = res.details.jData;
                        alert(res.sMsg, function () {
                            // var page = $("#showMyGiftContent2 .now_page").attr("now_page");
                            Hx.zcx(Hx.pageNow);
                        });
                    }
                })
            }, 2)
        })
    },
    //�ݴ���ֽ�
    zcxfj: function (sid, name, item) {
        confirm("���ηֽ���������棬�޷����أ���ȷ���Ƿ����", function () {
            var msg = '��ȷ���ֽ⡾' + name + '����á��齱Կ�ס�' + Hx.fjMap[item]["jfNum"] + '����';
            confirm_dt(msg, function () {
                doAmsSubmit({
                    token: "zcxfj",
                    sData: {
                        sid: sid
                    },
                    success: function (res) {
                        console.log(res);
                        var jData = res.details.jData;
                        var num = jData.lottery.result.iPackageId.split(":")[1];
                        num = num > 1 ? num : 1;
                        alert("��ϲ��ó齱Կ�ס�" + num, function () {
                            // var page = $("#showMyGiftContent2 .now_page").attr("now_page");
                            Hx.zcx(Hx.pageNow);
                            Hx.init();
                        });
                    }
                })
            }, 2)
        })
    },
    //���ֶһ�
    dhjf: function (item) {
        Milo.dologin(function () {
            var jf = $(".jf_7340").html();
            if (jf < Hx.dhMap[item]["jfNum"]) {
                alert("��Ǹ�����ֲ��㡣");
                return;
            }
            confirm("���ζһ����������棬�޷����أ���ȷ���Ƿ����", function () {
                var msg = '��ȷ��ʹ�á����֡�' + Hx.dhMap[item]["jfNum"] + '���һ���' + Hx.dhMap[item]["name"] + '������' + Hx.FareaName + '���µġ�' + Hx.FroleName + '����';
                msg += '<a href="javascript:closeDialog();Hx.bind();" >�л�����</a>';
                confirm_dt(msg, function () {
                    doAmsSubmit({
                        token: "dhjf",
                        sData: {
                            item: item
                        },
                        success: function (res) {
                            var jData = res.details.jData;
                            alert(res.sMsg);
                            Hx.init();
                        }
                    })
                }, 2)
            })

        });
    },
    //�����ǳ�
    copy_nick: function () {
        Milo.dologin(function () {
            var nick = Hx.originRoleName;
            let dummyTextArea = document.createElement('textarea');
            dummyTextArea.value = nick;
            document.body.appendChild(dummyTextArea);
            dummyTextArea.select();
            if (document.execCommand("copy")) {
                alert('�Ѹ��ƺã���ճ��');
            } else {
                alert('���ֶ����Ƶ�������')
            }
            document.body.removeChild(dummyTextArea);
        });
    },
    //����
    copy_code: function () {
        if ($('#groupId').val() != "") {
            // $('#groupId').val("#�ױ�������װ-" + $('#groupId').val());
            let text = "#�ױ�������װ-" + $('#groupId').val();
            let dummyTextArea = document.createElement('textarea');
            dummyTextArea.value = text;
            document.body.appendChild(dummyTextArea);
            dummyTextArea.select();
            // var my_code = document.getElementById('groupId');
            // my_code.select();
            if (document.execCommand("copy")) {
                alert('�Ѹ��ƺã���ճ��');
            } else {
                alert('���ֶ����Ƶ�������')
            }
            document.body.removeChild(dummyTextArea);
        } else {
            alert("��Ǹ�����ȷ�������ƴ�Ż�ȡƴ��ID");
        }
    },
    getGroupInfo: function () {
        Milo.dologin(function () {
            doAmsSubmit({
                token: "groupinfo",
                sData: {},
                success: function (res) {
                    console.log("getGroupInfo", res);
                    var jData = res.details.jData;
                    Hx.groupInfo = jData.showData;
                    //ƴ������
                    //Ŀǰ������ID����
                    Hx.groupId = Hx.groupInfo.sTeamId
                    $("#groupId").val(Hx.groupInfo.sTeamId);
                    //Ŀǰ�����Ž���ʱ��
                    $("#nowGroupTime").html(Hx.groupInfo.dtAddTime);
                    //Ŀǰ��Ա
                    $("#groupMemberList").html("");
                    var all_html = "";
                    for (var i = 1; i <= 6; i++) {
                        if (Hx.groupInfo.list[i] == undefined) continue;
                        all_html += '<tr>\
                                        <td>' + Hx.groupInfo.list[i].sOpenid + '</td>\
                                        <td>' + Hx.groupInfo.list[i].sRoleName + '</td>\
                                        <td>' + Hx.groupInfo.list[i].sPackageName + '</td>\
                                    </tr>';
                    }
                    $("#groupMemberList").html(all_html);
                    //�����Լ���õ����
                    $("#myGroupGift").html(Hx.groupInfo.myGiftName);
                    //�����ȡ��ť�û�
                    if (jData.hold == 1) {
                        $("#getGroupGiftBtn").addClass("gray");
                    } else {
                        $("#getGroupGiftBtn").removeClass("gray");
                    }

                },
                fail: function (res) {
                    console.log("getGroupInfo", res);
                }
            });
        });
    },
    createGroup: function () {
        Milo.dologin(function () {
            var jf = $(".jf_7340").html();
            if (jf < Hx.groupJFNum) {
                alert("��Ǹ�����ֲ��㡣");
                return;
            }
            confirm("���η���ƴ�Ų��������棬�޷����أ���ȷ���Ƿ����", function () {
                var msg = '��ȷ��ʹ�á����֡�' + Hx.groupJFNum + '������ƴ����';
                confirm_dt(msg, function () {
                    doAmsSubmit({
                        token: "creategroup",
                        sData: {},
                        success: function (res) {
                            var jData = res.details.jData;
                            alert(res.sMsg);
                            Hx.init();
                            Hx.recommendSearch();
                            Hx.getGroupInfo();
                        },
                        // fail: function (res) {
                        //     console.log("createGroup", res);
                        // }
                    })
                }, 2)
            })

        });
    },
    joinGroup: function (type, groupId) {
        Milo.dologin(function () {
            var jf = $(".jf_7340").html();
            if (jf < Hx.groupJFNum) {
                alert("��Ǹ�����ֲ��㡣");
                return;
            }
            if (type == 1) {
                groupId = $("#joinGroupId").val();
                if (groupId == undefined || groupId == "") {
                    alert("������ƴ��ID");
                    return;
                }
                if (groupId.indexOf("#�ױ�������װ-") != -1) {
                    groupId = groupId.replace("#�ױ�������װ-", "");
                }
            }
            confirm("���μ���ƴ�Ų��������棬�޷����أ���ȷ���Ƿ����", function () {
                var msg = '��ȷ��ʹ�á����֡�' + Hx.groupJFNum + '������ƴ�š�' + groupId + '����';
                confirm_dt(msg, function () {
                    doAmsSubmit({
                        token: "joingroup",
                        sData: {
                            sTeamId: groupId
                        },
                        success: function (res) {
                            console.log("joinGroup", res);
                            var jData = res.details.jData;
                            alert(res.sMsg);
                            // if(res.iRet == '0'){
                            //     alert("����ƴ�š�" + groupId + "���ɹ�");
                            // }else{
                            //     alert("����ƴ�š�" + groupId + "��ʧ��")
                            // }
                            Hx.init();
                            Hx.recommendSearch();
                            Hx.getGroupInfo();
                        },
                        // fail: function (res) {
                        //     if(res.sMsg != "succ"){
                        //         alert(res.sMsg);
                        //     }  else{
                        //         alert("����ƴ�š�" + groupId + "��ʧ��")
                        //     }
                        // }
                    })
                }, 2)
            })

        });
    },
    recommend: function () {
        Milo.dologin(function () {
            confirm("���γ�Ϊ�Ƽ��Ų��������棬�޷����أ���ȷ���Ƿ����", function () {
                var msg = '��ȷ��ͬ���Ϊ�Ƽ�����';
                confirm_dt(msg, function () {
                    doAmsSubmit({
                        token: "recommend",
                        sData: {
                        },
                        success: function (res) {
                            console.log("recommend", res);
                            if (res.iRet == '0') {
                                alert("��Ϊ�Ƽ��ųɹ�");
                            } else {
                                alert(res.sMsg);
                            }
                            Hx.init();
                            Hx.recommendSearch();
                            Hx.getGroupInfo();
                        }
                    })
                }, 2)
            })

        });
    },
    recommendSearch: function () {
        doAmsSubmit({
            token: "recommendsearch",
            sData: {
            },
            success: function (res) {
                console.log("recommendSearch", res);
                $('#recommendGroupList').html("");
                var recommendGroupList = res.details.jData.data;
                Hx.recommendGroupList = []
                var length = recommendGroupList.length;
                var all_html = "";
                for (var i = 0; i < length; i++) {
                    Hx.recommendGroupList.push(recommendGroupList[i]["data"]);
                    all_html += '<tr>\
                        <td>' + recommendGroupList[i]["sTeamId"] + '</td>\
                        <td>' + recommendGroupList[i]["memberNum"] + '</td>\
                        <td><a href="javascript:Hx.joinGroup(2, \'' + recommendGroupList[i]["sTeamId"] + '\');">��������</a></td>\
                    </tr>'
                }
                $('#recommendGroupList').html(all_html);
            },
            fail: function (res) {
                console.log("recommendSearch fail", res);
            }
        })
    },
    //��ȡƴ�Ž���
    getGroupGift: function () {
        Milo.dologin(function () {
            doAmsSubmit({
                token: "getgroupgift",
                sData: {},
                success: function (res) {
                    console.log("getgroupgift", res);
                    if (res.details.jData.iPackageId != "6705135" && res.details.jData.iPackageId != "6705136")
                        alert(res.sMsg);
                    Hx.init();
                    Hx.recommendSearch();
                    Hx.getGroupInfo();
                }
            });
        });
    },
    //ä����ȡ
    getBlindBox: function () {
        Milo.dologin(function () {
            if (parseInt(Hx.boxNums[7398]['ticket']) < 0) {
                alert("����δ��ȡä����������")
                return;
            }
            doAmsSubmit({
                token: "blindbox",
                sData: {},
                success: function (res) {
                    console.log("blindbox", res);
                    // alert(res.sMsg);
                    alert("��ϲ�����ױ��������ä���л���������" + res.details.jData.lottery.result.sPackageName)
                    setTimeout("Hx.init();Hx.recommendSearch();Hx.getGroupInfo();", 2000);
                }
            });
        });
    },

    //�����ȡ
    getGiftBox: function () {
        Milo.dologin(function () {
            if (parseInt(Hx.boxNums[7397]['ticket']) < 0) {
                alert("����δ��ȡ�����������")
                return;
            }
            doAmsSubmit({
                token: "giftbox",
                sData: {},
                success: function (res) {
                    console.log("giftbox", res);
                    // alert(res.sMsg);
                    alert("��ϲ�����ױ���������л���������" + res.details.jData.lottery.result.sPackageName)
                    setTimeout("Hx.init();Hx.recommendSearch();Hx.getGroupInfo();", 2000);
                }
            });
        });
    },
    //ƴ�ż�¼��ѯ
    getGroupHistory: function (page) {
        if (page == "0") {
            return;
        }
        doAmsSubmit({
            token: "gift",
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                pageNow: page,
                pageSize: 6,
                str: "gift",
                sid: 5
            },
            success: function (res) {
                console.log(res);
                var lottery = res.details.jData.lottery;
                $("#groupHistory").html("");
                // �ж��û��Ƿ���Ҫ�Զ���ṹ������Ҫ��Ĭ��ȡ�û��Լ�����Ľṹ
                if ($("#getGiftTemplate4").length > 0) {
                    let tpl_html = $("#getGiftTemplate4").html();
                    // ��Ⱦ����
                    const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                    $("#groupHistory").html(_html);
                }
                var pageTotal = parseInt(lottery.result.pageTotal);//��ҳ��
                var pageNow = parseInt(lottery.result.pageNow);//��ҳ��
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//��һҳ
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//��һҳ
                $("#text16 .now_page").html(pageNow + "/" + pageTotal);
                // $("#text3 .now_page").html(pageNow);
                // $("#text3 .total_page").html(pageTotal);
                $("#text16 .btn_prev").attr("href", "javascript:Hx.getGroupHistory(" + pre + ");");
                $("#text16 .btn_next").attr("href", "javascript:Hx.getGroupHistory(" + next + ");");

                TGDialogS("text16");
            }
        });
    },

    //�ʾ���д����ύ
    question: {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': ''
    },
    amsFeedBack: function () {
        //��֤
        if ($.inArray(Hx.question["1"], [1, 2, 3, 4, 5]) == -1) {
            alert("����1δѡ��");
            return;
        }
        if ($.inArray(Hx.question["2"], [1, -1]) == -1) {
            alert("����2δѡ��");
            return;
        }
        if ($.inArray(Hx.question["3"], [1, -1]) == -1) {
            alert("����3δѡ��");
            return;
        }
        if (Hx.question["4"] == '') {
            alert("����4δѡ��");
            return;
        }
        if ($.inArray(Hx.question["5"], [1, 2, 3, 4, 5]) == -1) {
            alert("����5δѡ��");
            return;
        }
        if ($.inArray(Hx.question["6"], [1, 2, 3, 4, 5]) == -1) {
            alert("����6δѡ��");
            return;
        }
        if ($.inArray(Hx.question["7"], [1, 2, 3, 4, 5]) == -1) {
            alert("����7δѡ��");
            return;
        }
        if ($.inArray(Hx.question["8"], [1, 2, 3, 4, 5]) == -1) {
            alert("����8δѡ��");
            return;
        }
        if ($.inArray(Hx.question["9"], [1, 2, 3, 4, 5]) == -1) {
            alert("����9δѡ��");
            return;
        }
        if ($.inArray(Hx.question["10"], [1, 2, 3, 4, 5]) == -1) {
            alert("����10δѡ��");
            return;
        }
        //��Դ
        var question_source = Hx.question["11"];
        var question_text = '';
        if ($.inArray(question_source, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) == -1) {
            alert("����11δѡ��");
            return;
        }
        if (question_source == 11) {
            question_text = $('#question11_text').val();
        } else {
            question_text = ['���ϴ�Խ����', '���ϵ��۳�', '����/��̳/QQȺ', '����', 'Wegame���', '��Ϸ�ڻ����', '���ѷ���', '��Ƶƽ̨����Bվ������������', '�ٷ�΢�ź͹ٷ�΢��', 'ֱ��ƽ̨���绢��������', '����������д��'][question_source - 1];
        }
        if (question_text == '') {
            alert("����д���Ǵ������֪���λ����Ϣ");
            return;
        }
        if (question_text.length > 50) {
            alert("��֪���λ����Ϣ��Դ��������������д");
            return;
        }
        //����
        Hx.question["12"] = $('#question12_text').val();

        if (Hx.question["12"].length > 300) {
            alert("����������������������д");
            return;
        }
        closeDialog();
        doAmsSubmit({
            token: 'fktj',
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                iQuestion1: Hx.question["1"],
                iQuestion2: Hx.question["2"],
                iQuestion3: Hx.question["3"],
                sQuestion4: encodeURIComponent(Hx.question["4"]),
                iQuestion5: Hx.question["5"],
                iQuestion6: Hx.question["6"],
                iQuestion7: Hx.question["7"],
                iQuestion8: Hx.question["8"],
                iQuestion9: Hx.question["9"],
                iQuestion10: Hx.question["10"],
                sQuestion11: encodeURIComponent(question_text),
                sQuestion12: encodeURIComponent(Hx.question["12"])
            },
            success: function (res) {
                alert("�����ɹ�~");
                Hx.init();
            }
        })
    },
    fklq: function () {
        doAmsSubmit({
            token: "fklq",
            success: function (res) {
                var jData = res.details.jData;
                alert("��ϲ��û��֡�7");
                Hx.init();
            }
        })
    }
}

function queryBroadcast() {
    var flow = {
        actId: Milo.aParams.amsActId,
        token: 'lunbo',
        loading: true, // ����loading����,Ĭ�ϲ�����
        time: 50, // �ֲ�ʱ��
        sData: {
            // query: false
        },
        customDom: {
            broadcastId: "milo-broadcast",
            broadcastContentId: "milo-broadcast-container"
        },
        success: function (res) {
            console.log('��ѯ�ֲ�success', res);
        },
        fail: function (res) {
            console.log('��ѯ�ֲ�fail', res);
        }
    }
    Milo.emit(flow);
}


//================================�ʾ� start =========================================
/**
 *
 * @param item  ����1-5
 */
function select_question1(order, item) {
    $('#fk' + order + ' li a').removeClass('cur');
    $('#fk' + order + ' li').each(function () {
        if ($(this).index() < item) {
            $(this).find("a").addClass('cur');
        }
    })
    Hx.question[order] = item;
}

/**
 *
 * @param item  �Ƿ�1,-1
 */
function select_question2(order, item) {
    var index = item == 1 ? 0 : 1;
    $('#fk' + order + ' li a').removeClass('cur');
    $('#fk' + order + ' li a').eq(index).addClass('cur');
    Hx.question[order] = item;
}

/**
 *
 * @param item  ��ѡ���ѡ��1-25
 */
function select_question3(item) {
    //��ʼ���������ʾ�����ѡ��id
    var order = 4;
    var diffItem = 11
    var max = 5
    //
    var dom = $('#fk' + order + ' div a').eq(item - 1);
    var domDiff = $('#fk' + order + ' div a').eq(diffItem - 1);
    if (dom.hasClass('cur')) {
        //ͨ��-ȥѡ��
        dom.removeClass('cur')
    } else {
        //����ѡ��
        if (item == diffItem) {
            //ѡ�񻥳�ѡ��
            $('#fk' + order + ' div a').removeClass('cur');
            dom.addClass('cur')
        } else {
            domDiff.removeClass('cur')
            var len = Hx.question[order].split('|').length;
            if (len >= max) {
                alert('���ѡ��5��');
            } else {
                dom.addClass('cur');
            }
        }
    }
    Hx.question[order] = ''
    var arr = []
    for (var i = 1; i <= diffItem; i++) {
        var dom = $('#fk' + order + ' div a').eq(i - 1);
        if (dom.hasClass('cur')) {
            arr.push(i)
        }
    }
    Hx.question[order] = arr.join('|')
}


/**
 *
 * @param item  11ѡ1 1-11
 */
function select_question4(order, item) {
    var index = item - 1;
    $('#fk' + order + ' div a').removeClass('cur');
    $('#fk' + order + ' div a').eq(index).addClass('cur');
    Hx.question[order] = item;
}
//�ʾ�ѡ���л�==========================================================end

//������ȡ
function select_box(order, item) {
    var index = item - 1;
    // console.log('#popbaox'+ order + '_' + item)
    $('#popbaox' + order + ' a').removeClass('on');
    $('#popbaox' + order + '_' + item).addClass('on');
}


//��ô�������
function getAreaName(area) {
    return CFServerSelect.zoneToName(area);
}

//������ѡ1
$("#popchek .popchkbx a").click(function () {
    $(this).addClass('on').siblings().removeClass('on');
})
//����2
function TGDialogS1(e) {
    closeDialog1()
    $("#" + e).css("display", "block")
}
function closeDialog1() {
    $(".pop_box").css("display", "none")
}


//����ͼƬ
function saveImageWithText(djimg, ewmimg, labelimg, textParts) {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();

    img1.crossOrigin = "anonymous"; // �������ã�ȷ��canvas������Ⱦ
    img2.crossOrigin = "anonymous";
    img3.crossOrigin = "anonymous";

    // img1.src = "//game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/lot/fc_yx1.png" + '?t=' + Date.now();
    // img2.src = "//game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/ewm.png" + '?t=' + Date.now();
    // img3.src = "//game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/label1.png" + '?t=' + Date.now();

    img1.src = djimg + '?t=' + Date.now();
    img2.src = ewmimg + '?t=' + Date.now();
    img3.src = labelimg + '?t=' + Date.now();

    let imagesLoaded = 0;

    function onImageLoad() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // ����canvas�ߴ�Ϊ��һ��ͼƬ�ߴ�
            canvas.width = img1.naturalWidth;
            canvas.height = img1.naturalHeight;
            //����x����������
            const space_x = 10;
            // �Ȼ��Ƶ�һ��ͼƬ
            ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);

            // ���Ƶڶ���ͼƬ
            const img2_w = img2.naturalWidth;
            const img2_h = img2.naturalHeight;
            const img2_px = 20;
            const img2_py = canvas.height - (img2_h + 10);
            ctx.drawImage(img2, img2_px, img2_py, img2_w, img2_h);
            // ���Ƶ�����ͼƬ
            const img3_w = img3.naturalWidth * 70 / 100;
            const img3_h = img3.naturalHeight * 70 / 100;
            const img3_px = img2_w + img2_px + space_x;
            const img3_py = canvas.height - (img3_h + 10);
            ctx.drawImage(img3, img3_px, img3_py, img3_w, img3_h);

            // ��������
            // const textParts = [
            //     { text: "�ۼƳ齱 ", color: "#000", line: 0 , font: "36px Arial" },
            //     { text: "56 ", color: "red", line: 0 , font: "36px Arial" },
            //     { text: "�λ��", color: "#000", line: 0 , font: "36px Arial" },
            //     { text: "�Ϻ�һ�� С������", color: "#000", line: 1 , font: "24px Arial" },
            // ];

            const lineHeight = 40; // �и�
            const startX = img3_px + img3_w + space_x; // ÿ����ʼx����

            // ��¼ÿ�е�ǰx����
            const lineX = [startX, startX];

            textParts.forEach(part => {
                const line = part.line;
                ctx.font = part.font;
                ctx.fillStyle = part.color;
                ctx.textBaseline = "top";
                ctx.fillText(part.text, lineX[line], line * lineHeight + img3_py);
                // ���µ�ǰ�е�x����
                lineX[line] += ctx.measureText(part.text).width;
            });

            // ת��Ϊ��������
            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                // �޸ĺ�
                const timestamp = new Date()
                    .toISOString()
                    .replace(/T/, '-') // �滻TΪ���
                    .replace(/\..+/, '') // ȥ��С�����Ĳ���
                    .replace(/:/g, ''); // ȥ��ð��
                link.download = `����ͼ-${timestamp}.png`;
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            });
        }
    }

    img1.onload = onImageLoad;
    img2.onload = onImageLoad;
    img3.onload = onImageLoad;
}


document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        console.log('Esc��������');
        // ��һ����������
        if (Milo.is_Esc == 1) {
            Milo.is_Esc = 0;
            Hx.init();
        }
    }
});

// 覆盖 Hx.lottery，确保使用本地抽奖逻辑并覆盖服务端实现
if (typeof Hx !== 'undefined') {
    Hx.lottery = function(num) {
        num = num || 1;
        // 读取显示的次数数量优先
        var keys = 0;
        try { keys = parseInt($(".jf_7332").text()) || 0; } catch (e) { keys = (window._local && window._local.keys) || 0; }
        window._local = window._local || {};
        window._local.keys = typeof window._local.keys === 'number' ? window._local.keys : keys || 10;
        if (window._local.keys < num) {
            alert('次数不足');
            return;
        }
        window._local.keys -= num;
        try { $(".jf_7332").html(window._local.keys); } catch (e) {}

        var map = (typeof Milo !== 'undefined' && Milo.aParams && Milo.aParams.lotteryMap) ? Milo.aParams.lotteryMap : (window._local.lotteryMap || {});
        var ids = Object.keys(map);
        if (!ids || ids.length === 0) {
            alert('无可用奖池数据');
            return;
        }
        var arr = [];
        for (var i = 0; i < num; i++) {
            var randId = ids[Math.floor(Math.random() * ids.length)];
            var item = map[randId] || {};
            arr.push({ id: randId, name: item.name || ('物品' + randId), imgNum: item.imgNum || '1', show: item.show || '0', class: item.class, nTotalInALL: item.nTotalInALL || 0 });
        }
        Hx.show_dj = { dj_arr: arr.slice(), big_arr: arr.filter(function (v) { return v.show != '0'; }), count: num };
        try { Hx.showLottery(); } catch (e) { console.error('覆盖本地抽奖显示失败', e); }
    }
}