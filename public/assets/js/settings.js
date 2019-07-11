//上传网站logo or 预览上传的logo
$('#logoFile').on('change', function () {
    var file = this.files[0];
    //console.log(file);
    var formData = new FormData();
    formData.append('logo', file);
    //$('#logo').val(file);
    //发送请求 上传文件
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            $('#logo').val(res[0].logo);
            $('#logoImg').attr('src', res[0].logo);
        }
    })
});

//上传网站设置表单
$('#settingsFrom').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function (res) {
            //console.log(res);
            location.reload();
        }
    })
    return false;
});

//显示上传过的页面
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        //console.log(res);
        //判断数据库中有没有上传的数据
        if (res) { //如果有就渲染到页面中
            $('#logo').val(res.logo);
            $('#logoImg').attr('src', res.logo);
            $('#title').val(res.title);
            $('#description').val(res.description);
            $('#keywords').val(res.keywords);
            // if (res.comment == true) {
            //     $('#comment').prop('check', true);
            // };
            // if (res.review == true) {
            //     $('#review').prop('check', true);
            // };
            $('#comment').prop('check', res.comment);
            $('#review').prop('check', res.review);
        }
    }
});