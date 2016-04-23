$(function () {
    var validator = null;

	validator = $('#myForm').validate({
		//debug: true,
		rules: {
			username: {
				required: true,
                minlength: 4,
                maxlength: 12
			},
            pass: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            equalPass: {
                equalTo: '#pass',
                required: true,
                minlength: 6,
                maxlength: 20
            },
            code: {
                required: true,
                number: true
            },
            email: {
                required: true,
                email: true
            }
		},
		messages: {
			username: {
				required: '用户名必填',
                minlength: '用户名最少4位',
                maxlength: '用户名最多12位'
			},
            pass: {
                required: '密码必填',
                minlength: '密码最少6位',
                maxlength: '密码最多20位'
            },
            equalPass: {
                equalTo: '两次密码输入不一致',
                required: '密码必填',
                minlength: '密码最少6位',
                maxlength: '密码最多20位'
            },
            code: {
                required: '验证码必须填写',
                number: '验证码必须为数字'
            },
            email: {
                required: '邮箱必填',
                email: '邮箱格式不正确'
            }
		},
		errorClass: 'form_err'
	});


$('#submit_btn').click(function () {
    if(validator.form()) {
        $.ajax({
            url: location.pathname + 'test.php',
            type: 'post',
            data: $('#myForm').serialize(),
            error: function () {
                alert('错误');
            },
            success: function (resData) {
                alert('成功：' + resData);
            }
        });
    }else {
        console.log('表单验证未成功！');
    }

});





});
