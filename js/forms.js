"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);
		
		let formData = new formData(form);
		formData.append('audio', formAudio.files[0]);

		if (error === 0) {
			
		} else {
			alert("Зполните обязательные поля");
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if(input.classList.contains('_email')){
				if (emailTest(input)) {
					formAddError(input);
					error++;
				} 
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	const formAudio = document.getElementById('formAudio');

	const formPreview = document.getElementById('formPreview');

	formAudio.addEventListener('change', () => {
		uploadFile(formAudio.files[0]);
	});

	function uploadFile(file) {
		if (!['audio/wav', 'audio/mp3'].includes(file.type)) {
			alert('Разрещены только аудио.');
			formAudio.value = '';
			return;
		}
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.');
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<audio src="${e.target.result}" controls>`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
});