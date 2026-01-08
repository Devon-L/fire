
var keys = 0, jf = 0, hlz = 0, hlzt = 0, hlk = 0;//钥匙 积分 个人幻灵值 团队幻灵值 幻灵卡
var itemsX = [];
const items_b = [0];//看是否发送或分解 0无 1发送 2分解
var pagesid = 1, totalPagesX = 1;//当前页 总页数

milo.ready(function () {
    var time1 = milo.request("time1") ? new Date(milo.request("time1") + " 00:00:00").getTime() :  milo.getSeverDateTime().getTime();
    Milo.aParams = {
        amsActId: "751072",
        hsActId: "42206",
        hsActId2: "42260",
        bizCode: "cf",
        urlimg: "https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/",
        share: {
            title: '8.6�����˹��ڣ�������',
            desc: '�ٳǶ�����������������M200-������Kar98K-��������ʱ����ֱ����',
            link: "https://app.daoju.qq.com/act/a20250718xbtz/index.html",
            icon: "https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/share.jpg",
        },
        lotteryMap: {
            "6695446": { "imgNum": "1", "show": "1", "class": "", "name": "�����転" },
            "6695906": { "imgNum": "2", "show": "2", "class": "", "name": "����" },
            "6695908": { "imgNum": "3", "show": "3", "class": "", "name": "SCAR Light-����" },
            "6695909": { "imgNum": "4", "show": "4", "class": "cur1", "name": "����������-��Ӱ˫��" },
            "6695911": { "imgNum": "5", "show": "5", "class": "cur1", "name": "Anaconda-����" },
            "6695912": { "imgNum": "6", "show": "6", "class": "cur1", "name": "Scar Light-�׻�-����" },
            "6695914": { "imgNum": "7", "show": "7", "class": "cur2", "name": "ϡ�н�ɫͨ����չ��λx1" },
            "6695927": { "imgNum": "8", "show": "8", "class": "cur2", "name": "�߼���ɫͨ����չ��λx1" },
            "6695939": { "imgNum": "9", "show": "9", "class": "cur2", "name": "����ذ��-����" },
            "6695940": { "imgNum": "10", "show": "10", "class": "cur2", "name": "������-����" },
            "6695942": { "imgNum": "11", "show": "11", "class": "cur2", "name": "�߱�����-����" },
            "6695943": { "imgNum": "12", "show": "12", "class": "cur2", "name": "���ⵯ-����" },
            "6695944": { "imgNum": "13", "show": "0", "class": "", "name": "����֮ʯ����x1" },
            "6695945": { "imgNum": "14", "show": "0", "class": "", "name": "����x100" },
            "6695949": { "imgNum": "15", "show": "0", "class": "", "name": "����x15" },
            "6695951": { "imgNum": "16", "show": "0", "class": "", "name": "����x9" },
            "6695952": { "imgNum": "17", "show": "0", "class": "", "name": "����x8" },
            "6695954": { "imgNum": "18", "show": "0", "class": "", "name": "����x7" }
        }
    }
    if (milo.request("debug") == 1) {
        Milo.showVConsole();
    }

    //alert = Milo.sAlert;
    //confirm = Milo.sConfirm;
    //�޸ĵ���
    window.alert = function (msg, callback) {
        if (msg == "ok") {
            return;
        }
        $("#alert .msg").html(msg);
        window.alert_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#alert a.fc_btnqd2").attr("href", "javascript: window.alert_call();");
        TGDialogS('alert');
    }
    window.confirm = function (msg, callback) {
        $("#confirm .msg").html(msg);
        window.confirm_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#confirm .fc_btnqd1").attr("href", "javascript: window.confirm_call();");
        TGDialogS('confirm');
    }

    window.confirm_dt = function (msg, callback, ishow = 5) {
        $("#confirm_dt .msg").html(msg);
        window.confirm_dt_call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        $("#confirm_dt .p_time").html("����ʱ��" + ishow);
        $("#confirm_dt .fc_btnqd1").addClass("gray");
        $("#confirm_dt .fc_btnqd1").attr("href", "javascript: void(0);");
        if (Milo.aParams.interval) {
            clearInterval(Milo.aParams.interval);
        }
        // ÿ�����µ���ʱ
        Milo.aParams.interval = setInterval(() => {
            ishow--;
            $("#confirm_dt .p_time").html("����ʱ��" + ishow);
            // ����ʱ����
            if (ishow === 0) {
                $("#confirm_dt .fc_btnqd1").removeClass("gray");
                clearInterval(Milo.aParams.interval);
                $("#confirm_dt .fc_btnqd1").attr("href", "javascript: window.confirm_dt_call();");
            }
        }, 1000);
        TGDialogS('confirm_dt');
    }

    Milo.bindInfo = {};
    if (Milo.isMobile() && location.hostname == "act.daoju.qq.com" && milo.request("test") != 1) {
        location.href = "https://app.daoju.qq.com/act/a20250718xbtz/index.html";
    }
    if (!Milo.isMobile() && location.hostname == "app.daoju.qq.com" && milo.request("test") != 1) {
        location.href = "index.html";
    }
    if (Milo.isDJApp() && milo.request("plat_support") != "mqq") {
        location.href = "https://app.daoju.qq.com/act/a20250718xbtz/index.html?plat_support=mqq";
    }

    if (Milo.isMobile()) {
        Milo.shareInit(Milo.aParams.share);
    }

    var time3 = new Date("2025/08/26 00:00:00").getTime();
    if (time1 >= time3) {
        poptext22(function () {

            Milo.dologin(function () {
                $("#login_qq_span").html(Milo.userInfo.nickName);
                $("#userinfo").html(Milo.userInfo.nickName);
                if (Milo.isDJApp()) {
                    $("#ptLogoutBtn,#btn_logout,#dologout").hide();
                }
                Hx.bindinit();
            })
        })
    } else {
        Milo.dologin(function () {
            $("#login_qq_span").html(Milo.userInfo.nickName);
            $("#userinfo").html(Milo.userInfo.nickName);
            if (Milo.isDJApp()) {
                $("#ptLogoutBtn,#btn_logout,#dologout").hide();
            }
            Hx.bindinit();
        })
    }


    need(["ams.daoju_buy_v2.appid"], function (autoappid) {
        autoappid.init(Milo.aParams.bizCode, Milo.aParams.hsActId, function (final_appid) {
            console.log(final_appid)
        });
    })


    //�ж���ʾ
    var time2 = new Date("2025/08/09 00:00:00").getTime();
    if (time1 >= time2) {
        $(".btn_top a").removeClass("cur");
        $(".btn_top a.btnnv2").addClass("cur");
        if (location.pathname == "index.html") {
            $(".wrap2").removeClass('cur3');
            $(".wrap2").removeClass('cur4');
            $(".wrap2").addClass('cur2');
            $('.box_nav2').show();
            $('html, body').animate({
                scrollTop: 900
            }, 400);
        }
        if (location.pathname == "neiqian.html") {
            $(".nqwrap").removeClass('cur3');
            $(".nqwrap").addClass('cur2');
            $(".nqwrap").removeClass('cur4');
        }
        if (location.hostname == "app.daoju.qq.com") {
            $(".wrap1").removeClass('cur3');
            $(".wrap1").addClass('cur2');
            $(".wrap1").removeClass('cur4');
        }
        $('.cont').hide();
        $('.cont').eq(1).show();
        $(".p2_btn_box1 p").hide();
        $(".p2_time").hide();
        queryBroadcast(1);

        Milo.aParams.share = {
            title: '������Ϯ���Ƶ���˫',
            desc: '17����������װ��ȫ���׷�',
            link: "https://app.daoju.qq.com/act/a20250718xbtz/index.html",
            icon: "https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/share2.jpg",
        }
        $(".hui").removeClass("hui");
        $(".box_nav1").hide();
    }

})

