$(function() {
    let data = {
        index: 0, //当前加载索引
        num: 5, //每次加载5条
        banner: bannerData || [], //banner数据
        userList: userListData || [], //关注列表
        cont: contentData || [] //加载的内容
    };
    var header = document.querySelector("header"),
        $headerNav = $(".header-nav"),
        $banner = $(".banner"),
        $bannerWrap = $banner.find(".banner-wrap"),
        $scrollTop = $("#scroll-top"),
        $listFold = $("#list-fold"),
        $attentionWrap = $listFold.prev(),
        $ToolBox = $("#tool-box"),
        $loaderBtn = $("#posts-loader"),
        $contentBox = $(".content-box"),
        $contentWrap = $contentBox.children(".content-wrap").eq(0);
    // 注册元素节点为变量
    const observer = new IntersectionObserver(observerFun); //创建观察者对象
    const obVideo = new IntersectionObserver(obVideoFun); //创建观察者对象
    observer.observe(header); //观察者header节点
    appendBanner(); //加载banner
    setTimeout(() => {
        appendUserList(); //加载关注列表信息
        appendData(); //加载内容数据
    }, 1000); //延迟1秒后加载内容

    function obVideoFun(e) { //观察函数，当发生观察元素移入/移出到浏览器视口中时调用
        e.forEach(v => {
            let res = v.target;
            if (v.isIntersecting) {
                res.paused ? res.play() : "";
            } else {
                !res.paused ? res.pause() : "";
            }
        });
    }

    function observerFun(e) { //观察函数，当发生观察元素移入/移出到浏览器视口中时调用
        e.forEach(v => {
            if (v.isIntersecting) {
                $scrollTop.removeClass("visible");
            } else {
                $scrollTop.addClass("visible");
            }
        });
    }
    $scrollTop.click(function() { //点击回到首页
        $(window).scrollTop(0);
    });
    $headerNav.on("click", ".nav-item", function() { //导航栏切换
        if (!$(this).is(".active")) $(this).addClass("active").siblings(".active").removeClass("active");
    });
    $banner.on("click", ".line-item", function() { //广告栏切换
        let index = $(this).index();
        if (!$(this).is(".active")) {
            $(this).addClass("active").siblings(".active").removeClass("active");
            $bannerWrap.find(".banner-item").eq(index).addClass("active").siblings(".active").removeClass("active");
        }
    }).on("click", ".banner-btn", function() {
        let dom = $banner.find(".line-item.active");
        if ($(this).data("type") == "left") {
            dom.index() <= 0 ? dom.siblings(":last-child").click() : dom.prev().click();
        } else {
            dom.next().length == 0 ? dom.siblings(":first-child").click() : dom.next().click();
        }
    });
    $attentionWrap.on("click", ".unread", function() { //点击移出小红点
        $(this).removeClass("unread");
    });
    $listFold.click(function() { //关注列表下拉
        let dom = $attentionWrap,
            scroll = dom.scrollTop() + 54;
        scroll = scroll % 54 == 0 ? scroll : +(scroll / 54).toFixed(0) * 54;
        let w = dom.prop("scrollHeight") - dom.prop("offsetHeight"),
            sr = scroll > w ? w : scroll;
        dom.scrollTop(sr);
    });
    $ToolBox.on("click", ".tool-btn", function() { //工具栏打开/关闭
        $ToolBox.is(".open") ? $ToolBox.removeClass("open") : $ToolBox.addClass("open");
    });
    $loaderBtn.click(function() {
        this.scrollIntoView(false);
        appendData();
    });
    $contentBox.on("click", ".posts-detail>.like>button", function() { //内容点赞
        let span = $(this).next(),
            num = parseInt(span.text()),
            type = 1;
        if ($(this).is(".active")) {
            $(this).removeClass("active");
            isNaN(+span.text()) ? type = 0 : type = -1;
        } else {
            $(this).addClass("active");
        }
        num + type > 9999 ? num = "9999+" : num += type;
        span.text(num);
    });
    $contentWrap.on("click", ".video-mask", function() {
        $(this).attr("open") == undefined ? $(this).next()[0].play() : "";
    }).on("play", "video", function() {
        console.log($(this).prev())
        $(this).prev().attr("open", "");
    }).on("pause", "video", function() {
        $(this).prev().removeAttr("open");
    });

    $bannerWrap.on("click", ".op-detail>.like>button", function() { //广告栏点赞
        if ($(this).is(".active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    })

    function appendBanner() { //插入banner数据
        let html = "",
            line = `<div class="banner-line">`,
            i = 0;
        for (const v of data.banner) {
            i == 0 ? html += getBannerHtml(v, true) : html += getBannerHtml(v);
            line += `<div class="line-item ${i == 0 ? "active" : ""}"></div>`;
            i++;
        }
        line += "</div>";
        $bannerWrap.append(html);
        $banner.append(line);
    }

    function appendUserList() { //插入关注列表数据
        $(".attention-loader").remove();
        let html = ""
        for (const v of data.userList) {
            html += getUserListHtml(v);
        }
        $attentionWrap.append(html);
    }

    function appendData() { //在页面中往.content-wrap元素插入数据
        if ($loaderBtn.attr("on") != "loader") {
            $loaderBtn.text("内容正在路上").attr("on", "loader");
            setTimeout(() => {
                let html = "",
                    index = data.index,
                    len = data.cont.length,
                    num = data.num,
                    difference = len - index;
                if (difference != 0) {
                    if (difference < 5) {
                        num = difference;
                    }
                    for (let i = 0; i < num; i++) {
                        html += getPostsHtml(data.cont[data.index + i]);
                    }
                    data.index += num;
                    $contentWrap.append(html);
                    obSet();
                    $contentWrap.viewer({
                        url: 'data-original'
                    });
                    $loaderBtn.text("点我刷新内容").removeAttr("on");
                } else {
                    $loaderBtn.text("--已经到底了哦--")
                }
            }, 3000)
        }
    }

    function obSet() {
        let videos = $contentWrap.find("video");
        for (const v of videos) {
            if ($(v).attr("on") != "add") {
                $(v).attr("on", "add");
                obVideo.observe(v);
            }
        }

    }
});

function getBannerHtml(obj, is) { //获取banner的数据结构
    return `
    <div class="banner-item ${is ? "active" : ""}">
    <div class="banner-content-left">
        <img src="${obj.img || "./images/df-bg.webp"}" ${obj.alt != undefined ? `alt="${obj.alt}" title="${obj.alt}"` : ""}>
    </div>
    <div class="banner-content-right">
        <div class="banner-content-head">
            <div class="banner-head-photo img-box">
                <img src="${obj.photo || "./images/default.png"}" ${obj.name != undefined ? "alt=" + obj.name + "的头像" : ""} >
            </div>
            <span class="banner-head-name">${obj.name || "未命名"}</span>
        </div>
        <div class="banner-content-body">
            ${obj.cont.p || ""}
            ${obj.cont.cite != undefined ? "<cite>" + obj.cont.cite + "</cite>" : ""}
        </div>
        <div class="banner-detail op-detail">
            <div class="like">
                <button></button>
            </div>
            <div class="comment">
                <button></button>
            </div>
        </div>
    </div>
</div>
    `
}
function getUserListHtml(obj) { //获取关注列表的结构
    return `
    <div class="user-item img-box ${obj.unread != 0 ? "unread" : ""}" ${obj.id != undefined ? "data-id=" + obj.id + "" : ""}>
        <img src="${obj.photo || "./images/default.png"}" alt="${obj.name || "未命名"}">
    </div>`
}

function getPostsHtml(obj) { //获取插入数据的结构
    let info = obj.info || {},
        data = obj.data || {},
        cont_img_html = "",
        cont_img_list_html = "",
        detail_html = "";
    if (data.cont_img != undefined) {
        data.cont_img.forEach(e => {
            cont_img_html += `<img src="${e.url}" data-original="${e.url}" width="${e.width}" height="${e.height}">`
        });
    }
    if (data.cont_img_list != undefined) {
        cont_img_list_html += `<div class="posts-images">`;
        data.cont_img_list.forEach((e, i) => {
            cont_img_list_html += `<img data-original="${e}" src="${e}">`
            if (++i % 3 == 0) cont_img_list_html += "<br>";
        });
        cont_img_list_html += `</div>`
    }
    if (data.detail != undefined) {
        for (const key in data.detail) {
            detail_html += `
            <div class="${key}">
                <button></button>
                <span>${data.detail[key]}</span>
            </div>`;
        }
    }
    return `
    <div class="posts">
        <div class="posts-head">
            <div class="posts-photo img-box">
                <img src="${info.photo || "./images/default.png"}" alt="${info.name || "未命名"}">
            </div>
            <div class="posts-info">
                <span class="posts-name">${info.name || "未命名"}</span>
                <span class="posts-time">发布与<time>${info.time || "00:00"}</time></span>
            </div>
        </div>
        <div class="posts-body">
            <div class="posts-wrap">
                ${data.title != undefined ? "<div class='posts-title'>" + data.title + "</div>" : ""}
                <div class="posts-box">
                    ${data.cite != undefined ? `
                    <div class="posts-cite">
                        ${data.cite.cont || ""}
                        ${data.cite.name != undefined ? `<cite>${data.cite.name || ""}</cite> ` : ""}
                    </div>`: ""}
                    ${data.contnet != undefined ? `
                    <div class="posts-content">
                        ${data.contnet || ""}
                    </div>`: ""}
                    ${cont_img_html}
                    ${cont_img_list_html}
                    ${data.video != undefined ? `
                    <div class="posts-video">
                        <div class="video-mask">
                        <svg t="1638263931734" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1664" width="48" height="48"><path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#ffffff" p-id="1665"></path><path d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z" fill="#ffffff" p-id="1666"></path><path d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z" fill="#ffffff" p-id="1667"></path></svg>
                        </div>
                        <video src="${data.video}" onpause="videoPause(this)" onplay="videoPlay(this)" controls autoplay></video>
                    </div>`: ""}
                </div>
            </div>
            <div class="posts-detail op-detail">
               ${detail_html}
            </div>
        </div>
    </div>`
}
function videoPause(e) {
    $(e).prev().removeAttr("open")
}
function videoPlay(e) {
    $(e).prev().attr("open", "")
}
