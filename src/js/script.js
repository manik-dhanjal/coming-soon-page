'use-strict';

const inputEmail = document.querySelector('.input-email');
const btnSubmit = document.querySelector('.btn-submit');
const outputMsg = document.querySelector('.output-message');
//dark mode veriables
// const darkModeToggle = document.getElementById('dark-mode-checkbox');
const root = document.documentElement;
const encode = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&');
};
//validating the input
const validateEmail = (email) => {
	const emailRegex =
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|mil|edu|biz|gov|info|name|museum|[a-zA-Z]{2})$/;

	return emailRegex.test(email);
};

//submit button funtionality
btnSubmit.addEventListener('click', async function (e) {
	e.preventDefault();
	let message = '';
	const userEmail = String(inputEmail.value)?.trim();

	if (userEmail === '') {
		message = 'Whoops! It looks like you forgot to add your email';
		outputDesign('error');
	} else if (validateEmail(userEmail)) {
		message = 'Thank you for subscribing!';
		await fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': 'contact',
				email: userEmail,
			}),
		})
			.then(() => {
				outputDesign('success');
				inputEmail.value = '';
			})
			.catch((error) => {
				message = error.message;
				outputDesign('error');
			});
	} else {
		message = 'Please provide a valid email.';
		outputDesign('error');
	}
	return (outputMsg.textContent = message);
});

//designing the elements
const outputDesign = function (status) {
	if (status === 'error') {
		outputMsg.style.color = 'var(--light-red)';
		inputEmail.style.borderColor = 'var(--light-red)';
	} else if (status === 'success') {
		inputEmail.style.borderColor = 'var(--light-red)';
		outputMsg.style.color = 'var(--success)';
	}
};

//dark mode feature
// const darkMode = function () {
// 	if (darkModeToggle.checked === true) {
// 		root.classList.add('dark-mode');
// 	} else {
// 		root.classList.remove('dark-mode');
// 	}
// };

// darkModeToggle.addEventListener('change', darkMode);
// window.addEventListener('load', darkMode);
