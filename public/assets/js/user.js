$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
    //console.log(formData); 
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(){
            location.reload();
        },
        error:function(){
            alert('添加失败');
        }
    })
    return false;
});