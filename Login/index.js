$(document).ready(function () {

	function loading() {
		var button = $('button'),
			spinner = '<span class="spinner"></span>';
		if (!button.hasClass('loading')) {
			button.toggleClass('loading');
			setTimeout(function () {
				button.html(spinner);
			}, 1500)
		}
		else {
			button.toggleClass('loading').html("Login");
		}
	}

	$('#btn-login').click((e) => {
		loading()
		e.preventDefault(); // Now link won't go anywhere
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		console.log(email);
		console.log(password);
		let url = "https://reqres.in/api/login"
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					email: email,
					password: password
				}
			)
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				loading()

				if (data.token) {
					localStorage.setItem("token", data.token)
					Swal.fire({
						icon: 'success',
						title: 'Đăng nhập thành công',
						showConfirmButton: false,
						timer: 1500
					  })
				}


			})
			.catch((error) => {
				console.log("error");
				console.log(error);
			})
	})

	// hiển thị lỗi
	function hideError() {
		let arr = ['Username', 'Password'];
		arr.forEach(item => {
			let str = 'error' + item;
			$(`#${str}`).attr('style', "display:none");
			$(`#${str}`).empty();
		})

	}
	function showError(errors) {
		errors.forEach(error => {
			// cộng chuỗi để tạo thành id
			let str = 'error' + error.type;
			// hiển thị div show err
			document.getElementById(str).style.display = 'block';
			// thêm error vào div
			document.getElementById(str).innerText = error.message;
		})
	}

})
