//用户点击退出事件
$('#logout').on('click', function () {
  //点击触发警示框
  var isConfirm = confirm('您真的要退出吗?');
  //如果为确定,发送请求到服务端.删除登陆cooki,跳转到登陆页面
  if (isConfirm) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function () {
        location.href = 'login.html';
      },
      error: function () {
        alert('退出失败')
      }
    })
  };
});

//处理日期格式
template.defaults.imports.dateFormat = function (date) {
  var data = new Date(date);
  return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
};