//添加分类  监听添加按钮提交事件
$('#addCategory').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    });
    return false;
});

//发送ajax请求  向服务器所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('categoriesTpl', {
            data: response
        });
        //console.log(html);
        $('#categoriesBox').html(html);
    }
});

//编辑用户功能
$('#categoriesBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            //console.log(response);
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    });
});

//修改用户列表数据
$('#formBox').on('submit', '#modifyCategory', function () {
    //获取用户点击的列表数据
    var formData = $(this).serialize();
    //获取用户点击的列表id
    var id = $(this).attr('data-id');
    //发送请求
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    })
    return false;
});

//删除功能
$('#categoriesBox').on('click', '.delete', function () {
    if (confirm('您真的要删除次分类吗?')) {
        //获取用户点击分类的id
        var id = $(this).data('id');
        //console.log(id);
        //发送请求
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        });
    };
});