$("#login-form").validate({
	onfocusout: false,
	onkeyup: false,
	onclick: false,
	rules: {
		"email": {
			required: true,
			email:true
		},
		"password": {
			required: true,
			minlength: 3,
		},
	},
	messages: {
		"email": {
			required: "Vui lòng nhập email",
			email: "Email không đúng định dạng"
		},
		"password": {
			required: "Vui lòng nhập password",
			minlength: "Mật khẩu phải trên 3 kí tự"
		}
	}
})
jQuery.validator.addMethod("specialChars", function( value, element ) {
	var regex = new RegExp("[~!@#$%^&*]");
	var key = value;

	if (!regex.test(key)) {
	   return false;
	}
	return true;
}, "Mật khẩu bao gồm ký tự đặc biệt");