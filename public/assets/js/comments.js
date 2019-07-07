//获取评论数据列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
        var html = template('commentsTpl', response);
        //console.log(html);
        $('#niceBox').html(html);
        var html = template('pagingTpl', response);
        console.log(html)
        $('#pagingBox').html(html);
    }
});

//实现分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response);
            var html = template('commentsTpl', response);
            //console.log(html);
            $('#niceBox').html(html);
            var html = template('pagingTpl', response);
            console.log(html)
            $('#pagingBox').html(html);
        }
    });
};

//修改评论状态
$('#niceBox').on('click', '.edit', function () {
    //获取当前文章的状态
    var state = $(this).data('status');
    //获取当前文章的id
    var id = $(this).data('id');
    //发送请求
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        }
    })
});
//删除评论功能
$('#niceBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除评论吗?')) {
        //获取当前文章的id
        var id = $(this).data('id');
        //发送请求
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})