//修改密码按钮点击事件
$('#modifyForm').on('submit', function () {
    //获取用户表单中输入的内容
    var formData = $(this).serialize();
    //发送请求,进行修改修改
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
            location.href = '/admin/login.html';
        }
    })
    //阻止表单默认提交行为
    return false;
});