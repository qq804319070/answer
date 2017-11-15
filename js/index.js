$(function () {
    var logo = $(".logo"),
        ent_title = $(".ent-title"),
        ent_bot = $(".ent-bot"),
        an_sidebar = $(".an-sidebar"),
        an_area = $(".an-area"),
        an_extract = $(".an-extract"),
        an_txt = $(".an-txt"),
        sid_bars = $(".sid-bars"),
        start = an_sidebar.find(".start"),
        question = an_area.find(".question");
    //多选题为对象,单选题为一个字符串
    var cur_question_result = "a";
    sid_bars[0].pro = false,//是否为程序题
        cache_res = true,
        cur_num = 1,
        next_an = false;
    $(".point").click(function (e) {
        logo.addClass("animated fadeOutUp");
        ent_title.addClass("animated zoomOut");
        ent_bot.addClass("animated fadeOutDown");
        an_sidebar.addClass("an-sidebar-s");
        an_area.css({display: "block"});
        an_area.find(".an-bot").addClass("an-bot-a");
        an_area.find(".an-txt-inside").addClass("an-txt-a");
        $(this).unbind().removeClass("point");
    });
    sid_bars.click(function (e) {
        var target = e.target,
            classify = target.className;
        next_an = true;
        if (/start/g.test(classify)) {
            an_txt.find("span").html("任我行在为您随机抽题中....");
            an_txt.removeClass("prepare").addClass("extracting");
            an_extract.addClass("an-extract-a");
            an_extract.find(".pillar1").addClass("pillar1-a");
            an_extract.find(".pillar2").addClass("pillar2-a");
            an_extract.find(".bg").addClass("bg-a");
            an_extract.find(".slide").addClass("slide-a");
            an_extract.find(".slide-into").addClass("slide-into-a").on("webkitAnimationEnd", function () {
                setTimeout(function () {
                    question.addClass("question-a").removeClass("question-hide");
                }, 1200);
                an_txt.addClass("hide_an_txt_top");
                an_extract.removeClass("an-extract-a").addClass("hide_an_txt");
            });
            res_data(1);
            this.cur_num = 1;
        }
        if (/question-a/g.test(classify)) {
            var jq_obj = $(target);
            if (jq_obj.hasClass("btn_bg")) {
                jq_obj.removeClass("btn_bg");
            } else {
                jq_obj.addClass("btn_bg");
            }
            if (typeof cur_question_result !== "object") {
                jq_obj.siblings().removeClass("btn_bg")
            }

        } else if (/question-b/g.test(classify)) {
            //答案b
            var jq_obj = $(target);
            if (jq_obj.hasClass("btn_bg")) {
                jq_obj.removeClass("btn_bg");
            } else {
                jq_obj.addClass("btn_bg");
            }
            if (typeof cur_question_result !== "object") {
                jq_obj.siblings().removeClass("btn_bg")
            }

        } else if (/question-c/g.test(classify)) {
            var jq_obj = $(target);
            if (jq_obj.hasClass("btn_bg")) {
                jq_obj.removeClass("btn_bg");
            } else {
                jq_obj.addClass("btn_bg");
            }
            if (typeof cur_question_result !== "object") {
                jq_obj.siblings().removeClass("btn_bg")
            }

        } else if (/question-d/g.test(classify)) {
            var jq_obj = $(target);
            if (jq_obj.hasClass("btn_bg")) {
                jq_obj.removeClass("btn_bg");
            } else {
                jq_obj.addClass("btn_bg");
            }
            if (typeof cur_question_result !== "object") {
                jq_obj.siblings().removeClass("btn_bg")
            }

        } else if (/question-1/g.test(classify)) {
            var jq_obj = $(target);
            if (jq_obj.hasClass("btn_bg")) {
                jq_obj.removeClass("btn_bg");
            } else {
                jq_obj.addClass("btn_bg");
            }
            if (typeof cur_question_result !== "object") {
                jq_obj.siblings().removeClass("btn_bg")
            }
        } else if (/question-0/g.test(classify)) {
            var jq_obj = $(target);
            if (jq_obj.hasClass("btn_bg")) {
                jq_obj.removeClass("btn_bg");
            } else {
                jq_obj.addClass("btn_bg");
            }
            if (typeof cur_question_result !== "object") {
                jq_obj.siblings().removeClass("btn_bg")
            }

        } else if (classify === "question-show") {
            //显示答案;
            cache_res = true;
            if (this.pro) {
                //程序题
                $(".result6").addClass("result6-a");
                return;
            }
            var cur_res = cur_question_result;
            if (typeof cur_res === "object") {
                var container = " ";
                for (var key in cur_res) {
                    $(".result").find("[option=" + key + "]").addClass("right");
                    container += (key + " ");
                }
                $(".container").html("（ " + container.toUpperCase() + " ）");
                return;
            }
            $(".result").find("[option=" + cur_res + "]").addClass("right");
            if (cur_res === "1") {
                cur_res = "正确"
            } else if (cur_res === "0") {
                cur_res = "错误"
            }
            $(".container").html("（ " + cur_res.toUpperCase() + " ）");

        } else if (classify === "question-submit") {
            //提交
            cache_res = true;
            var jq_obj = $(target),
                select = jq_obj.siblings(".btn_bg");
            if (select.length === 0) {
                alert("请选择答案!");
                return;
            }

            var multiple = false,
                cur_result = cur_question_result,//正确答案
                Oresult = $(".result");
            if (typeof cur_result === "object") {
                multiple = true;
                cur_result = {};
                for (var key in cur_question_result) {
                    cur_result[key] = key
                }
            }
            if (multiple) {
                //多选题
                var answer = [],
                    container = " ";
                //已选的
                for (var i = 0; i < select.length; i++) {
                    var classify = select[i].className,
                        reg = /q\w+\-(\w)/g,
                        select_one = reg.exec(classify)[1];
                    answer.push(select_one);
                    Oresult.find("[option=" + select_one + "]").addClass("pitch");
                }

                for (var key1 in cur_result) {
                    container += (key1 + " ");
                    Oresult.find("[option=" + key1 + "]").addClass("right");
                }

                $(".container").html("（" + container.toUpperCase() + "）");
                for (var k = 0; k < answer.length; k++) {
                    if (cur_result[answer[k]]) {
                        delete cur_result[answer[k]];
                        answer.splice(k, 1);
                        k--;
                    }
                }
                var length = JSON.stringify(cur_result).length;
                if (answer.length > 0 || length > 2) {
                    an(false);
                } else {
                    an(true);
                }
            } else {
                if (this.pro) {
                    //程序题
                    $(".result6").addClass("result6-a");
                    return;
                }
                //单选,判断题
                var classify = "";//选中的类名
                if (select[0]) {
                    classify = select[0].className
                } else {
                    return
                }
                var reg = /q\w+\-(\w)/g,
                    answer = reg.exec(classify)[1];//选中答案

                Oresult.find("[option=" + answer + "]").addClass("pitch");
                Oresult.find("[option=" + cur_result + "]").addClass("right");
                if (answer === cur_result) {
                    an(true);
                } else {
                    an(false);
                }
                if (cur_result === "1") {
                    cur_result = "正确"
                } else if (cur_result === "0") {
                    cur_result = "错误"
                }
                $(".container").html("（ " + cur_result.toUpperCase() + " ）");
            }
        } else if (classify === "question-next") {
            //下一题
            if (!cache_res) {
                return;
            }
            next_an = false;
            $(this).children("[option]").removeClass("btn_bg");
            if (this.cur_num >= 10) {
                //这里是第10题点击了下一题;
                $(".question").removeClass("question-a").addClass("question-hide");
                $(".complete").addClass("complete-a");
                return;
            } else {
                this.cur_num += 1
            }
            next();
            var cur_num = this.cur_num;
            setTimeout(function () {
                res_data(cur_num);
            }, 1000);
        }
    });

    function next() {
        $(".question").removeClass("question-a").addClass("question-hide");
        an_extract.removeClass("hide_an_txt").addClass("an-extract-a");
        an_extract.find(".slide").removeClass("slide-a").addClass("slide-a");
        an_txt.removeClass("hide_an_txt_top");
        var slide_into = an_extract.find(".slide-into");
        slide_into.removeClass("slide-into-a");
        setTimeout(function () {
            slide_into.addClass("slide-into-a")
        }, 50);
    }

    $(".complete-op").on("click", function (e) {
        var target = e.target,
            classify = target.className;
        this.parentNode.className = "complete";
        if (classify === "fence") {
            //加赛题
            console.log("加赛");
            next();
            res_data("overtime");
        } else {
            console.log("下一轮");
            setTimeout(function () {
                document.getElementsByClassName("sid-bars")[0].cur_num = 1;
                res_data(1);
                next();
            }, 1000);
        }
    });

    function an(flag) {
        if (flag) {
            $(".result-s").prop("src", "/Public/img/true.png").addClass("an-result");
            document.getElementById("true").play();
        } else {
            $(".result-s").prop("src", "/Public/img/false.png").addClass("an-result");
            document.getElementById("false").play();
        }
    }

    $(".result-s").click(function () {
        this.className = "result-s"
    });

    function res_data(cur_num) {
        if (cache_res) {
            $.ajax({
                url: "http://dt.pjrwx.cn/index.php/Home/Index/wenda",
                type: "get",
                data: {
                    page: cur_num
                },
                dataType: "json",
                success: function (res) {
                    cache_res = false;
                    var topic_str = `
                <span class="state">（${res.list.style}）</span>
                <span class="num">${res.page ? res.page : ""}</span>${res.page ? "、" : ""}<span 
                class="subject">${res.list.subject}<span class="container">（）</span>
                 </span>
                `;
                    $(".random_cur_question").text(res.list.subject);
                    $(".random_top").text(res.upper);
                    $(".random_bot").text(res.down);
                    if (res.list.lx == 1) {
                        //单选
                        bind_data_one(res);
                        cur_question_result = res.list.right_answer.toLowerCase();
                    } else if (res.list.lx == 2) {
                        //多选
                        bind_data_one(res);
                        var cur_question = {};
                        res.list.right_answer.toLowerCase().replace(/\w/g, function (arg) {
                            cur_question[arg] = arg;
                        });
                        cur_question_result = cur_question;
                    } else if (res.list.lx == 3) {
                        //判断
                        var result_str = `
                         <li class="result5" option="1">
                            <p>正确</p>
                            </li>
                            
                        <li class="result5" option="0">
                            <p>错误</p>
                        </li>
                               `;
                        cur_question_result = res.list.right_answer;
                        $(".result").html(result_str);
                    } else if (res.list.lx == 4) {
                        //程序
                        var result_str = `
                        <li class="result6" option="x">
                            <p>${res.list.right_answer}</p>
                        </li>
                        `;
                        $(".result").html(result_str);
                    }
                    $(".topic").html(topic_str);
                    if (res.list.title) {
                        $(".question_head").text("加赛题");
                    }
                }
            })
        }
    }

    function bind_data_one(res) {
        var answer = res.list.answer,
            reg = /(\w\.)(\S+)/,
            result_str = ``;
        for (var i = 0; i < answer.length; i++) {
            //"A.主体责任";
            var option = "",
                txt = "";
            option = reg.exec(answer[i])[1];
            txt = reg.exec(answer[i])[2];
            result_str += `
                        <li class="${'result' + (i + 1)}" option="${option.toLowerCase().replace(/\./, '')}">
                           <span>${option}</span>
                           <p>${txt}</p>
                        </li>
                        `
        }
        $(".result").html(result_str);
    }
});
