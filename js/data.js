var contentData = [{
        info: {
            photo: "./images/tx-3.png",
            name: "Flipesbadou.",
            time: "16:34"
        },
        data: {
            title: "休闲日常",
            contnet: "带着毛球溜大街，气质这块拿捏的死死的",
            cont_img: [{
                url: "./images/cat.png",
                width: 160,
                height: 160
            }],
            detail: {
                like: 63,
                comment: 63,
                share: 63
            }
        }
    }, {
        info: {
            photo: "./images/two.png",
            name: "法兰西式浪漫.",
            time: "15:13"
        },
        data: {
            title: "刷到一组好看的照片",
            contnet: "《当经过大海》 摄影师：海螺壳",
            cont_img_list: [
                "./images/e-a.png", "./images/e-b.png", "./images/e-c.png",
                "./images/e-d.png", "./images/e-e.png", "./images/e-f.png",
            ],
            detail: {
                like: 63,
                comment: 63,
                share: 63
            }
        }
    }, {
        info: {
            photo: "./images/four.png",
            name: "听闻风来",
            time: "15:13"
        },
        data: {
            cite: {
                cont: "山川是不卷收的文章，<br>日月为你掌灯伴读。",
                name: "-- 简媜"
            },
            detail: {
                like: 63,
                comment: 63,
                share: 63
            }
        }
    }, {
        info: {
            photo: "./images/three.png",
            name: "风鸣.",
            time: "15:09"
        },
        data: {
            title: "[秋]",
            contnet: "“你看，连风都在为我们可惜呢。”<br>“......”",
            video: "https://www.bilibili.com/382556b2-2e7f-40b4-b8de-88cdd39fa3e2",
            detail: {
                like: 63,
                comment: 63,
                share: 63
            }
        }
    }, {
        info: {
            photo: "./images/four.png",
            name: "听闻风来",
            time: "15:06"
        },
        data: {
            cite: {
                cont: "我说风不要吹走我的哀"
            },
            detail: {
                like: 63,
                comment: 63,
                share: 63
            }
        }
    }, {
        info: {
            photo: "./images/default.png",
            name: "这是一条测试数据",
            time: "24:01"
        },
        data: {
            title: "[秋]",
            contnet: "“你看，连风都在为我们可惜呢。”<br>“......”",
            cite: {
                cont: "山川是不卷收的文章，<br>日月为你掌灯伴读。",
                name: "-- 简媜"
            },
            cont_img: [{
                url: "./images/cat.png",
                width: 160,
                height: 160
            }],
            cont_img_list: [
                "./images/e-a.png", "./images/e-b.png", "./images/e-c.png",
                "./images/e-d.png", "./images/e-e.png", "./images/e-f.png",
            ],
            video: "video/night.mp4",
            detail: {
                like: 9999,
                comment: 9999,
                share: 9999
            }
        }
    }],
    userListData = [{
        id: 1,
        name: "用户1",
        photo: "./images/tx-1.png",
        unread: 1,
        like: false
    }, {
        id: 2,
        name: "用户2",
        photo: "./images/tx-2.png",
        unread: 0,
        like: false
    }, {
        id: 3,
        name: "用户3",
        photo: "./images/tx-3.png",
        unread: 1,
        like: true
    }, {
        id: 4,
        name: "用户4",
        photo: "./images/tx-4.png",
        unread: 0,
        like: true
    }, {
        id: 5,
        name: "用户5",
        photo: "./images/tx-5.png",
        unread: 1,
        like: false
    }, {
        id: 6,
        name: "用户6",
        photo: "./images/tx-6.png",
        unread: 1,
        like: false
    }, {
        id: 7,
        name: "用户7",
        photo: "./images/five.png",
        unread: 0,
        like: true
    }, {
        id: 8,
        name: "用户8",
        photo: "./images/four.png",
        unread: 0,
        like: false
    }],
    bannerData = [{
        img: "images/car1.png",
        photo: "images/tx-1.png",
        name: "秋风未眠.",
        cont: {
            p: `"我独自去过很多风景，<br>在我的脑海里<br>但你出现过的场景，<br>我想为它们配上声音"`,
            cite: "-- 《台风》"
        }
    }, {
        img: "images/pic.jpeg",
        photo: "images/tx-2.png",
        name: "测试用户2号",
        cont: {
            p: `一念起，那个名字，<br>仍是不老的一场清风。<br>你浅笑，眉尚清，<br>"当时明月在"。`,
            cite: "-- 白音格力《无事此静坐》"
        }
    }, {
        img: "images/test.jpeg",
        photo: "images/tx-3.png",
        name: "测试用户3号",
        cont: {
            p: `无声的呜咽比嚎啕叫是更悲哀得多了。`,
            cite: "-- 梁遇春《寄给一个失恋人的信》"
        }
    }, {
        img: "images/bg19.webp",
        alt: "长椅歇坐",
        photo: "images/tx-4.png",
        name: "测试用户4号",
        cont: {
            p: `你有自己的朗读者，<br>而我只是个摆渡人`,
            cite: "-- 张嘉佳《从你的全世界路过》"
        }
    }, {
        img: "images//bg3.webp",
        photo: "images/tx-5.png",
        name: "测试用户5号",
        cont: {
            p: `也许一个人在真正无可奈何的时候，<br>除了微笑，也只好微笑了。`
        }
    }]