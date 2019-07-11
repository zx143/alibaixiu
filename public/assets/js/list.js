var id = getId('categoryId');

//分类列表数据
$.ajax({
    type: 'get',
    url: '/posts/category/' + id,
    success: function (res) {
        //console.log(res);
        var html = template('listTpl', {
            data: res
        });
        //console.log(html);
        $('#listBox').html(html);
    }
});

//分类信息
$.ajax({
    type: 'get',
    url: '/categories/' + id,
    success: function (res) {
        //console.log(res);

        $('#listTitle').html(res.title)
    }
});