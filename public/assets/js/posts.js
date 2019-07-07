//发送请求 渲染页面
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        //console.log(response);
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
        var pageHtml = template('pageTpl', response);
        $("#page").html(pageHtml);
    }
});

//处理日期格式
template.defaults.imports.dateFormat = function (date) {
    var data = new Date(date);
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
};

//分页功能
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            //console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var pageHtml = template('pageTpl', response);
            $("#page").html(pageHtml);
        }
    });
}

//发送请求 获取分页数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //console.log(response);
        var html = template('categoryTpl', {
            dade: response
        });
        //console.log(html);
        $('#categoryBox').html(html);
    }
});

//筛选分类条件数据
$('#filterFrom').on('submit', function () {
    var formData = $(this).serialize();
    //发送请求
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            //console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var pageHtml = template('pageTpl', response);
            $("#page").html(pageHtml);
        }
    });
    return false;
});

//文章删除
$('#postsBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除用户吗?')) {
        var id = $(this).data('id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});