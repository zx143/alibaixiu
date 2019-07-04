//提交表单事件
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    //console.log(formData); 
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('添加失败');
        }
    })
    return false;
});

//上传头像事件
$('#avatar').on('change', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    //console.log(this.files[0] );
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax不要解析二进制上传文件
        processData: false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            //console.log(response);
            //实现头像预览
            $('#preview').attr('src', response[0].avatar);
            //保存头像地址到隐藏域中
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
});

//向服务端发送查询用户数据请求
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        //console.log(response);
        //模板引擎拼接数据库中的数据到模板中
        var html = template('userTpl', {
            data: response
        });
        //console.log(html);
        //将插入好数据的模板插入到页面中
        $('#usersBody').html(html);
    }
})