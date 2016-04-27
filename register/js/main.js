$(function () {
    var validator = null;
    var submitBtn = $('#submit_btn');
    var myForm = $('#myForm');

    // ie7以上浏览器
    if(submitBtn.get(0).hasAttribute != undefined) {
        validator = myForm.validate({
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
    }


submitBtn.click(function () {

	// ie7浏览器
	if($(this).get(0).hasAttribute == undefined) {
		alert('ie7');

        //简单表单验证
        var username = $('#username');
        var pass = $('#pass');
        var equalPass = $('#equalPass');
        var code = $('#code');
        var email = $('#email');

        if($.trim(username.val()).length < 4) {
            alert('用户名最少4位');
        }else if ($.trim(username.val()).length > 12) {
            alert('用户名最多12位');
        }else {
            if($.trim(pass.val()).length < 6) {
                alert('密码最少6位');
            }else if ($.trim(pass.val()).length > 20) {
                alert('密码最多20位');
            }else {
                if($.trim(pass.val()) != $.trim(equalPass.val())) {
                    alert('两次密码输入不一致');
                }else {
                    if(!$.isNumeric($.trim(code.val()))) {
                        alert('验证码必须为数字');
                    }else {

                        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                        var emailVal = $.trim(email.val());

                        if(!reg.test(emailVal)) {
                            alert('请填写正确的邮箱格式');
                        }else {
                            ajaxForm();
                        }
                    }
                }
            }
        }

	}else {
		// alert('not ie7');
        if(validator.form()) {
            ajaxForm();
        }else {
            console.log('表单验证未成功！');
        }
	}

});

// ajax提交前端验证好的数据
function ajaxForm() {
    $.ajax({
        url: location.pathname + 'test.php',
        type: 'post',
        data: $('#myForm').serialize(),
        error: function (xhr, errText, errObj) {
            alert('错误' + errText);
        },
        success: function (resData) {
            alert('成功：' + resData);
        }
    });
}



});
