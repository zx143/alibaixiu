//获取文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (response) {
        //console.log(response);
        //总数量
        $("#sum").html(response.postCount);
        //未审核文章数量
        $("#audit").html(response.draftCount);
    }
});

//获取分类数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function (response) {
        //console.log(response);
        $('#classify').html(response.categoryCount);
    }
});


//获取评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function (response) {
        // console.log(response);
        $('#sumComment').html(response.commentCount)
    }
})