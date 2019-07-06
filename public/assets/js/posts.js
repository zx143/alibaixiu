//发送请求
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response);
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
    }
});

//处理日期格式
template.defaults.imports.dateFormat = function (date) {
    var data = new Date(date);
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
};