var nowtime = milo.request("nowtime") ? new Date(milo.request("nowtime") + " 00:00:00") : milo.getSeverDateTime();
milo.ready(function () {
    Milo.aParams = {
        actPopTime: "2026/02/01 23:59:59",
        actEndTime: "2026/02/08 23:59:59",
        amsActId: "850044",
        hsActId1: "44249",
        bizCode: "cf",
        urlimg: "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/",
        lotUrl1: "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/lot/lota",//抽奖展示图1-动态文字
        lotUrl2: "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/lot/lotb",//抽奖展示图2-固定文字
        share: {
            title: '天袭降临，神匠厂牌VVIP上新',
            desc: '加利尔ACE-天袭，全新首发',
            link: "https://app.daoju.qq.com/act/a20251224cfactivity/index.html",
            icon: "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/share.jpg",
            content: '',
            pic: "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/share.jpg",
            shareUrl: "https://app.daoju.qq.com/act/a20251224cfactivity/index.html",
        },
        lotteryMap: {
            "7448924": { "imgNum": "1", "show": "1", "name": "加利尔ACE-天袭" },
            "7451467": { "imgNum": "2", "show": "2", "name": "FAMAS G2-天戎" },
            "7451468": { "imgNum": "3", "show": "3", "name": "VSK-94-金蚀" },
            "7451469": { "imgNum": "4", "show": "4", "name": "机械姬" },
            "7451470": { "imgNum": "5", "show": "5", "name": "QBZ03-天罚" },
            "7451472": { "imgNum": "6", "show": "6", "name": "金蚀-机械姬" },
            "7451474": { "imgNum": "7", "show": "7", "name": "QBZ03-天罚音效卡" },
            "7451475": { "imgNum": "8", "show": "8", "name": "M4A1-猎神" },
            "7451480": { "imgNum": "9", "show": "9", "name": "沙鹰-天神" },
            "7451481": { "imgNum": "10", "show": "10", "name": "机械姬玩偶" },
            "7451482": { "imgNum": "11", "show": "0", "name": "王者之石x1" },
            "7451483": { "imgNum": "12", "show": "0", "name": "神匠值x100" },
            "7451485": { "imgNum": "13", "show": "0", "name": "神匠值x15" },
            "7451486": { "imgNum": "14", "show": "0", "name": "神匠值x9" },
            "7451487": { "imgNum": "15", "show": "0", "name": "神匠值x8" },
            "7451488": { "imgNum": "16", "show": "0", "name": "神匠值x7" }
        },
        tips1: "本活动结束时间为:2026.02.08 23:59:59；<br/>超过活动期限的抽奖钥匙、暂存箱内未领取奖励等都将作废，请及时使用/领取；本活动结束后，神匠值在本活动无法使用，可前往《神工天巧套装返场》继续使用；"
    }
    // 本地调试模式：启用后避免发起远程 AMS/描述文件请求
    Milo.aParams.localMode = true;
    //修改弹框
    window.alert = function (msg, callback) {
        if (msg == "ok" || msg == "取消关闭") {
            return;
        }
        $("#sAlert .msg").html(msg);
        window.alert_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#sAlert a").attr("href", "javascript: window.alert_call();");
        TGDialogS('sAlert');
    }
    window.confirm = function (msg, callback, title1 = "确定", title2 = "取消") {
        $("#sConfirm .msg").html(msg);
        $("#sConfirm .btnqd").html(title1);
        $("#sConfirm .btnqx").html(title2);
        window.confirm_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#sConfirm .btnqd").attr("href", "javascript: window.confirm_call();");
        TGDialogS('sConfirm');
    }

    window.confirm_dt = function (msg, callback, title1 = "确定", title2 = "取消", ishow = 3) {
        $("#sConfirm_dt .p_time").html(ishow);
        $("#sConfirm_dt .btnqd").addClass("gray");
        if (Milo.aParams.interval) {
            clearInterval(Milo.aParams.interval);
        }
        // 每秒更新倒计时
        Milo.aParams.interval = setInterval(() => {
            ishow--;
            $("#sConfirm_dt .p_time").html(ishow);
            // 倒计时结束
            if (ishow === 0) {
                $("#sConfirm_dt .btnqd").removeClass("gray");
                clearInterval(Milo.aParams.interval);
            }
        }, 1000);
        $("#sConfirm_dt .msg").html(msg);
        $("#sConfirm_dt .btnqd").html(title1);
        $("#sConfirm_dt .btnqx").html(title2);
        window.confirm_dt_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#sConfirm_dt .btnqd").attr("href", "javascript: window.confirm_dt_call();");
        TGDialogS('sConfirm_dt');
    }

    Milo.bindInfo = {};

    if (milo.request("debug") != 1) {
        //切换地址
        if (Milo.isMobile() && location.hostname == "act.daoju.qq.com") {
            location.href = "https://app.daoju.qq.com/act/a20251224cfactivity/index.html";
        }
        if (!Milo.isMobile() && location.hostname == "app.daoju.qq.com") {
            location.href = "index.html";
        }
    }

    if (Milo.isDJApp() && milo.request("plat_support") != "all") {
        location.href = "https://app.daoju.qq.com/act/a20251224cfactivity/index.html?plat_support=all";
    }
    if (Milo.isMobile()) {
        Milo.shareInit(Milo.aParams.share);
    }
    Milo.dologin(function () {
        $("#login_qq_span,#tunlogin").html(Milo.userInfo.nickName);
        $("#userinfo").html(Milo.userInfo.nickName);
        if (Milo.isDJApp()) {
            $("#ptLogoutBtn,#btn_logout,#dologout").hide();
        }
        Hx.bindinit();
    })

    need(["ams.daoju_buy_v2.appid"], function (autoappid) {
        autoappid.init(Milo.aParams.bizCode, Milo.aParams.hsActId1, function (final_appid) { });
    })

    queryBroadcast();
})