var Hx = {
    //��ѯ�Ƿ��󶨵�����
    bindinit: function () {
        doAmsSubmit({
            token: 'bindinit',
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                query: true
            },
            success: function (res) {
                //������Ƕ��ת
                if (milo.request('neiqian') == 1 && top.location == location && milo.request('gc') != 1) {
                    var curHtmlUrl = window.location.href;
                    if (curHtmlUrl.indexOf("hdnq.html") >= 0) {
                    } else {
                        window.location.href = "https://cf.qq.com/act/a20160516ntclsacts/new_index.htm";
                    }
                }
                //�Ѱ���ʱ����չ����
                if (res.details.jData.bindarea) {
                    Hx.bindcall(res.details.jData.bindarea);
                } else {
                    Hx.bind();
                }
            }
        });
    },
    //�ύ�󶨵�����
    bind: function () {
        doAmsSubmit({
            token: 'bind',
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                query: false
            },
            success: function (res) {
                console.log(res)
                Hx.bindcall(res.details.jData.bindarea);
            }
        });
    },
    bindcall: function (data) {
        Milo.bindInfo = {
            sArea: data.Farea,
            sRole: data.FroleId
        };
        var iRoleName = decodeURIComponent(decodeURIComponent(data.FareaName)) + "-" + decodeURIComponent(decodeURIComponent(data.FroleName));
        Hx.iRoleName = iRoleName;
        Hx.FareaName = decodeURIComponent(decodeURIComponent(data.FareaName));
        Hx.FroleName = decodeURIComponent(decodeURIComponent(data.FroleName));
        $("#milo-roleName").html(iRoleName);
        $("#milo-binded").show();
        $("#milo-unbind").hide();
        $("#login_qq_span").html(data.Fuin);
        $("#userinfo").html(data.Fuin);
        $("#unlogin").hide();
        $("#logined").show();
        if (Milo.get("text23_" + Milo.bindInfo.sRole) == "text23") {
            $("#lotteryShow a").addClass("cur");
        } else {
            $("#lotteryShow a").removeClass("cur");
        }
        $('#inputCopyRoleName').val(decodeURIComponent(decodeURIComponent(data.FroleName)));

        Hx.init();
        Hx.teaminit();
        Hx.teamresh();
        //$(".hui").removeClass("hui");
    },
    pop1: function () {
        Milo.dologin(function (user) {

            if (location.hostname == "act.daoju.qq.com") {
                var url = "https://act.daoju.qq.com/act/a20190301yqrh/pop.html?sorce=pc"
                if (user.userInfo.acctype == "qc") {
                    url += "&type=qc"
                }
                $("#text1 .iframe").html('<iframe class="iframe1" frameborder="0" height="800px" src="' + url + '" width="810px"></iframe>');
                TGDialogS("text1");
            } else {
                var url = "https://app.daoju.qq.com/act/a20190301yqrh/pop.html"
                if (Milo.isDJApp()) {
                    url += "?plat_support=mqq";
                    if (user.userInfo.acctype == "qc") {
                        url += "&type=qc"
                    }
                } else {
                    if (user.userInfo.acctype == "qc") {
                        url += "?type=qc"
                    }
                }
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
                Hx.hold_arr = holdarr;
                //Կ������
                Hx.jf_7365 = parseInt(jfarr[7365]['ticket']);
                $(".jf_7365").html(Hx.jf_7365);
                //��������
                Hx.jf_7366 = parseInt(jfarr[7366]['ticket']);
                $(".jf_7366").html(Hx.jf_7366);
                //����֮ʯ����
                Hx.jf_7368 = parseInt(jfarr[7368]['ticket']);
                $(".jf_7368").html(Hx.jf_7368);

                //��������
                Hx.jf_7370 = parseInt(jfarr[7370]['ticket']);
                $(".jf_7370").html(Hx.jf_7370);
                //������������������������
                Hx.jf_7371 = parseInt(jfarr[7371]['ticket']);
                $(".jf_7371").html(Hx.jf_7371);
                //����������������ҳ������
                Hx.jf_7375 = parseInt(jfarr[7375]['ticket']);
                $(".jf_7375").html(Hx.jf_7375);
                //��������������ȯ��ҳ������
                Hx.jf_7376 = parseInt(jfarr[7376]['ticket']);
                $(".jf_7376").html(Hx.jf_7376);
                //����������Ͷ������
                Hx.jf_7394 = parseInt(jfarr[7394]['ticket']);
                $(".jf_7394").html(Hx.jf_7394);
                //��������������֮ʯ
                Hx.jf_7419 = parseInt(jfarr[7419]['ticket']);
                $(".jf_7419").html(Hx.jf_7419);
                //���ۼƹ�������
                $(".jf_7371_jf_7375").html(Hx.jf_7371 + Hx.jf_7375);
                //�ۼƽ���δ��ȡ

                //�羺װ������
                Hx.jf_7372 = parseInt(jfarr[7372]['ticket']);
                $(".jf_7372").html(Hx.jf_7372);
                //�羺װ������������������
                Hx.jf_7373 = parseInt(jfarr[7373]['ticket']);
                $(".jf_7373").html(Hx.jf_7373);
                //�羺װ������������֮ʯ
                Hx.jf_7421 = parseInt(jfarr[7421]['ticket']);
                $(".jf_7421").html(Hx.jf_7421);
                //��������ä��
                Hx.jf_7374 = parseInt(jfarr[7374]['ticket']);
                $(".jf_7374").html(Hx.jf_7374);

                //����ȯ
                Hx.jf_2327 = parseInt(jData['jf_2327']);
                $(".jf_2327").html(Hx.jf_2327);
                //������Ƭ
                Hx.jf_6759 = parseInt(jData['jf_6759']);
                $(".jf_6759").html(Hx.jf_6759);

                //��������
                if (parseInt(jfarr[7367]['ticket']) > 0) {
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
                var fjMap = [];
                $.each(jData.fjMap, function (k, v) {
                    fjMap.push(v);
                })
                fjMap.sort(function (a, b) {
                    return b["jfNum"] - a["jfNum"];
                });
                // $("#text2 .fjmap").html("");
                // $.each(fjMap, function (k, v) {
                //     $("#text2 .fjmap").append("<p><span>" + v["name"] + "</span><span>" + v["jfNum"] + "</span></p>");
                // })
                //���ֶһ�map
                Hx.dhMap = jData.dhMap;

                //��������ä�г齱
                if (Hx.jf_7374 > 0) {
                    Hx.autodj();
                }

                //ֱ���ۼƽ�����ȡ
                var buy_lj_lun1 = parseInt(holdarr["buy_lj_lun1"]["iUsedNum"]);
                $("#buy_level_lq a").removeClass("gray").html("������ȡ");
                if (buy_lj_lun1 < 8) {
                    $("#buy_lj_lun").html("��1/2��");
                    $.each([1, 2, 3, 4, 5, 6, 7, 8], function (k, v) {
                        if (parseInt(holdarr["buy_level_lq" + v]["iUsedNum"]) == "1") {
                            $("#buy_level_lq tr").eq(k).find("a").addClass("gray").html("����ȡ");
                        }
                    })
                } else {
                    $("#buy_lj_lun").html("��2/2��");
                    $.each([9, 10, 11, 12, 13, 14, 15, 16], function (k, v) {
                        if (parseInt(holdarr["buy_level_lq" + v]["iUsedNum"]) == "1") {
                            $("#buy_level_lq tr").eq(k).find("a").addClass("gray").html("����ȡ");
                        }
                    })
                }



                $.isFunction(callback) && callback();

            },
            fail: function (res) {

            }
        })
    },
    buyKey: function (propid, dikou) {
        var obj = {
            propid: propid, // ����id
            buyNum: "1", // ����������������Ϊ1��
            gameId: Milo.aParams.bizCode, // ҵ������
            jifen_dikou: 0, // �Ƿ�ʹ�û��ֵֿ�1�� 0��
            jifen_amount: 0, // �û������Ļ��ֵֿ�����
            jifen_channel: 2327,
            djcActId: Milo.aParams.hsActId, // ���۳ǻid
            paytype: "2", // 1����ȯ 2�������� 3������ 4����ȯ+���� 5������2
            appext: "",
            //code: code
        }
        if (dikou == 1) {
            var cut_price = 1000;
            if (Hx.jf_2327 >= 9) {
                cut_price = 100;
                obj.jifen_dikou = 1;
            } else if (Hx.jf_2327 >= 1) {
                cut_price = 1000 - 100 * Hx.jf_2327;
                obj.jifen_dikou = 1;
            } else {
                cut_price = 1000;
                obj.jifen_dikou = 1;
            }
            if (propid == "1222914") {
                cut_price = 1000;
                obj.jifen_dikou = 90;
            }
            obj.appext = encodeURI(JSON.stringify({
                "user_price": cut_price,
            }));
        }
        doAmsSubmit({
            token: 'buykey',
            sData: obj,
            // ֧�������رջص�
            onPayClose: function () {

            },
            success: function (res) {
                console.log(res);
                setTimeout("Hx.init();", 2000);
            },
            fail: function (res) {
                if (res.iRet == -720232) {
                    alert("��������̫���ˣ����Ժ�����~");
                    Hx.init();
                    return;
                }
                if (res.iRet == -201) {
                    alert("��Ǹ��ϵͳ��æ��");
                    return;
                }
                alert(res.sMsg);
            }
        })
    },
    buyxb: function (propid, dikou) {
        var obj = {
            propid: propid, // ����id
            buyNum: "1", // ����������������Ϊ1��
            gameId: Milo.aParams.bizCode, // ҵ������
            jifen_dikou: 0, // �Ƿ�ʹ�û��ֵֿ�1�� 0��
            jifen_amount: 0, // �û������Ļ��ֵֿ�����
            jifen_channel: 2327,
            djcActId: Milo.aParams.hsActId2, // ���۳ǻid
            paytype: "2", // 1����ȯ 2�������� 3������ 4����ȯ+���� 5������2
            appext: "",
            //code: code
        }
        if (dikou == 1) {
            var cut_price = 16900;
            obj.jifen_dikou = 30;
            obj.appext = encodeURI(JSON.stringify({
                "user_price": cut_price
            }));
        }
        doAmsSubmit({
            token: 'buyxb',
            sData: obj,
            // ֧�������رջص�
            onPayClose: function () {

            },
            success: function (res) {
                console.log(res);
                setTimeout("Hx.init();", 2000);
            },
            fail: function (res) {
                if (res.iRet == -720232) {
                    alert("��������̫���ˣ����Ժ�����~");
                    Hx.init();
                    return;
                }
                if (res.iRet == -201) {
                    alert("��Ǹ��ϵͳ��æ��");
                    return;
                }
                alert(res.sMsg);
            }
        })
    },
    //�����س齱
    show_dj: {
        "dj_arr": [],
        "big_arr": []
    },
    lottery: function (num) {
        Milo.dologin(function () {
            var jf = $(".jf_7365").html();
            if (jf < num) {
                alert("��Ǹ��Կ�ײ��㡣");
                return;
            }
            doAmsSubmit({
                token: 'lottery',
                sData: {
                    "num": num
                },
                success: function (res) {
                    var jData = res.details.jData;
                    var iPackageId = jData.lottery.iSeqPackageId.split(",");
                    var nTotalInALL = parseInt(jData.nTotalInALL);
                    var arr = [];
                    $.each(iPackageId, function (k, v) {
                        if (v) {
                            var val = v.split(":");
                            arr.push({
                                id: val[0],
                                name: Milo.aParams.lotteryMap[val[0]]["name"],
                                imgNum: Milo.aParams.lotteryMap[val[0]]["imgNum"],
                                show: Milo.aParams.lotteryMap[val[0]]["show"],
                                class: Milo.aParams.lotteryMap[val[0]]["class"],
                                nTotalInALL: nTotalInALL + k + 1
                            })
                        }
                    })
                    Hx.show_dj = {
                        "dj_arr": [],
                        "big_arr": []
                    };
                    $.each(arr, function (k, v) {
                        if (v.show != "0") {
                            Hx.show_dj.big_arr.push(v);
                        }
                        Hx.show_dj.dj_arr.push(v);
                    })
                    Hx.show_dj.big_arr.sort(function (a, b) {
                        return parseInt(a["show"]) - parseInt(b["show"]);
                    });
                    Hx.showLottery();
                }
            })
        })
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
        //1.չʾ����
        if ($("#lotteryShow a").hasClass("cur") && iCan != 1) {
            Hx.show_dj.big_arr = [];
        }
        var big_arr = Hx.show_dj.big_arr;
        if (big_arr.length > 0) {
            $("#text16 img").attr("src", "");
            var djimg = 'https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/fc_yx' + big_arr[0]["imgNum"] + '.png';
            $("#text16 img").attr("src", djimg);
            $("#text16 .fc_tit2").removeClass("cur1 cur2");
            $("#text16 .fc_tit2").addClass(big_arr[0]["class"]);
            $("#text16 a.close_btn1").attr("href", "javascript: Hx.showLottery();");
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
            var ewm_img = "https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/ewm.png";
            var label_img = "https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/label" + label_num + ".png";
            var textParts = [
                { text: "�ۼƳ�ȡ", color: "#ffffff", line: 0, font: "36px Arial" },
                { text: nTotalInALL, color: "#FF6600", line: 0, font: "36px Arial" },
                { text: "�λ���", color: "#ffffff", line: 0, font: "36px Arial" },
                { text: Hx.FareaName + " " + Hx.FroleName, color: "#ffffff", line: 1, font: "24px Arial" }
            ];
            if (label_num == 4) {
                textParts = [
                    { text: Hx.FareaName + " " + Hx.FroleName, color: "#ffffff", line: 1, font: "24px Arial" }
                ];
            }
            if (location.hostname == "act.daoju.qq.com") {
                var imgName = 'fc_tit' + big_arr[0]["imgNum"] + '.png';
                $("#pc_qqZoneShare").attr("href", "javascript:pc_qqZoneShare('" + big_arr[0]["name"] + "','" + imgName + "')");
                Hx.pcSaveImg = function () {
                    saveImageWithText(djimg, ewm_img, label_img, textParts)
                }
                if (milo.request('neiqian') == 1) {
                    djimg = 'https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/fc_tit' + big_arr[0]["imgNum"] + '.png';
                    $("#text16 img").attr("src", djimg);
                    $("#text16 .fcbtn_box4").hide();
                }
            }
            if (location.hostname == "app.daoju.qq.com") {
                var result = milo.cookie.get("djc_appVersion") != null && milo.cookie.get("djc_appVersion") >= 170;
                if (!result) {
                    djimg = 'https://game.gtimg.cn/images/actdaoju/act/a20250718xbtz/fc_tit' + big_arr[0]["imgNum"] + '.png';
                    $("#text16 img").attr("src", djimg);
                    $("#text16 .fcbtn_box4").hide();
                } else {
                    Hx.djcAppShare = function () {
                        if (!result) {
                            alert("�����Ͻǹ��ܰ�ť���ɷ���ͼ����ҫ����ŷ��ʱ�̰�");
                            return;
                        }
                        if (label_num == 4) {
                            lotDescText = "";
                        } else {
                            lotDescText = "<div style=\"color: #ffffff; font-size: 36px;\">�ۼƳ�ȡ<span style=\"color: #FF6600; font-weight: bold;\">" + nTotalInALL + "</span>�λ���</div>";
                        }
                        var option = {
                            codeUrl: "https://app.daoju.qq.com/act/a20250718xbtz/index.html?plat_support=mqq",//  ��ά����ַ
                            labelUrl: label_img,// ��ǩ��ַ
                            lotDescText: lotDescText,//�ı���Ϣ����
                            userInfoText: "<div style=\"color: #ffffff; font-size: 24px;\">" + Hx.FareaName + " " + Hx.FroleName + "</div>",
                            lotImgUrl: djimg, // �н��󱳾�ͼ��ַ
                            qrSize: 100 ////��ά����СqrSize��������150��û����������Ĭ��Ϊ150
                        };

                        console.log(option);
                        HostApp.setJsCallBack('picShare', $.param(option), function (msg) {
                            $.isFunction(call) && call(msg);
                        });
                    }
                }
            }


            TGDialogS('text16');

            Hx.show_dj.big_arr.shift();
            return;
        }
        //2.չʾ����
        if (Hx.show_dj.dj_arr.length > 0) {
            var dj_arr = Hx.show_dj.dj_arr;
            if (dj_arr.length == 1) {
                $("#text15 .fc_box6").html("");
                $.each(dj_arr, function (k, v) {
                    var _html = '<li>\
                                    <img src="'+ Milo.aParams.urlimg + 'fc_polc' + v['imgNum'] + '.png" />\
                                </li>';
                    $("#text15 .fc_box6").html(_html);
                })
                $("#text15 a.close_btn").attr("href", "javascript: Hx.showLottery();");
                TGDialogS("text15");
                Hx.show_dj.dj_arr = [];
            } else {
                $("#text14 .fc_box6").html("");
                $.each(dj_arr, function (k, v) {
                    var _html = '<li>\
                                    <img src="'+ Milo.aParams.urlimg + 'fc_polc' + v['imgNum'] + '.png" />\
                                </li>';
                    $("#text14 .fc_box6").append(_html);
                })
                $("#text14 a.close_btn").attr("href", "javascript: Hx.showLottery();");
                TGDialogS("text14");
                Hx.show_dj.dj_arr = [];
            }
            return;
        }
        //4.չʾ���ر�
        closeDialog();
        Hx.init(1);
    },
    //�齱��¼
    gift: function (page) {
        if (page == "0") {
            return;
        }
        var str = $("#text3 .fcbtn_box1 a.cur").attr("data-str");
        doAmsSubmit({
            token: "gift",
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                pageNow: page,
                pageSize: 7,
                str: str
            },
            success: function (res) {
                console.log(res);
                var lottery = res.details.jData.lottery;
                $("#table" + str + " tbody").html("");
                // �ж��û��Ƿ���Ҫ�Զ����ṹ������Ҫ��Ĭ��ȡ�û��Լ������Ľṹ
                if (str == 1) {
                    if ($("#getGiftTemplate").length > 0) {
                        let tpl_html = $("#getGiftTemplate").html();
                        // ��Ⱦ����
                        const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                        $("#table" + str + " tbody").html(_html);
                    }
                } else {
                    if ($("#getGiftTemplate1").length > 0) {
                        let tpl_html = $("#getGiftTemplate1").html();
                        // ��Ⱦ����
                        const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                        $("#table" + str + " tbody").html(_html);
                    }
                }

                var pageTotal = parseInt(lottery.result.pageTotal);//��ҳ��
                var pageNow = parseInt(lottery.result.pageNow);//��ҳ��
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//��һҳ
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//��һҳ
                $("#table" + str + " tfoot .now_page").html(pageNow + "/" + pageTotal);
                //$("#text3 .total_page").html(pageTotal);
                $("#table" + str + " tfoot .btn_prev").attr("href", "javascript:Hx.gift(" + pre + ");");
                $("#table" + str + " tfoot .btn_next").attr("href", "javascript:Hx.gift(" + next + ");");
                TGDialogS("text3");
            }
        })
    },
    //�齱��¼
    gift5: function (page) {
        if (page == "0") {
            return;
        }
        doAmsSubmit({
            token: "gift",
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                pageNow: page,
                pageSize: 7,
                str: "djzj"
            },
            success: function (res) {
                console.log(res);
                var lottery = res.details.jData.lottery;
                $("#text21 tbody").html("");
                // �ж��û��Ƿ���Ҫ�Զ����ṹ������Ҫ��Ĭ��ȡ�û��Լ������Ľṹ
                if ($("#getGiftTemplate1").length > 0) {
                    let tpl_html = $("#getGiftTemplate1").html();
                    // ��Ⱦ����
                    const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                    $("#text21 tbody").html(_html);
                }
                var pageTotal = parseInt(lottery.result.pageTotal);//��ҳ��
                var pageNow = parseInt(lottery.result.pageNow);//��ҳ��
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//��һҳ
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//��һҳ
                $("#text21 tfoot .now_page").html(pageNow + "/" + pageTotal);
                //$("#text3 .total_page").html(pageTotal);
                $("#text21 tfoot .btn_prev").attr("href", "javascript:Hx.gift5(" + pre + ");");
                $("#text21 tfoot .btn_next").attr("href", "javascript:Hx.gift5(" + next + ");");
                TGDialogS("text21");
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
                pageSize: 10,
                str: "zcx",
            },
            success: function (res) {
                console.log(res);
                var lottery = res.details.jData.lottery;
                $("#getGiftContent2").html("");
                // �ж��û��Ƿ���Ҫ�Զ����ṹ������Ҫ��Ĭ��ȡ�û��Լ������Ľṹ
                if ($("#getGiftTemplate2").length > 0) {
                    let tpl_html = $("#getGiftTemplate2").html();
                    // ��Ⱦ����
                    const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                    $("#getGiftContent2").html(_html);
                }
                var pageTotal = parseInt(lottery.result.pageTotal);//��ҳ��
                var pageNow = parseInt(lottery.result.pageNow);//��ҳ��
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//��һҳ
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//��һҳ
                $("#text2 .now_page").html(pageNow + "/" + pageTotal);
                //$("#text2 .total_page").html(pageTotal);
                $("#text2 .now_page").attr("now_page", pageNow);
                $("#text2 .btn_prev").attr("href", "javascript:Hx.zcx(" + pre + ");");
                $("#text2 .btn_next").attr("href", "javascript:Hx.zcx(" + next + ");");
                TGDialogS("text2");
            }
        })
    },
    //�ݴ�����ȡ
    zcxlq: function (sid, name, item) {
        confirm("������ȡ���������棬�޷����أ���ȷ���Ƿ�����", function () {
            var msg = '��ȷ����ȡ��' + name + '������' + Hx.FareaName + '���µġ�' + Hx.FroleName + '������';
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
                            var page = $("#text2 .now_page").attr("now_page");
                            Hx.zcx(page);
                        });
                    }
                })
            }, 2)
        })
    },
    //�ݴ����ֽ�
    zcxfj: function (sid, name, item) {
        confirm("���ηֽ����������棬�޷����أ���ȷ���Ƿ�����", function () {
            var msg = '��ȷ���ֽ⡾' + name + '�����á�Կ�ס�' + Hx.fjMap[item]["jfNum"] + '������';
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
                        alert("��ϲ����Կ�ס�" + num, function () {
                            var page = $("#text2 .now_page").attr("now_page");
                            Hx.zcx(page);
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
            var jf = parseInt($(".jf_7366").html());
            if (jf < parseInt(Hx.dhMap[item]["jfNum"])) {
                alert("��Ǹ�����ֲ��㡣");
                return;
            }
            confirm("���ζһ����������棬�޷����أ���ȷ���Ƿ�����", function () {
                var msg = '��ȷ��ʹ�á����֡�' + Hx.dhMap[item]["jfNum"] + '���һ���' + Hx.dhMap[item]["name"] + '������' + Hx.FareaName + '���µġ�' + Hx.FroleName + '������';
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
    //��ȡ����֮ʯ����
    lqbox: function () {
        doAmsSubmit({
            token: "lqbox",
            success: function (res) {
                var jData = res.details.jData;
                var iPackageId = jData.lottery.result.iPackageId;
                var sPackageName = jData.lottery.result.sPackageName;
                alert(res.sMsg);
                Hx.init();
            }
        })
    },
    //�ʾ���д�����ύ
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
        '10': '',
        '11': '',
        '12': '',
        '13': '',
        '14': '',
        '15': ''
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
        if ($.inArray(Hx.question["11"], [1, 2, 3, 4, 5]) == -1) {
            alert("����11δѡ��");
            return;
        }
        if ($.inArray(Hx.question["12"], [1, 2, 3, 4, 5]) == -1) {
            alert("����12δѡ��");
            return;
        }
        if ($.inArray(Hx.question["13"], [1, 2, 3, 4, 5]) == -1) {
            alert("����13δѡ��");
            return;
        }
        //��Դ
        var question_source = Hx.question["14"];
        var question_text = '';
        if ($.inArray(question_source, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) == -1) {
            alert("����14δѡ��");
            return;
        }
        if (question_source == 11) {
            question_text = $('#question14_text').val();
        } else {
            question_text = ['���ϴ�Խ����', '���ϵ��۳�', '����/��̳/QQȺ', '����', 'Wegame����', '��Ϸ�ڻ����', '��Ƶƽ̨����Bվ������������', '�ٷ�΢�ź͹ٷ�΢��', '���ѷ���', 'ֱ��ƽ̨���绢��������', '����������д��'][question_source - 1];
        }
        if (question_text == '') {
            alert("����д���Ǵ�������֪���λ����Ϣ");
            return;
        }
        if (question_text.length > 50) {
            alert("��֪���λ����Ϣ��Դ��������������д");
            return;
        }
        //����
        Hx.question["15"] = $('#question15_text').val();

        if (Hx.question["15"].length > 300) {
            alert("������������������������д");
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
                iQuestion11: Hx.question["11"],
                iQuestion12: Hx.question["12"],
                iQuestion13: Hx.question["13"],
                sQuestion14: encodeURIComponent(question_text),
                sQuestion15: encodeURIComponent(Hx.question["15"])
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
                alert(res.sMsg);
                Hx.init();
            }
        })
    },
    //�����׹���ȡ
    douyinsend: function () {
        doAmsSubmit({
            token: "douyinsend",
            success: function (res) {
                var jData = res.details.jData;
                alert(res.sMsg);
                Hx.init();
            }
        })
    },
    /**************************************************************���Ų���*************************************************************************************************** */
    team_jfnum: 36,//����/�������Ļ�����
    //��ѯ�Ŷ���Ϣ
    teaminit: function () {
        doAmsSubmit({
            token: "teaminit",
            success: function (res) {
                var data = res.details.jData;

                $('#my_teamid,#inputCopyText').val('');
                $('#teamTime').html("����ʱ��:������");
                $('#myGiftName').html('xxx');
                $('#teamlist').html('');
                $('#teamlq').removeClass('gray').html('��ȡƴ�Ž���');
                if (typeof data.code != 'undefined' && data.code == 0) {
                    //�����ĳɹ�
                    $('#teamTime').html("����ʱ��:" + data.showData.dtAddTime)
                    $('#my_teamid').val(data.showData.sTeamId);
                    $('#inputCopyText').val("������װƴ��-" + data.showData.sTeamId);
                    $('#myGiftName').html(data.showData.myGiftName);
                    //�ҵ��Ŷ��б���Ⱦ
                    var _html = ''
                    $.each(data.showData.list, function (k, v) {
                        _html += '<tr>\
									<td>' + v.sOpenid + ' </td>\
                                    <td>' + decodeURIComponent(v.sRoleName) + '</td>\
                                    <td>' + v.sPackageName + '</td>\
                                </tr>';
                    })
                    $('#teamlist').html(_html)

                    if (data.hold > 0) {
                        $('#teamlq').addClass('gray').html('����ȡ')
                    }
                }
            },
            fail: function (res) {

            }
        })
    },
    //��ѯ�Ƽ���
    teamresh: function () {
        doAmsSubmit({
            token: "teamresh",
            success: function (res) {
                var data = res.details.jData;
                var _html = ''
                $('#support_list').html("");
                $.each(data.data, function (k, v) {
                    _html += '<tr>\
                                <td>'+ v.sTeamId + '</td>\
                                <td><a href="javascript:Hx.teamjoin(\'' + v.sTeamId + '\');">��������</a></td>\
                            </tr>';

                })
                $('#support_list').html(_html);
            },
            fail: function (res) {

            }
        })
    },
    //���ƹ���
    copy_team: function () {
        if ($('#my_teamid').val() != "" && $('#inputCopyText').val() != "") {
            var my_teamid = document.getElementById('inputCopyText');
            my_teamid.select();
            if (document.execCommand("copy")) {
                alert('�Ѹ��ƺã�����ճ');
            } else {
                alert('���ֶ����Ƶ�������')
            }
        } else {
            alert("����û���Ŷ�ID");
        }
    },
    //�����Ŷ�
    teamcreate: function () {
        confirm("ȷ������" + Hx.team_jfnum + "���ִ����Ŷ�����", function () {
            doAmsSubmit({
                token: "teamcreate",
                success: function (res) {
                    var data = res.details.jData;
                    alert(data.sMsg, function () {
                        Hx.teaminit();
                        Hx.init();
                    })
                }
            })
        })
    },
    //�����Ŷ�
    teamjoin: function (teamid) {
        if (!teamid) {
            teamid = $('#join_teamid').val().trim();
        }
        if (teamid.indexOf('-') >= 0) {
            teamid = teamid.split("-")[1].trim();
        }
        if (teamid != '') {
            confirm("ȷ������" + Hx.team_jfnum + "���ּ��롾" + teamid + "������ȷ�ϣ�", function () {
                doAmsSubmit({
                    token: "teamjoin",
                    sData: {
                        sTeamId: teamid
                    },
                    success: function (res) {
                        var data = res.details.jData;
                        alert(data.sMsg, function () {
                            Hx.teaminit();
                            Hx.init();
                        })
                    }
                })
            });
        } else {
            alert('��������Ҫ�������Ŷ�ID')
        }
    },
    //��Ϊ�Ƽ���
    teamtj: function () {
        confirm("ȷ���Ƽ��Ŷ�����", function () {
            doAmsSubmit({
                token: "teamtj",
                success: function (res) {
                    var data = res.details.jData;
                    alert(data.sMsg, function () {
                        Hx.teamresh();
                    })
                }
            })
        });
    },
    //ƴ�ż�¼
    teamgift: function (page) {
        if (page == "0") {
            return;
        }
        doAmsSubmit({
            token: "gift",
            loading: true, // ����loading����,Ĭ�ϲ�����
            sData: {
                pageNow: page,
                pageSize: 7,
                str: "team",
            },
            success: function (res) {
                console.log(res);
                var lottery = res.details.jData.lottery;
                $("#getGiftContent3").html("");
                // �ж��û��Ƿ���Ҫ�Զ����ṹ������Ҫ��Ĭ��ȡ�û��Լ������Ľṹ
                if ($("#getGiftTemplate3").length > 0) {
                    let tpl_html = $("#getGiftTemplate3").html();
                    // ��Ⱦ����
                    const _html = Milo.tpl().compile(tpl_html, lottery.myGiftList);
                    $("#getGiftContent3").html(_html);
                }
                var pageTotal = parseInt(lottery.result.pageTotal);//��ҳ��
                var pageNow = parseInt(lottery.result.pageNow);//��ҳ��
                pageTotal = pageTotal == 0 ? 1 : pageTotal;
                var pre = pageNow - 1 > 0 ? pageNow - 1 : 0;//��һҳ
                var next = pageNow + 1 > pageTotal ? 0 : pageNow + 1;//��һҳ
                $("#text13 .now_page").html(pageNow + "/" + pageTotal);
                $("#text13 .btn_prev").attr("href", "javascript:Hx.gift(" + pre + ");");
                $("#text13 .btn_next").attr("href", "javascript:Hx.gift(" + next + ");");

                TGDialogS("text13");
            }
        })
    },
    //ƴ�Ž�����ȡ
    teamlq: function () {
        doAmsSubmit({
            token: "teamlq",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                    Hx.teaminit();
                })
            }
        })
    },
    //ƴ��ä���Զ�����
    autodj: function (id) {
        doAmsSubmit({
            token: "autodj",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //����������ȡ
    lqlh: function () {
        doAmsSubmit({
            token: "0448e6",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //Ͷ��������ȡ
    lqtz: function () {
        doAmsSubmit({
            token: "450187",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //ֱ���ۼƽ�����ȡ
    lqljbuy: function (id) {
        if (id == "2") {
            Milo.dologin(function () {
                $("#text20 li").removeClass("cur");
                callalert = function () {
                    alert("��ѡ��������", function () {
                        TGDialogS("text20");
                    });
                }
                $("#text20 .fc_btnqd3").attr("href", "javascript:callalert();");
                TGDialogS("text20");
                $("#text20 li").on("click", function () {
                    $("#text20 li").removeClass('cur');
                    $(this).addClass('cur');
                    var item = $(this).attr('data-item');
                    $("#text20 .fc_btnqd3").attr("href", "javascript:Hx.lqljbuy('" + item + "');");
                })
            })
            return;
        }
        doAmsSubmit({
            token: "151e18",
            sData: {
                "item": id
            },
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //ֱ��-����֮ʯ������ȡ
    lqwzzs: function () {
        doAmsSubmit({
            token: "2ce389",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //�˹�-�羺װ��������ȡ
    lqhg: function () {
        doAmsSubmit({
            token: "1766c9",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //�˹�-�羺�ۼƽ���
    lqhglj: function () {
        doAmsSubmit({
            token: "dab91e",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //�˹�-�羺-����֮ʯ������ȡ
    lqhgwzzs: function () {
        doAmsSubmit({
            token: "611638",
            success: function (res) {
                var data = res.details.jData;
                alert(data.sMsg, function () {
                    Hx.init();
                })
            }
        })
    },
    //���ƹ���
    copy_roleName: function () {
        if ($('#inputCopyRoleName').val() != "") {
            var my_teamid = document.getElementById('inputCopyRoleName');
            my_teamid.select();
            if (document.execCommand("copy")) {
                alert('�Ѹ��ƺã�����ճ');
            } else {
                alert('���ֶ����Ƶ�������')
            }
        } else {
            alert("���Ȱ󶨽�ɫ");
        }
    },
}

function queryBroadcast(id) {
    var flow = {
        actId: Milo.aParams.amsActId,
        token: 'lunbo',
        loading: true, // ����loading����,Ĭ�ϲ�����
        time: 50, // �ֲ�ʱ��
        sData: {
            // query: false
        },
        customDom: {
            broadcastId: "milo-broadcast" + id,
            broadcastContentId: "milo-broadcast-container" + id
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
 * @param item  1-5
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
 * @param item  1,-1
 */
function select_question2(order, item) {
    var index = item == 1 ? 0 : 1;
    $('#fk' + order + ' a').removeClass('cur');
    $('#fk' + order + ' a').eq(index).addClass('cur');
    Hx.question[order] = item;
}

/**
 *
 * @param item  1-25
 */
function select_question3(item) {
    //��ʼ���������ʾ�����ѡ��id
    var order = 4;
    var diffItem = 11
    var max = 5
    //
    var dom = $('#fk' + order + ' a').eq(item - 1);
    var domDiff = $('#fk' + order + ' a').eq(diffItem - 1);
    if (dom.hasClass('cur')) {
        //ͨ��-ȥѡ��
        dom.removeClass('cur')
    } else {
        //����ѡ��
        if (item == diffItem) {
            //ѡ�񻥳�ѡ��
            $('#fk' + order + ' a').removeClass('cur');
            dom.addClass('cur')
        } else {
            domDiff.removeClass('cur')
            var len = Hx.question[order].split('|').length;
            if (len >= max) {
                alert('����ѡ��5��');
            } else {
                dom.addClass('cur');
            }
        }
    }
    Hx.question[order] = ''
    var arr = []
    for (var i = 1; i <= diffItem; i++) {
        var dom = $('#fk' + order + ' a').eq(i - 1);
        if (dom.hasClass('cur')) {
            arr.push(i)
        }
    }
    Hx.question[order] = arr.join('|')
}


/**
 *
 * @param item  1-10
 */
function select_question4(order, item) {
    var index = item - 1;
    $('#fk' + order + ' a').removeClass('cur');
    $('#fk' + order + ' a').eq(index).addClass('cur');
    Hx.question[order] = item;
}
//�ʾ�ѡ���л�==========================================================end



//���ô�������
function getAreaName(area) {
    return CFServerSelect.zoneToName(area);
}

//pc������QQ�ռ�
function pc_qqZoneShare(djName, imgName) {
    $("#_overlay_")[0].style.setProperty('z-index', '798', 'important');
    $("#text16")[0].style.setProperty('z-index', '799', 'important');
    var imgSrc = Milo.aParams.urlimg + imgName + '?t=' + Date.now(); // ��ʱ�������⻺��
    need("biz.qzoneShare", function (share) {
        share.share({
            // url: dmdv.sMyShareStr, //��������[��ѡ��������ȡҳ��url]
            title: "��������Ϯ���Ƶ���˫��",
            desc: "���ڡ�������Ϯ���Ƶ���˫���鵽��" + djName + "��Ҫ���ȱȿ�˭��������������",
            pics: imgSrc,
            summary: "��������Ϯ���Ƶ���˫��",
            showcount: '0', //1Ĭ����ʾ  0����ʾ
            md: '1', //1Ĭ�ϲ���������  0��������
            callback: function (shareId) {
                alert("�����ɹ���");
            }
        });
    });
}
//����ͼƬ
function saveImageWithText(djimg, ewmimg, labelimg, textParts) {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();

    img1.crossOrigin = "anonymous"; // �������ã�ȷ��canvas������Ⱦ
    img2.crossOrigin = "anonymous";
    img3.crossOrigin = "anonymous";

    // img1.src = "//game.gtimg.cn/images/actdaoju/act/a20250718xbtz/fc_yx1.png" + '?t=' + Date.now();
    // img2.src = "//game.gtimg.cn/images/actdaoju/act/a20250718xbtz/ewm.png" + '?t=' + Date.now();
    // img3.src = "//game.gtimg.cn/images/actdaoju/act/a20250718xbtz/label1.png" + '?t=' + Date.now();

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
            //����x������������
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
            //     { text: "�λ���", color: "#000", line: 0 , font: "36px Arial" },
            //     { text: "�Ϻ�һ�� С������", color: "#000", line: 1 , font: "24px Arial" },
            // ];

            const lineHeight = 40;  // �и�
            const startX = img3_px + img3_w + space_x;      // ÿ����ʼx����

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
                // �޸ĺ���
                const timestamp = new Date()
                    .toISOString()
                    .replace(/T/, '-')  // �滻TΪ����
                    .replace(/\..+/, '') // ȥ��С�������Ĳ���
                    .replace(/:/g, '');  // ȥ��ð��
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

$('#lotteryShow a').on('click', function () {
    $(this).toggleClass("cur");
    if (typeof Milo.bindInfo != "undefined" && typeof Milo.bindInfo.sRole != "undefined") {
        if ($('#lotteryShow a').hasClass("cur")) {
            Milo.set("text23_" + Milo.bindInfo.sRole, "text23")
        } else {
            Milo.set("text23_" + Milo.bindInfo.sRole, "")
        }
    }
})





function poptext22(callback) {
    if (localStorage.getItem("poptext22") != "1") {
        $("#text22 .fc_btnqj1").addClass("gray");
        $("#text22 .fc_btnqj1").attr("href", "javascript: void(0);");
        window.poptext22call = function () {
            closeDialog();
            $.isFunction(callback) && callback();
        }
        if (Milo.aParams.interval) {
            clearInterval(Milo.aParams.interval);
        }
        var ishow = 3;
        // ÿ�����µ���ʱ
        Milo.aParams.interval = setInterval(() => {
            ishow--;
            $("#text22 .fc_txt_2").html("����ʱ��" + ishow + "��");
            // ����ʱ����
            if (ishow === 0) {
                $("#text22 .fc_btnqj1").removeClass("gray");
                clearInterval(Milo.aParams.interval);
                $("#text22 .fc_btnqj1").attr("href", "javascript:poptext22call();");
            }
        }, 1000);
        TGDialogS('text22');

    } else {
        $.isFunction(callback) && callback();
    }

    localStorage.setItem("poptext22", "1");
    setTimeout(function () {
        localStorage.setItem("poptext22", "0");
    }, 10000)
}