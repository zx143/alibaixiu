//获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //console.log(response);
        var html = template('categoryTpl', {
            data: response
        });
        $('#category').html(html);
    }
});

//选择文件上传
$('#modifyBox').on('change', '#feature', function () {
    //获取用户选择到的文件
    var file = this.files[0];
    var formData = new FormData();
    //将用户选择的文件追加到FormData对象处理函数中
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            //console.log(response);
            $('#thumbnail').val(response[0].cover);
        }
    })
});

//添加文章
$('#addForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            //调转到文章列表页面
            location.href = '/admin/posts.html';
        }
    });
    return false;
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

//获取点击修改的文章id
var id = getId('id');
//console.log(id);


//判断id是否存在
if (id) {
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        success: function (response) {
            //请求分类列表
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    //将查询到的分类数据添加到文章列表中
                    response.categories = categories;
                    //console.log(response);
                    var html = template('modifyTpl', response)
                    //console.log(html);
                    $('#modifyBox').html(html);
                }
            })
        }
    })
};

//修改文章提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    //获取表单内容
    var formData = $(this).serialize();
    //获取文章id
    var id = $(this).data('id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html';
        }
    })
    return false;
});