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

// //上传头像事件
// $('#avatar').on('change', function () {

// });

$('#modifyBox').on('change', '#avatar', function () {
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
});

//点击编辑用户数据事件
$('#usersBody').on('click', '#edit', function () {
    //获取点击用户的id值
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        //data: id,
        success: function (response) {
            //console.log(response);
            var html = template('modifyTpl', response);
            //console.log(html);
            $('#modifyBox').html(html);
        }
    })
});

//修改用户信息事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();
    //获取用户点击的用户id
    var id = $(this).attr('data-id');
    //console.log(formData);
    //发送请求 服务端修改数据重新渲染页面
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            //console.log(response);
            location.reload();
        }
    })
    return false;
});

//删除用户功能 
//监听点击事件
$('#usersBody').on('click', '.delete', function () {
    //弹出选择警示框
    if (confirm('您真的要删除此用户吗?')) {
        //获取即将删除的用户Id
        var id = $(this).attr('data-id');
        //发送请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                location.reload();
                console.log(response);
            }
        })
    }
});

//全选按钮影响子按钮
var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');
selectAll.on('change', function () {
    //获取到全选按钮当前状态
    var status = $(this).prop('checked');
    //根据全选按钮的状态来显示隐藏批量删除按钮
    if (status) {
        //显示
        deleteMany.show();
    } else {
        //隐藏
        deleteMany.hide();
    }
    //获取所有用户的按钮 将全选按钮的状态赋值给子按钮
    $('#usersBody').find('input').prop('checked', status);
});

//监听全选框的状态
$('#usersBody').on('change', '.userStatus', function () {
    //获取所有用户的复选框
    var inputs = $('#usersBody').find('input');
    //判断选中的复选框数量和所有用户的复选框数量是否一致
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    };
    //如果选中的复选框数量大于0
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

//批量删除点击事件
deleteMany.on('click', function () {
    var ids = [];
    //获取复选框选中的用户
    var checkedUser = $('#usersBody').find('input').filter(':checked');
    //循环复选框,从复选框元素上获取data-id
    checkedUser.each(function (index, item) {
        ids.push($(item).attr('data-id'));
    });
    // console.log(ids);
    // return false;
    if (confirm('您真的要批量删除用户吗?')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function () {
                location.reload();
            }
        });
    };
});