$(function () {
	var login = $('#login');
	var submitBtn = $('#submit');
	var errInfo = $('.err_info');
	var form = $('#myForm');
	var validator = null;
	var _errArr = [];
	var _errHtml = '';

	// IE7浏览器兼容
	//除了IE7以外的高版本浏览器
	if(submitBtn.get(0).hasAttribute != undefined) {

		//other
		validator = form.validate({
			//debug: true,

			onkeyup: false,
			onfocusout: false,

			rules: {
				username: {
					required: true,
					minlength: 2,
					maxlength: 10
				},
				pass: {
					required: true,
					rangelength: [6, 18]
				}

			},

			messages: {
				username: {
					required: '用户名不得为空',
					minlength: '用户名最少为两位',
					maxlength: '用户名最多为十位'
				},
				pass: {
					required: '请填写登录密码',
					rangelength: '登录密码在6~18位'
				}

			},

			errorPlacement: function (error, element) {
				//console.log(error);

				//当输入框失去焦点的时候，清空一下错误提示数组
				$('#username').on('focusout', function () {
					_errArr = [];
				});

				$('#pass').on('focusout', function () {
					_errArr = [];
				});

				_errArr.push(error[0].innerHTML);

				//数组去除重复的元素
				//定义一个空数组
				var _newErrArr = [];

				for(var i = 0;i < _errArr.length;i++) {
					//不存在的时候才push进去
					if(_newErrArr.indexOf(_errArr[i]) == -1) {
						_newErrArr.push(_errArr[i]);
					}
				}
				/*console.log( _newErrArr);

				console.log( _newErrArr.length);
				console.log(_newErrArr.join(','));*/

				_errHtml =  _newErrArr.join(',');
				//console.log(_errHtml);
				errInfo.find('.err_constant').html(_errHtml);

			}
		});
	}


	submitBtn.on('click', function () {

		// IE7浏览器兼容
		if(submitBtn.get(0).hasAttribute == undefined) {
			// ie7
			//传统简易验证
			//alert('ie7');
			var userName = $('#username');
			var password = $('#pass');

			//alert($.trim(userName.val()));
			if($.trim(userName.val()) == '' || $.trim(userName.val()) == null) {
				alert('请填写用户名');
			}else {
				if($.trim(password.val()) == '' || $.trim(password.val()) == null) {
					alert('请填写密码');
				}else {
					//验证通过
					ajaxForm();
					document.getElementById('myForm').submit();
				}
			}

		}else {
			// other browser
			//表单无效的特效提示
			if(validator.form() == false) {
				//console.log('表单验证未成功，请用户查看表单上方的提示信息');
				errInfo.fadeOut('fast').fadeIn('fast');
			}else {
				ajaxForm();
				form.submit();
			}

		}

	});

	// 在JS中，函数和变量都会自动提升
	function ajaxForm() {
		var _importUser = $('input#username');
		var _importPass = $('input#pass');
		var username = $.trim(_importUser.val());
		var pass = $.trim(_importPass.val());

		//alert(username);
		//alert(pass);
        //alert(location.pathname);

		$.ajax({
			url: location.pathname + 'test.php',
			type: 'GET',
			data: {username: username, password:pass},
			error: function (xhr, errText) {
				//alert('错误');
				console.log('错误：' + errText);
			},
			success: function (data) {
				alert('提交成功');
				//alert(data);
			}
		});

		//alert('测试');
	}


});







