//轮播图
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        //console.log(res);
        var html = template('homeTpl', {
            data: res
        });
        $('#homeBox').html(html);
        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
});

//处理日期格式
template.defaults.imports.dateFormat = function (date) {
    var data = new Date(date);
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
};

//最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (res) {
        console.log(res);
        var html = template('lastedTpl', {
            data: res
        });
        //console.log(html);
        $('#lasdetBox').html(html);
    }
})