var Hx = {
    //查询是否绑定的配置
    bindinit: function () {
        doAmsSubmit({
            token: 'bindinit',
            loading: true, // 开启loading浮层,默认不开启
            sData: {
                query: true,
                ams_targetappid: 'wx79db870bffc454f4', //托管转换的目标appid(一般为游戏的微信appid)
            },
            openToOpen: { //openid转换相关参数和gopenid相关参数,具体参考参数说明
                sAMSTrusteeship: 1, //标记是否需要走微信/QQ托管,默认为0(1:走微信/QQ托管,0:不走微信/QQ托管)
                ams_targetappid_qc: '1112358227', //托管转换的目标appid(一般为游戏的互联登录appid)
                ams_targetappid_wx: 'wx79db870bffc454f4', //托管转换的目标appid(一般为游戏的微信appid)
                oGopenidParams: {
                    needGopenid: 1,
                    isPreengage: 0
                },
            },
            success: function (res) {
                //处理内嵌跳转
                if (milo.request('neiqian') == 1 && top.location == location && milo.request('debug') != 1 && milo.request('gc') != 1) {
                    var curHtmlUrl = window.location.href;
                    if (curHtmlUrl.indexOf("hdnq.html") >= 0) { } else {
                        window.location.href = "https://cf.qq.com/act/a20160516ntclsacts/new_index.htm";
                    }
                }
                // //已绑定时的扩展处理
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
    //提交绑定的配置
    bind: function () {
        Milo.dologin(function () {
            var opt = {
                gameId: Milo.aParams.bizCode,
                actId: Milo.aParams.amsActId, // 管线活动号，每次活动开发需要修改
                token: "bind", // 管线流程别名, 每次活动开发需要修改
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
        if (!data.FareaName) {
            data.FareaName = getAreaName(data.Farea);
        }
        var iRoleName = decodeURIComponent(decodeURIComponent(data.FareaName)) + "-" + decodeURIComponent(decodeURIComponent(data.FroleName));
        Hx.iRoleName = iRoleName;
        Hx.uin = data.Fuin;
        Hx.FareaName = decodeURIComponent(decodeURIComponent(data.FareaName));
        Hx.FroleName = decodeURIComponent(decodeURIComponent(data.FroleName));
        $("#milo-roleName").html(iRoleName);
        $("#milo-binded").show();
        $("#milo-unbind").hide();
        $("#unlogin").hide();
        $("#logined").show();
        if (Milo.get("lotteryShow_" + Milo.bindInfo.sRole) == "lotteryShow") {
            $("#lotteryShow a").addClass("cur");
        } else {
            $("#lotteryShow a").removeClass("cur");
        }
        Hx.init();
        Hx.showVconsole();
    },
    //展示vonsole
    showVconsole() {
        //白名单用户暂时vconsole
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
    //代金券记录0.
    pop1: function () {
        Hx.binded(function () {
            if (location.hostname == "act.daoju.qq.com") {
                var url = "https://act.daoju.qq.com/act/a20190301yqrh/pop.html?sorce=pc&amp;type=all"
                if (milo.request("neiqian") == 1) {
                    //游戏内登录态
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
                $("#djq .iframe").html('<iframe class="iframe1" frameborder="0" height="800px" src="' + url + '" width="810px"></iframe>');
                TGDialogS("djq");
            } else {
                var url = "https://app.daoju.qq.com/act/a20190301yqrh/pop.html?plat_support=all&amp;type=all";
                location.href = url;
            }
        })
    },
    //初始化查询
    init: function (callback) {
        doAmsSubmit({
            token: 'init',
            success: function (res) {
                console.log(res.details.jData, '初始化')

                var jData = res.details.jData;
                var jfarr = jData.jf_arr;
                var holdarr = jData.hold_arr;

                Hx.jf_2327 = parseInt(jData['jf_2327']); //代金券
                Hx.jf_7817 = parseInt(jfarr[7817]['ticket']); //抽奖钥匙
                Hx.jf_7818 = parseInt(jfarr[7818]['ticket']); //神匠值
                Hx.jf_7819 = parseInt(jfarr[7819]['ticket']); //反馈积分

                $(".jf_2327").html(Hx.jf_2327);

                $(".jf_7817").html(Hx.jf_7817);
                $(".jf_7818").html(Hx.jf_7818);

                Hx.fjMap = jData.fjMap;
                Hx.dhMap = jData.dhMap;

                //分解fjMap
                var fjMap = [];
                $.each(Hx.fjMap, function (k, v) {
                    fjMap.push(v);
                })
                fjMap.sort(function (a, b) {
                    return b["jfNum"] - a["jfNum"];
                })
                $("#zcx .fjMap").html("");
                $.each(fjMap, function (k, v) {
                    //$("#zcx .fjMap").append("<p><span>" + v["name"] + "</span><span>" + v["jfNum"] + "</span></p>");
                    //$("#zcx .fjMap").append("<tr><td>" + v["name"] + "</td><td>" + v["jfNum"] + "</td></tr>");
                    $("#zcx .fjMap").append("<li><p>" + v["name"] + "</p><p>" + v["jfNum"] + "</p></li>");
                })

                //反馈部分
                if (Hx.jf_7819 > 0) {
                    $("#btnFeedBack").attr("href", "javascript:Hx.popfk();");
                }
                if (holdarr["fkhold1"]["iUsedNum"] == 1) {
                    $("#btnFeedBack").attr("href", "javascript:alert('已反馈过了');").addClass("gray");
                }
                if (holdarr["fkhold2"]["iUsedNum"] == 1) {
                    $("#btnFeedBacklq").addClass("gray dis");
                }

                var time1 = nowtime.getTime();
                var time2 = new Date(Milo.aParams.actPopTime).getTime();
                var time3 = new Date(Milo.aParams.actEndTime).getTime();
                //活动结束前1周刷新就弹出
                if (time1 >= time2 && time1 <= time3 && !Hx.poptips2) {
                    $("#tips1 .msg").html(Milo.aParams.tips1);
                    popActEndTips("tips1", function () {
                        Hx.poptips2 = true;
                    })
                }

                $.isFunction(callback) && callback();

            },
            fail: function (res) {

            }
        })
    },
    buyKey: function (propid, paytype) {
        // 本地化购买实现：直接在本地增加抽奖钥匙并提示（无网络依赖）
        try {
            console.log('Hx.buyKey called with propid=', propid, 'paytype=', paytype);
            // 本地购买逻辑：按 propid 增加钥匙数量，避免触发绑定/网络流程
            if (typeof Hx.jf_7817 === 'undefined') Hx.jf_7817 = parseInt($('.jf_7817').html()) || 0;
        // propid -> 赠送钥匙映射（根据页面规则推断）
        var giveMap = {
            '1362867': 1, // 10Q 普通
            '1362866': 11, // 100Q 普通（赠送11把）
            '1362870': 55, // 500Q
            '1362868': 1, // 10Q 道聚城带代金券
            '1362869': 10 // 100Q 道聚城代金券抵扣（赠送10把）
        };
            var give = giveMap[String(propid)] || 0;
            if (give <= 0) {
                alert('购买配置未知，无法完成本地模拟购买');
                return;
            }
            Hx.jf_7817 += give;
            $('.jf_7817').html(Hx.jf_7817);
            alert('购买成功，获得抽奖钥匙×' + give);
        } catch (e) {
            console.error('buyKey error', e);
            alert('发生错误，请查看控制台');
        }
    },
    //主奖池抽奖
    show_dj: {
        "dj_arr": [],
        "big_arr": []
    },
    lottery: function (num) {
        try {
            console.log('Hx.lottery called with num=', num);
            // 本地抽奖：直接使用本地钥匙与奖池，不触发绑定流程
            var jf = parseInt($(".jf_7817").html()) || 0;
            var want = parseInt(num) || 1;
            if (jf < want) {
                alert('抱歉，抽奖钥匙不足。');
                return;
            }
            // 扣除钥匙
            Hx.jf_7817 = jf - want;
            $('.jf_7817').html(Hx.jf_7817);

            // 构建奖池数组
            var pool = [];
            var map = Milo.aParams.lotteryMap || {};
            for (var pid in map) {
                if (!map.hasOwnProperty(pid)) continue;
                var item = map[pid];
                pool.push({ id: pid, name: item.name, imgNum: item.imgNum, show: item.show });
            }
            if (pool.length === 0) {
                alert('抽奖池为空，无法抽奖');
                return;
            }

            // 随机抽取 want 个奖品
            var arr = [];
            var nTotalInALL = Math.floor(Math.random() * 100) + 1; // 随机累计次数展示用
            for (var i = 0; i < want; i++) {
                var idx = Math.floor(Math.random() * pool.length);
                var picked = pool[idx];
                arr.push({
                    id: picked.id,
                    name: picked.name,
                    imgNum: picked.imgNum,
                    show: picked.show,
                    class: picked.class,
                    nTotalInALL: nTotalInALL + i
                });
            }

            Hx.show_dj = { 'dj_arr': [], 'big_arr': [] };
            $.each(arr, function (k, v) {
                if (v.show != '0') Hx.show_dj.big_arr.push(v);
                Hx.show_dj.dj_arr.push(v);
            });
            Hx.show_dj.big_arr.sort(function (a, b) { return parseInt(a.show) - parseInt(b.show); });
            Hx.showLottery();
        } catch (e) {
            console.error('Hx.lottery error', e);
            alert('抽奖发生错误，请查看控制台');
        }
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
        alert("抱歉，保存失败，请手动截图保存。");
    },
    djcAppShare: function () {
        alert("抱歉，分享失败，请自行截图分享。");
    },
    showLottery: function (iCan) {
        console.log(Hx.show_dj);
        //1.展示大奖
        if ($("#lotteryShow a").hasClass("cur") && iCan != 1) {
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
                text: "累计抽取",
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
                text: "次获得",
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
            var lot_img_txt = Milo.aParams.lotUrl2 + big_arr[0]["imgNum"] + '.png?t=' + Date.now(); // 加时间戳避免缓存;
            if (location.hostname == "act.daoju.qq.com") {
                Hx.pcSaveImg = function () {
                    saveImageWithText(djimg, ewm_img, label_img, textParts)
                }
                Hx.pc_qqZoneShare = function (djName, imgName) {
                    $("#_overlay_")[0].style.setProperty('z-index', '798', 'important');
                    $("#lotterybig")[0].style.setProperty('z-index', '799', 'important');
                    need("biz.qzoneShare", function (share) {
                        share.share({
                            // url: dmdv.sMyShareStr, //分享链接[可选，不传则取页面url]
                            title: Milo.aParams.share.title,
                            desc: "我在《" + Milo.aParams.share.title + "》抽到了" + djName + "，要来比比看谁的运气更好吗？",
                            pics: imgName,
                            summary: Milo.aParams.share.title,
                            showcount: '0', //1默认显示  0不显示
                            md: '1', //1默认不允许更改  0允许更改
                            callback: function (shareId) {
                                alert("分享成功！");
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
                            alert("点右上角功能按钮生成分享图，炫耀你的欧皇时刻吧");
                            return;
                        }
                        if (label_num == 4) {
                            lotDescText = "";
                        } else {
                            lotDescText = "<div style=\"color: #251e1e; font-size: 36px;\">累计抽取<span style=\"color: #FF6600; font-weight: bold;\">" + nTotalInALL + "</span>次获得</div>";
                        }
                        var option = {
                            codeUrl: "https://app.daoju.qq.com/act/a20251224cfactivity/index.html?plat_support=all", //  二维码地址
                            labelUrl: label_img, // 标签地址
                            lotDescText: lotDescText, //文本信息内容
                            userInfoText: "<div style=\"color: #251e1e; font-size: 24px;\">" + Hx.FareaName + " " + Hx.FroleName + "</div>",
                            lotImgUrl: djimg, // 中奖大背景图地址
                            qrSize: 100 ////二维码大小qrSize，现在是150，没传这个参数默认为150
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
        //2.展示道具
        if (Hx.show_dj.dj_arr.length > 0) {
            var dj_arr = Hx.show_dj.dj_arr;
            if (dj_arr.length == 1) {
                $("#lottery1 .lot1").html("");
                $.each(dj_arr, function (k, v) {
                        var _html = '<li>\
                                <img src="https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/lot/lot' + v["imgNum"] + '.png" alt="">\
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
                                <img src="https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/lot/lot' + v["imgNum"] + '.png" alt="">\
                            </li>';
                    $("#lottery10 .lot10").append(_html);
                })
                $("#lottery10 a").attr("href", "javascript: Hx.showLottery();");
                TGDialogS("lottery10");
                Hx.show_dj.dj_arr = [];
            }
            return;
        }
        //3.展示完关闭
        closeDialog();
        // 在本地调试模式下，跳过再初始化以避免请求远程描述文件
        if (!Milo.aParams || !Milo.aParams.localMode) {
            Hx.init(1);
        } else {
            console.log('localMode enabled: skipped Hx.init(1) to avoid network requests');
        }
    },
    //抽奖记录
    gift: function (page) {
        if (page == "0") {
            return;
        }
        var pageSize = 6;
        var str = $("#giftlist a.cur").attr("data-str");
        doAmsSubmit({
            token: "gift",
            loading: true, // 开启loading浮层,默认不开启
            sData: {
                pageNow: page,
                pageSize: pageSize,
                str: str
            },
            success: function (res) {
                console.log(res);
                if (!res || !res.details || !res.details.jData || !res.details.jData.lottery) {
                    console.warn('gift: response missing lottery data, running offline fallback');
                    TGDialogS("text3");
                    return;
                }
                var lottery = res.details.jData.lottery;
                $("#table" + str + " tbody").html("");
                // 判断用户是否需要自定义结构，如需要，默认取用户自己定义的结构
                if (str == 1) {
                    if ($("#tpl7").length > 0) {
                        let tpl_html = $("#tpl7").html();
                        // 渲染数据
                        const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                        $("#table" + str + " tbody").html(_html);
                    }
                } else {
                    if ($("#tpl7-x").length > 0) {
                        let tpl_html = $("#tpl7-x").html();
                        // 渲染数据
                        const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                        $("#table" + str + " tbody").html(_html);
                    }
                }
                var pageTotal = parseInt(lottery.result.pageTotal);//总页数
                var pageNow = parseInt(lottery.result.pageNow);//总页数
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//上一页
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//下一页
                $("#table" + str + " .now_page").html(pageNow + "/" + pageTotal);
                //$("#table" + str + " .total_page").html(pageTotal);
                $("#table" + str + " .now_page").attr("now_page", pageNow);
                $("#table" + str + " .btn_prev").attr("href", "javascript:Hx.gift(" + pre + ");");
                $("#table" + str + " .btn_next").attr("href", "javascript:Hx.gift(" + next + ");");

                TGDialogS("text3");
            }
        })
    },
    //暂存箱
    zcx: function (page) {
        if (page == "0") {
            return;
        }
        doAmsSubmit({
            token: "gift",
            loading: true, // 开启loading浮层,默认不开启
            sData: {
                pageNow: page,
                pageSize: 6,
                str: "10"
            },
            success: function (res) {
                console.log(res);
                if (!res || !res.details || !res.details.jData || !res.details.jData.lottery) {
                    console.warn('zcx: response missing lottery data, running offline fallback');
                    TGDialogS("zcx");
                    return;
                }
                var lottery = res.details.jData.lottery;
                $("#zcx_content").html("");
                // 判断用户是否需要自定义结构，如需要，默认取用户自己定义的结构
                if ($("#tpl_zcx").length > 0) {
                    let tpl_html = $("#tpl_zcx").html();
                    // 渲染数据
                    var myGiftList = lottery.myGiftList;
                    const _html = Milo.tpl().compile(tpl_html, myGiftList);
                    $("#zcx_content").html(_html);
                }
                var pageTotal = parseInt(lottery.result.pageTotal); //总页数
                var pageNow = parseInt(lottery.result.pageNow); //总页数
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0; //上一页
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1; //下一页
                $("#zcx .now_page").html(pageNow + "/" + pageTotal);
                //$("#zcx .total_page").html(pageTotal);
                $("#zcx .now_page").attr("now_page", pageNow);
                $("#zcx .btn_prev").attr("href", "javascript:Hx.zcx(" + pre + ");");
                $("#zcx .btn_next").attr("href", "javascript:Hx.zcx(" + next + ");");
                TGDialogS("zcx");
            }
        })
    },
    //暂存箱领取
    zcxlq: function (sid, name, item) {
        confirm("本次领取操作不可逆，无法撤回，请确认是否操作", function () {
            var msg = Hx.iRoleName + '<a href="javascript:closeDialog();Hx.bind();" style="color:red;">【切换大区】</a>';
            msg += "<br>确定领取【" + name + "】到游戏内吗？";
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
                            var page = $("#zcx .now_page").attr("now_page");
                            Hx.zcx(page);
                        });
                    }
                })
            }, "确定", "取消", 2)
        })
    },
    //暂存箱分解
    zcxfj: function (sid, name, item) {
        confirm("本次分解操作不可逆，无法撤回，请确认是否操作", function () {
            var msg = Hx.iRoleName + '<a href="javascript:closeDialog();Hx.bind();" style="color:red;">【切换大区】</a>';
            msg += "<br>确定分解【" + name + "】获得【抽奖钥匙×" + Hx.fjMap[item]["jfNum"] + "】吗？";
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
                        alert("恭喜获得抽奖钥匙×" + num, function () {
                            var page = $("#zcx .now_page").attr("now_page");
                            Hx.zcx(page);
                            Hx.init();
                        });
                    }
                })
            }, "确定", "取消", 3)
        })
    },
    //兑换
    dhitem: function (item) {
        Hx.binded(function () {
            var jf = parseInt($(".jf_7818").html());
            if (jf < parseInt(Hx.dhMap[item]["jfNum"])) {
                alert("抱歉，神匠值数量不足。");
                return;
            }
            confirm("本次兑换操作不可逆，无法撤回，请确认是否操作", function () {
                var msg = Hx.iRoleName + '<a href="javascript:closeDialog();Hx.bind();" style="color:red;">【切换大区】</a>';
                msg += "<br>确定使用【神匠值×" + Hx.dhMap[item]["jfNum"] + "】兑换【" + Hx.dhMap[item]["name"] + "】吗？";
                confirm_dt(msg, function () {
                    doAmsSubmit({
                        token: "dhitem",
                        sData: {
                            item: item
                        },
                        success: function (res) {
                            var jData = res.details.jData;
                            alert(res.sMsg);
                            Hx.init();
                        }
                    })
                }, "确定", "取消", 2)
            })
        });
    },
    // //问卷填写结果提交
    popfk: function () {
        initAllQuestions();
        TGDialogS('popfk');
    },
    question: {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': ''
    },
    amsFeedBack: function () {
        // 收集所有问题的答案
        var answers = {
            q1: Hx.question["1"] || 0,      // 满意度评分
            q2: Hx.question["2"] || -1,     // 道具是否满意
            q3: Hx.question["3"] || -1,     // 是否有想要的道具
            q4: Hx.question["4"] || [],     // 最想要的道具（多选）
            q5: Hx.question["5"] || 0,      // 满意度
            q6: Hx.question["6"] || 0,      // 满意度
            q7: Hx.question["7"] || 0,      // 渠道
            q7_text: $("#fk7 input").val() || "", // 其他渠道说明
            q8: $("#fk8").val() || ""       // 建议意见
        };
        // 验证必填项
        if (!answers.q1 || answers.q1 === 0) {
            alert("请选择活动满意度");
            return;
        }
        if (answers.q2 === -1) {
            alert("请选择道具是否满意");
            return;
        }
        if (answers.q3 === -1) {
            alert("请选择奖池内是否有想要的道具");
            return;
        }
        if (!answers.q4 || answers.q4.length === 0) {
            alert("请选择最想要的道具");
            return;
        }
        if (!answers.q5 || answers.q5 === 0) {
            alert("请选择【加利尔ACE-天袭】满意度");
            return;
        }
        if (!answers.q6 || answers.q6 === 0) {
            alert("请选择【金蚀-机械姬】满意度");
            return;
        }
        if (!answers.q7 || answers.q7 === 0) {
            alert("请选择获知渠道");
            return;
        }
        if (answers.q7 === 11 && !answers.q7_text) {
            alert("请填写其他获知渠道");
            return;
        }
        if (answers.q7 != 11) {
            answers.q7_text = $("#fk7 p").eq(answers.q7 - 1).text();
        }
        if (answers.q7_text.length > 50) {
            alert("获知本次活动的消息来源过长，请重新填写");
            return;
        }
        if (answers.q8.length > 300) {
            alert("建议或意见过长，请重新填写");
            return;
        }
        console.log("提交的答案：", answers);
        closeDialog();
        doAmsSubmit({
            token: 'fktj',
            loading: true, // 开启loading浮层,默认不开启
            sData: {
                iQuestion1: answers.q1,
                iQuestion2: answers.q2,
                iQuestion3: answers.q3,
                sQuestion4: encodeURIComponent(answers.q4.join(",")),
                iQuestion5: answers.q5,
                iQuestion6: answers.q6,
                sQuestion7: encodeURIComponent(answers.q7_text),
                sQuestion8: encodeURIComponent(answers.q7)
            },
            success: function (res) {
                alert("反馈成功~");
                Hx.init();
            }
        })
    },
    fklq: function () {
        doAmsSubmit({
            token: "fklq",
            success: function (res) {
                var jData = res.details.jData;
                alert(res.sMsg);
                Hx.init();
            }
        })
    },
    goActTq: function () {
        // var url = "https://act.daoju.qq.com/act/a20251224cfactivity/index.html";
        // if (milo.request("neiqian") == 1) {
        //     //游戏内登录态
        //     var params = {
        //         algorithm: milo.request("algorithm"),
        //         encode: milo.request("encode"),
        //         channelid: milo.request("channelid"),
        //         gameid: milo.request("gameid"),
        //         os: milo.request("os"),
        //         ts: milo.request("ts"),
        //         version: milo.request("version"),
        //         sig: milo.request("sig"),
        //         itopencodeparam: milo.request("itopencodeparam"),
        //     }
        //     url += "&" + $.param(params);
        // }
        //window.open(url);
        alert("敬请期待");
    }

}

function queryBroadcast() {
    var flow = {
        actId: Milo.aParams.amsActId,
        token: 'lunbo',
        loading: true, // 开启loading浮层,默认不开启
        time: 50, // 轮播时间
        sData: {
            // query: false
        },
        customDom: {
            broadcastId: "milo-broadcast",
            broadcastContentId: "milo-broadcast-container"
        },
        success: function (res) {
            console.log('查询轮播success', res);
        },
        fail: function (res) {
            console.log('查询轮播fail', res);
        }
    }
    Milo.emit(flow);
}

//保存图片
function saveImageWithText(djimg, ewmimg, labelimg, textParts) {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();

    img1.crossOrigin = "anonymous"; // 跨域设置，确保canvas不被污染
    img2.crossOrigin = "anonymous";
    img3.crossOrigin = "anonymous";

    // img1.src = "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/lot/fc_yx1.png" + '?t=' + Date.now();
    // img2.src = "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/ewm.png" + '?t=' + Date.now();
    // img3.src = "https://game.gtimg.cn/images/actdaoju/act/a20251224cfactivity/label1.png" + '?t=' + Date.now();

    img1.src = djimg + '?t=' + Date.now();
    img2.src = ewmimg + '?t=' + Date.now();
    img3.src = labelimg + '?t=' + Date.now();

    let imagesLoaded = 0;

    function onImageLoad() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 设置canvas尺寸为第一张图片尺寸
            canvas.width = img1.naturalWidth;
            canvas.height = img1.naturalHeight;
            //设置x坐标间隔距离
            const space_x = 10;
            // 先绘制第一张图片
            ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);

            // 绘制第二张图片
            const img2_w = img2.naturalWidth;
            const img2_h = img2.naturalHeight;
            const img2_px = 20;
            const img2_py = canvas.height - (img2_h + 10);
            ctx.drawImage(img2, img2_px, img2_py, img2_w, img2_h);
            // 绘制第三张图片
            const img3_w = img3.naturalWidth * 70 / 100;
            const img3_h = img3.naturalHeight * 70 / 100;
            const img3_px = img2_w + img2_px + space_x;
            const img3_py = canvas.height - (img3_h + 10);
            ctx.drawImage(img3, img3_px, img3_py, img3_w, img3_h);

            // 绘制文字
            // const textParts = [
            //     { text: "累计抽奖 ", color: "#000", line: 0 , font: "36px Arial" },
            //     { text: "56 ", color: "red", line: 0 , font: "36px Arial" },
            //     { text: "次获得", color: "#000", line: 0 , font: "36px Arial" },
            //     { text: "上海一区 小兵张三", color: "#000", line: 1 , font: "24px Arial" },
            // ];

            const lineHeight = 40; // 行高
            const startX = img3_px + img3_w + space_x; // 每行起始x坐标

            // 记录每行当前x坐标
            const lineX = [startX, startX];

            textParts.forEach(part => {
                const line = part.line;
                ctx.font = part.font;
                ctx.fillStyle = part.color;
                ctx.textBaseline = "top";
                ctx.fillText(part.text, lineX[line], line * lineHeight + img3_py);
                // 更新当前行的x坐标
                lineX[line] += ctx.measureText(part.text).width;
            });

            // 转换为下载链接
            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                // 修改后：
                const timestamp = new Date()
                    .toISOString()
                    .replace(/T/, '-') // 替换T为横杠
                    .replace(/\..+/, '') // 去除小数点后的部分
                    .replace(/:/g, ''); // 去除冒号
                link.download = `分享图-${timestamp}.png`;
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

/**
 * 根据数值计算对应的进度百分比
 * @param {number} num - 输入数值
 * @returns {number} 对应的进度百分比(0-100)
 */
function calculateProgress(num, progressRanges) {
    // 定义数值与进度的对应关系(按数值升序排列)
    // const progressRanges = [
    //     { value: 0, progress: 0 },
    //     { value: 25, progress: 13 },
    //     { value: 55, progress: 20 },
    //     { value: 85, progress: 30 },
    //     { value: 120, progress: 50 },
    //     { value: 200, progress: 70 },
    //     { value: 300, progress: 90 },
    //     { value: 400, progress: 100 }
    // ];

    // 边界检查
    if (num <= progressRanges[0].value) {
        return progressRanges[0].progress;
    }
    if (num >= progressRanges[progressRanges.length - 1].value) {
        return progressRanges[progressRanges.length - 1].progress;
    }

    // 查找所在区间
    for (let i = 0; i < progressRanges.length - 1; i++) {
        const current = progressRanges[i];
        const next = progressRanges[i + 1];

        if (num >= current.value && num < next.value) {
            // 线性插值计算
            const ratio = (num - current.value) / (next.value - current.value);
            return current.progress + (next.progress - current.progress) * ratio;
        }
    }

    return 100; // 默认返回最大值
}



function popActEndTips(el, callback) {
    $("#" + el).find("a").addClass("gray");
    $("#" + el).find("a").attr("href", "javascript: void(0);");
    window.popActEndTipscall = function () {
        closeDialog();
        $.isFunction(callback) && callback();
    }
    if (Milo.aParams.interval) {
        clearInterval(Milo.aParams.interval);
    }
    var ishow = 3;
    // 每秒更新倒计时
    Milo.aParams.interval = setInterval(() => {
        ishow--;
        $("#" + el).find(".p_time").html("倒计时:" + ishow + "秒");
        // 倒计时结束
        if (ishow === 0) {
            $("#" + el).find("a").removeClass("gray");
            clearInterval(Milo.aParams.interval);
            $("#" + el).find("a").attr("href", "javascript:popActEndTipscall();");
        }
    }, 1000);
    TGDialogS(el);
}


//获得大区名称
function getAreaName(area) {
    return CFServerSelect.zoneToName(area);
}

//================================问卷 start =========================================
// 初始化所有评分和选择功能
function initAllQuestions() {
    if (!window.totalOptionsloading) {

        // 5星评分题
        initRating1("1");
        initRating1("5");
        initRating1("6");

        // 二选一单选题
        initRating2("2");
        initRating2("3");

        // 多选题- x个选项，最多选5项，最后一项互斥
        initMultiSelect("4", 11, 5);

        // 单选题- 11个选项，单选
        // 初始化时隐藏其他输入框
        $("#fk7 input").hide();
        initSingleSelect("7");
        window.totalOptionsloading = 1;
    }
}

// 5星评分功能
function initRating1(containerId) {
    $("#fk" + containerId).on("click", "li", function () {
        var className = "cur";
        var _index = $(this).index() + 1;
        var $container = $("#fk" + containerId);

        $container.find("a").removeClass(className);

        for (let i = 0; i < _index; i++) {
            $("#fk" + containerId + " a").eq(i).addClass(className);
        }

        Hx.question[containerId] = _index;
        console.log(Hx.question);
    });
}

// 二选一功能
function initRating2(containerId) {
    $("#fk" + containerId).on("click", "li", function () {
        var className = "cur";
        var _index = $(this).index();
        var $container = $("#fk" + containerId);

        $container.find("a").removeClass(className);
        $(this).find("a").addClass(className);

        Hx.question[containerId] = _index ? "1" : "-1";
        console.log(Hx.question);
    });
}

// 多选题功能（11个选项，最多选5项，最后一项互斥）
function initMultiSelect(containerId, totalOptions, maxSelect) {
    $("#fk" + containerId).on("click", "div", function () {
        var _index = $(this).index() + 1;
        var $container = $("#fk" + containerId);
        var $clickedItem = $(this).find("a");
        var className = "cur";
        // 如果是最后一项（第11项）
        if (_index === totalOptions) {
            // 清空之前的所有选择
            $container.find("a").removeClass(className);
            // 只选中最后一项
            $clickedItem.addClass(className);
            // 存储选择结果（只包含最后一项）
            Hx.question[containerId] = [totalOptions];
        } else {
            // 获取当前已选中的选项
            var selectedItems = $container.find("a." + className);
            var currentSelected = [];
            selectedItems.each(function () {
                currentSelected.push($(this).closest("div").index() + 1);
            });

            // 如果已经选择了最后一项，需要先清除
            if (currentSelected.includes(totalOptions)) {
                $container.find("a").removeClass(className);
                currentSelected = [];
            }

            // 检查是否已经选中了当前点击的选项
            var isAlreadySelected = $clickedItem.hasClass(className);

            if (isAlreadySelected) {
                // 如果已经选中，则取消选中
                $clickedItem.removeClass(className);
                currentSelected = currentSelected.filter(item => item !== _index);
            } else {
                // 如果未选中，检查是否已达到最大选择数量
                if (currentSelected.length >= maxSelect) {
                    alert("最多只能选择" + maxSelect + "个选项");
                    return;
                }
                // 选中当前点击的选项
                $clickedItem.addClass(className);
                currentSelected.push(_index);
            }

            // 存储选择结果
            Hx.question[containerId] = currentSelected;
        }

        console.log(Hx.question);
    });
}

// 单选题功能（fk6）
function initSingleSelect(containerId) {
    $("#fk" + containerId).on("click", "div", function () {
        var className = "cur";
        var _index = $(this).index() + 1;
        var $container = $("#fk" + containerId);

        // 清空所有选择
        $container.find("a").removeClass(className);
        // 选中当前点击的选项
        $(this).find("a").addClass(className);

        // 如果是"其他"选项，显示输入框
        if (_index === 11) {
            $("#fk" + containerId + " input").show().focus();
        } else {
            $("#fk" + containerId + " input").hide().val("");
        }

        // 存储选择结果
        Hx.question[containerId] = _index;

        console.log(Hx.question);
    });
}
//问卷选择切换==========================================================end


document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        console.log('Esc键被按下');
        // 进一步处理代码
        if (Milo.is_Esc == 1) {
            Milo.is_Esc = 0;
            Hx.init();
        }
    }
});