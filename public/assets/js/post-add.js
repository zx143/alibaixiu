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
$('#feature').on('change', function () {
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