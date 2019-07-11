//添加轮播图图片
$('#file').on('change', function () {
    //用户选择到的文件
    var flie = this.files[0];
    var formData = new FormData();
    formData.append('image', flie);
    //向服务器发送请求 上传图片
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            //console.log(response[0].image)
            $('#image').val(response[0].image);
        }
    })
});


//上传轮播图数据
$('#slidesFrom').on('submit', function () {
    var formData = $(this).serialize();
    //console.log(formData);

    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function (res) {
            //console.log(res);
            location.reload();
        }
    });
    return false;
});

//查询数据渲染页面
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        console.log(res);
        var html = template('slidesTpl', {
            data: res
        });
        $('#slidesBox').html(html);
    }
})


//轮播图删除功能
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除操作吗?')) {
        var id = $(this).data('id');
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function (response) {
                location.reload();
            }
        });
    };
});