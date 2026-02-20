let usersDatabase = JSON.parse(localStorage.getItem('users')) || [];

function toggleForm(view) {
    const loginForm = $('#loginForm');
    const registerForm = $('#registerForm');
    const sideVisual = $('#sideVisual');
    const tableVisual = $('#tableVisual');

    $('input').removeClass('required-error shake');

    if(view === 'register') {
        loginForm.hide();
        sideVisual.hide();
        registerForm.show();
        tableVisual.css('display', 'flex');
        renderTable(); 
    } else {
        registerForm.hide();
        tableVisual.hide();
        loginForm.show();
        sideVisual.show();
    }
}

function renderTable() {
    const tbody = $('#userTableBody');
    tbody.empty();

    if (usersDatabase.length === 0) {
        tbody.append('<tr><td colspan="4" style="text-align:center; opacity:0.5; color: white;">No users registered yet.</td></tr>');
        return;
    }

    for (let i = 0; i < usersDatabase.length; i++) {
        const user = usersDatabase[i]; 
        const middle = user.mname ? user.mname + " " : "";
        const fullName = `${user.fname} ${middle}${user.sname}`;

        tbody.append(`
            <tr>
                <td>${fullName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td><button class="btn-delete" onclick="deleteUser(${i})">Delete</button></td>
            </tr>
        `);
    }
}

function deleteUser(index) {
    usersDatabase.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(usersDatabase));
    renderTable();
}

$(document).ready(function() {
    renderTable();

    function validateInput(selector) {
        let isValid = true;
        const inputs = $(selector);

        for (let i = 0; i < inputs.length; i++) {
            const currentInput = $(inputs[i]); 

            if (currentInput.attr('id') === 'mname') continue; 
            
            if (currentInput.val().trim() === "") {
                currentInput.addClass('required-error shake');
                isValid = false;
            } else {
                currentInput.removeClass('required-error shake');
            }
        }
        return isValid;
    }

    $('input').on('input', function() {
        $(this).removeClass('required-error shake');
    });

    $('#btnRegister').click(function() {
        if (!validateInput('#registerForm input')) {
            Swal.fire({
                icon: 'warning',
                title: 'Registration Failed',
                text: 'Please fill in all required fields.',
                confirmButtonColor: '#4e73df'
            });
            return;
        }

        const pass = $('#regPass').val();
        const conf = $('#confPass').val();

        if (pass !== conf) {
            $('#regPass, #confPass').addClass('required-error shake');
            Swal.fire('Error', 'Passwords do not match!', 'error');
            return;
        }

        const newUser = {
            fname: $('#fname').val().trim(),
            mname: $('#mname').val().trim(), 
            sname: $('#sname').val().trim(),
            age: $('#age').val().trim(),
            email: $('#regEmail').val().trim(),
            pass: pass
        };

        usersDatabase.push(newUser);
        localStorage.setItem('users', JSON.stringify(usersDatabase));
        renderTable();

        Swal.fire({ icon: 'success', title: 'Account Created!', showConfirmButton: false, timer: 1500 });
        $('#registerForm input').val('');
        setTimeout(() => toggleForm('login'), 1500);
    });

    $('#btnLogin').click(function() {
        if (!validateInput('#loginForm input')) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Please enter both email and password.',
                confirmButtonColor: '#4e73df'
            });
            return;
        }

        const email = $('#logEmail').val().trim();
        const pass = $('#logPass').val();
        const match = usersDatabase.find(u => u.email === email && u.pass === pass);

        if (match) {
            Swal.fire('Welcome!', `Logged in as ${match.fname}.`, 'success');
        } else {
            $('#logEmail, #logPass').addClass('required-error shake');
            Swal.fire('Access Denied', 'Invalid email or password.', 'error');
        }
    });
});