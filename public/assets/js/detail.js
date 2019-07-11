var id = getId('id');

//文章详情渲染
$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (res) {
        console.log(res);
        var html = template('detailTpl', res);
        console.log(html);
        $('#articleBox').html(html)
    }
});

//点赞事件
$('#articleBox').on('click', '#like', function () {
    //发送请求
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function () {
            location.reload();
        }
    })
});

var review;
//获取网站的配置信息 是否开启评论功能
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        //获取是不是经过人工审核
        review = res.review;
        //判断管理员是否开启评论功能
        if (res.comment) {
            var html = template('commentTpl')
            $('#comment').html(html)
        }
    }
});

//评论提交
$('#comment').on('submit', 'form', function () {
    //获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    //评论状态
    var state;
    if (review) { //需要经过人工审核
        state = 0;
    } else { //不需要经过人工审核
        state = 1;
    };
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            content: content,
            post: id,
            state: state
        },
        success: function () {
            //alert('评论成功')
            location.reload();
        },
        error: function () {
            console.log('评论失败');
        }
    })
    return false;
})