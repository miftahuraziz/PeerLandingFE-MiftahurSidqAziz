async function submitLogin() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/ApiLogin/Login', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
            localStorage.setItem('id', result.data.id);
            localStorage.setItem('jwtToken', result.data.token);

            const token = result.data.token;

            const jwtPayLoad = JSON.parse(atob(token.split('.')[1]));
            console.log(jwtPayLoad);
            const role = jwtPayLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(role);

            if (role === 'admin') {
                window.location.href = '/Admin/';
            } else if (role === 'lender') {
                window.location.href = '/Lender/';
            } else if (role === 'borrower') {
                window.location.href = '/Borrower/';
            }
            else {
                alert('Unauthorized role.');
            }
        } else {
            alert(result.message || 'Login failed. Please try again.');
        }
    }
    catch (error) {
        alert('An error occured while logging in: ' + error.message)
    }
}