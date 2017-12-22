/**Created by fengYu on 2017/12/15*/
// 288ae6dfd1f34e0b8463848fc4006c5a
// 51833

//https://route.showapi.com/213-1?keyword=途中&page=1&showapi_appid=51833&showapi_test_draft=false&showapi_timestamp=20171215220806&showapi_sign=288ae6dfd1f34e0b8463848fc4006c5a

$(function () {
    var $Audio = $("audio"),
        $Tbody = $("tbody"),
        $Play = $("#play"),timeArr,num=0;
    //初始满音量
    $Audio[0].volume = 1;

    searchMusic("途中",1)

//先初始化一首歌
    function searchMusic(songname,page) {
        $Tbody.html("");
        var url = "https://route.showapi.com/213-1?keyword="+songname+"&page="+page+"&showapi_appid=51833&showapi_test_draft=false&showapi_timestamp="+getTime()+"&showapi_sign=288ae6dfd1f34e0b8463848fc4006c5a"
        $.getJSON(url,function (msg) {
            var songInfo = msg.showapi_res_body.pagebean;
            var $List = songInfo.contentlist;
            var $Main = $("#main");

            //存歌曲信息
            for (var key in $List){
                var $tr = $("<tr></tr>");
                //通过自定义属性记录歌曲的信息
                $tr.data({
                    singername : $List[key].singername,
                    albumpicsmall : $List[key].albumpic_small,
                    albumpicsbig : $List[key].albumpic_big,
                    songid : $List[key].songid,
                    songname : $List[key].songname,
                    m4a : $List[key].m4a,
                    albumname : $List[key].albumname
                }).append($("<td>"+FM(key*1+1)+"</td><td>"+$List[key].songname+"</td><td>"+$List[key].singername+"</td><td>"+$List[key].albumname+"</td>"))
                    .appendTo($Tbody)
            }
            if(songInfo.currentPage===1){
                $Tbody.data("allPages",songInfo.allPages)//记录本首歌曲最大的搜索结果page数
            }
            scrollBar($Main.find(".block"),$Main.children(".content"),$Main)//确定滚动条高度
            $Tbody.data({
                songname : songname,
                currentPage:songInfo.currentPage
            })
        })
    }
//歌曲列表滚动条
    function scrollBar($obj1,$obj2,$obj3) {
        $obj3.off("mousewheel");
    //    $obj1 滚动条的滑块
    //    $obj2 监听高度的对象
    //    $obj3 绑定滚动事件的对象(可是区域)
        var $obj1OffsetHeight = $obj1.offsetParent().height();
        $obj1.height($obj1OffsetHeight*$obj3.height()/$obj2.height())
    //    确定滚动的最大范围
        var scrollMax = $obj1OffsetHeight-$obj1.height();
        var contentMax = $obj2.height()-$obj3.height();
        $obj3.on("mousewheel",function (e,d) {
            e.preventDefault();//阻止默认事件
            var top = $obj1.position().top;
            if(d>0){//向上滚
                top -= 30
            }else{
                top += 30
            }
            top = Math.max(0,top);
            top = Math.min(top,scrollMax);
            $obj1.css("top",top);
            $obj2.css("top",-top/scrollMax*contentMax)
        })
    }
//翻页
    (function(){
        var $nextPage = $("#nextPage"),
            $prevPage = $("#prevPage"),
            $firstPage = $("#firstPage"),
            $lastPage = $("#lastPage");
        //下一页
        $nextPage.on("click",function () {
            //确定当前页是否是最后一页
            if($Tbody.data("currentPage")===$Tbody.data("allPages"))return;
            searchMusic($Tbody.data("songname"),$Tbody.data("currentPage")+1)

        })

        //上一页
        $prevPage.on("click",function () {
            //确定当前页是否是最后一页
            if($Tbody.data("currentPage")===1)return;
            searchMusic($Tbody.data("songname"),$Tbody.data("currentPage")-1)

        })
        //首页
        $firstPage.on("click",function () {
            //确定当前页是否是最后一页
            if($Tbody.data("currentPage")===1)return;
            searchMusic($Tbody.data("songname"),1)
        })
        //尾页
        $lastPage.on("click",function () {
            //确定当前页是否是最后一页
            if($Tbody.data("currentPage")===$Tbody.data("allPages"))return;
            searchMusic($Tbody.data("songname"),$Tbody.data("allPages"))
        })

    })();
//点击播放
    $Tbody.on("dblclick","tr",function () {

    //  播放当前点击的歌曲
        $Audio.prop("src",$(this).data("m4a"))[0].play();
        $Play.find(".play").addClass("zanting").removeClass("bofang");
        $Audio.data({
            "showTime": $(this).index(),
            "smallImg" : $(this).data("albumpicsmall"),
            "singname" : $(this).data("songname"),
            "singername" : $(this).data("singername"),
            "songid" : $(this).data("songid")
        })
    });
//  input搜索歌曲
    $("#header .search").keyup(function (e) {
        if(e.keyCode!==13)return;
        var val = $(this).val();
        if(val){
            $Tbody.data("songname",val)
            searchMusic(val,1)
            closeLayer();
        }
    });
//点击播放暂停
    (function () {
        var $sidebarFooter = $(".sidebarFooter"),
            $smallImg = $sidebarFooter.children("img"),
            $singname = $sidebarFooter.find(".singname"),
            $singername = $sidebarFooter.find(".singername");
        //播放暂停
        var $player = $Play.find(".play"),
            $prev = $Play.find(".prev"),
            $next = $Play.find(".next");
        $player.on("click",function () {
            if($(this).hasClass("bofang")){//真就是没有播放音乐
                $Audio[0].play()
            }else{//正在播放音乐，点击暂停
                $Audio[0].pause()
            }
            $(this).toggleClass("zanting bofang")

        });
        //上一首
        $prev.on("click",function () {
            var showTime = $Audio.data("showTime")-1;
            var $Tr = $Tbody.children();
            showTime = showTime===-1?$Tr.length-1:showTime;

            var $TrThis = $Tr.eq(showTime);

                $Audio.prop("src",$TrThis.data("m4a"))[0].play(0)
            $Audio.data({
                showTime : showTime,
                singname : $TrThis.data("songname"),
                singername : $TrThis.data("singername"),
                smallImg : $TrThis.data("albumpicsmall"),
                "songid" : $(this).data("songid")
            })

        });
        //下一首
        $next.on("click",function () {
            var showTime = $Audio.data("showTime")+1;
            var $Tr = $Tbody.children();
            showTime %= $Tr.length;
            var $TrThis = $Tr.eq(showTime);
            $Audio.prop("src",$TrThis.data("m4a"))[0].play(0)
            $Audio.data({
                showTime : showTime,
                singname : $TrThis.data("songname"),
                singername : $TrThis.data("singername"),
                smallImg : $TrThis.data("albumpicsmall"),
                "songid" : $(this).data("songid")
            });
        });
    })();
//同步进度条
    function Synchronize() {
        var $control = $Play.children(".control"),
            $progressBar = $control.find(".progressBar");
        //获取总时长
        var $TotalTime = $Audio[0].duration,
            currentTime = $Audio[0].currentTime;
        var x = Math.floor(currentTime)/Math.floor($TotalTime)*$progressBar.width();
        $progressBar.children(".red").css("width",x)
        $progressBar.children(".bar").css("left",x-$progressBar.children(".bar").width()/2)

        //格式化时间
        var time = FM(Math.floor(currentTime/60)) + ":" + FM(Math.floor(currentTime%60))
        $control.find(".time").html(time)
    }
//进度条拖动
    (function(){
        $(".progressBar .bar").on("mousedown",function (e) {
            $Audio.off("timeupdate")
            var $target = $(this);
            var mouseOldX = e.clientX,
                max = $target.parent().width(),
                left = $target.position().left,
                OldWidth = $target.prev().width();
            $(document).on("mousemove",function (e) {
                var _X = e.clientX - mouseOldX + left;
                _X = Math.max(0,_X);
                _X = Math.min(_X,max);
                OldWidth = _X;
                $target.prev().css("width",_X)
                $target.css("left",_X-$target.width()/2)
            });
            $(document).one("mouseup",function () {
                $Audio[0].currentTime = OldWidth/max * Math.floor($Audio[0].duration);
                $Audio.on("timeupdate",function(){
                    Synchronize();
                });
                $(this).off("mousemove");
            })

        })
    })();
    
    //audio的事件
    //audio的currentTime发生改变触发
    $Audio.on("timeupdate",function(){
        var $aLi = $("#lyricList").children();
        Synchronize();
        
        if($Audio[0].currentTime>timeArr[num]*1){
            num++;
            $aLi.each(function (index,key) {
                if (index < num) {
                    $(key).css("color","#666")

                } else if(index===num){
                    if(num>4&&num<$aLi.length-5){//控制ul滚动
                        $("#lyricList").css("top",-(index-4)*27)
                    }
                    $(key).css("color","#f60")

                }
            })
        }
    });
//当资源刚加载开始：
    $Audio.on("loadstart",function () {
        var $sidebarFooter = $(".sidebarFooter"),
            $smallImg = $sidebarFooter.children("img"),
            $singname = $sidebarFooter.find(".singname"),
            $singername = $sidebarFooter.find(".singername");

        //  歌曲小头像
        $smallImg.prop("src",$(this).data("smallImg"));
        //  歌名
        $singname.html($(this).data("singname"))
        //  歌手名
        $singername.html($(this).data("singername"));
        getLyric($Audio.data("songid"))
        num = 0;
        $("#lyricList").css("top",0)

    });
   //音量控制
    (function () {
        $(".volume .bar").on("mousedown",function (e) {
            var $target = $(this);
            var mouseOldX = e.clientX,
                max = $target.parent().width(),
                left = $target.position().left,
                OldWidth = $target.prev().width();
            $(document).on("mousemove",function (e) {
                var _X = e.clientX - mouseOldX + left;
                _X = Math.max(0,_X);
                _X = Math.min(_X,max);
                OldWidth = _X;
                $target.prev().css("width",_X)
                $target.css("left",_X-$target.width()/2)
                $Audio[0].volume = OldWidth/max;
            });
            $(document).one("mouseup",function () {
                $(this).off("mousemove");
            })

        })
    })();
//打开歌词层
    (function () {
        $(".sidebarFooter").click(layer)
        $(".lyric .top .icon-zuixiaohua").click(closeLayer)
        $(".contentDetails").css("opacity",0)

        function layer() {
            $(".containerList").fadeTo(1000,0,function () {
                $(this).css("z-index",3)
                $(".contentDetails").fadeTo(1000,1,function () {
                    $(this).css("z-index",3)
                })
            })
        }
    })();
    function closeLayer() {
        $(".contentDetails").fadeTo(1000,0,function () {
            $(this).css("z-index",0)
            $(".containerList").fadeTo(1000,1,function () {
                $(this).css("z-index",3)
            })
        })
    }

//请求歌词
    function getLyric(songid) {
        $("#lyricList").html("")
        var url = "https://route.showapi.com/213-2?musicid="+songid+"&showapi_appid=51833&showapi_test_draft=false&showapi_timestamp="+getTime()+"&showapi_sign=288ae6dfd1f34e0b8463848fc4006c5a"
        $.getJSON(url,function (msg) {
            $("#FMlyric").html(msg.showapi_res_body.lyric);
            $("#FMlyric").html().replace(/\[([\d:.]+)\](.+)/g,function(a,$1,$2){
                $("<li></li>").data("time",$1).html($2).appendTo($("#lyricList"))
                
            })
            scrollLyric()
        })
    }
    //歌词滚动
    function scrollLyric() {
        var $Ul = $("#lyricList"),
            $aLi = $Ul.children();

        timeArr = $aLi.map(function (value,li) { //03:08.05
            return $(li).data("time").replace(/(\d{2}):(\d\d).(\d\d)/,function (a,$1,$2) {
                return $1*60 + $2*1
            })
        })
    }
//下载当前
    $("#download").click(function () {
        var a = $("<a href='"+$Audio[0].src+"'></a>");
            a[0].download = "12";
            a[0].click();

    });
//获取本地时间
    function getTime() {
        var date = new Date(),
            YY = date.getFullYear(),
            MM = FM(date.getMonth()+1),
            DD = FM(date.getDate()),
            hh = FM(date.getHours()),
            mm = FM(date.getMinutes()),
            ss = FM(date.getSeconds());
        return YY + MM + DD + hh +mm +ss;
    }
//格式化时间
    function FM(n) {
        return n<10?"0"+n:n+"";
    }
});