$(function () {
    var validator = null;
    var submitBtn = $('#submit_btn');
    var myForm = $('#myForm');
    var codeBtn = $('#get_code_btn');

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

	var username = $('#username');
	var pass = $('#pass');
	var equalPass = $('#equalPass');
	var code = $('#code');
	var email = $('#email');

	// ie7浏览器
	if($(this).get(0).hasAttribute == undefined) {
		alert('ie7');

        //简单表单验证

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


codeBtn.click(function () {
	var username = $('#username');
	var pass = $('#pass');
	var equalPass = $('#equalPass');
	var _this = $(this);
	var interval = null;
	var seconds = 60;

	if(username.valid() && pass.valid() && equalPass.valid()) {

		if(_this.text() == '获取验证码') {
			// get code
			interval = setInterval(function () {

				seconds--;

				if(seconds == 0) {
					clearInterval(interval);
					_this.css({
						'color': '#b2b2b2'
					}).text('获取验证码');
				}else {
					_this.css({
						'color': '#cccccc'
					}).text(seconds + 's');
				}

			}, 1000);
		}else {
			alert('您正在获取验证码，请耐心等待...');
		}


	}
});


	/**扩展Array的原型方法实现数组去重
	 * 1.创建一个空数组和一个空对象
	 * 2.循环遍历一下要去重的数组，如果和新数组里的元素不重复再放进去，
	 * 并且不重复的元素作为对象obj的一个属性传入，复制为1*/
Array.prototype.removeRepeated = function () {
	var arr = [];
	var obj = {};

	for(var i = 0;i < this.length;i++) {
		if(!obj[this[i]]) {
			arr.push(this[i]);
				obj[this[i]] = 1;
		}
	}

	return arr;
};

//    var repeatedArr = [1,5,8,7,2,1,5,7];
//    var newArr = repeatedArr.removeRepeated();
//
//    console.log(newArr); //[1, 5, 8, 7, 2]
//    console.log(Array.isArray(newArr)); //true


	var email = $('#email');
	var emailTips = [
		'@qq.com',
		'@mail.com',
		'@sina.com.cn',
		'@163.com'
	];
	var emailList = [];
	var newEmailList = [];


	// autoComplete插件，自动补全邮箱
	email.on('keyup', function () {

		for(var i = 0;i < emailTips.length;i++) {
			//整除再清空一次
			if(i / emailTips.length == 0) {
				emailList = [];
			}

			emailList.push(email.val() + emailTips[i]);

			//数组去重
			newEmailList = emailList.removeRepeated();

		}

		//console.log(newEmailList);

		email.autocomplete({
			source: newEmailList
		});

	});



});
