//随机推荐
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (res) {
        //console.log(res);
        var randomTpl = ` 
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
        </li>
        {{/each}} `;
        var html = template.render(randomTpl, {
            data: res
        });
        //console.log(html);
        $('#randomBox').html(html);
    }
});

//处理日期格式
template.defaults.imports.dateFormat = function (date) {
    var data = new Date(date);
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
};

//最新评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (res) {
        //console.log(res);
        var commentsTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{dateFormat($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
        </li>
        {{/each}}
        `
        var html = template.render(commentsTpl, {
            data: res
        });
        //console.log(html);
        $('#commentsBox').html(html);
    }
});

//导航栏
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        //console.log(res);
        var navTpl = `
        {{each data}}
            <li>
            <a href="list.html?categoryId={{$value._id}}">
                <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a>
        </li>
        {{/each}}
        `
        var html = template.render(navTpl, {
            data: res
        });
        $('#navBox').html(html);
        $('#topnavBox').html(html);
    }
});

//封装一个获取url地址栏id的函数
function getId(name) {
    //返回一个?之后的字符串
    var paramsAry = location.search.substring(1);
    //切割成数组
    paramsAry = paramsAry.split('&');
    //循环数组
    for (var i = 0; i < paramsAry.length; i++) {
        //切割成数组
        var tmp = paramsAry[i].split('=');
        //如果
        if (tmp[0] == name) {
            //返回id
            return tmp[1];
        }
    }
};

//搜索功能
// $('.search from')获取类名为search下面的from标签
$('.search form').on('submit', function () {
    var key = $(this).find('.keys').val();
    //跳转到搜索页面
    location.href = '/search.html?key=' + key;
    return false
});