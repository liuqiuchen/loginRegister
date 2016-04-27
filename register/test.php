<?php

$username = $_POST['username'];
$pass = md5($_POST['pass']);
$equalPass = md5($_POST['equalPass']);
$code = $_POST['code'];
$email = $_POST['email'];

echo '用户名：' . $username;
echo "，";
echo '密码：'.$pass;
echo "，";
echo '确认密码：'.$equalPass;
echo "，";
echo '验证码：' . $code;
echo "，";
echo '邮箱：'.$email;
