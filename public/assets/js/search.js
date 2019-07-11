var key = getId('key');

$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function (res) {
        var html = template('searchTpl', {
            data: res
        });
        $('#listBox').html(html)
    }
})