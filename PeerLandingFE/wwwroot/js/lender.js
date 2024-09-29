async function fetchLoans() {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(`/ApiMstLoan/GetAllLoans/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        alert('Failed to fetch loans')
        return;
    }

    const jsonData = await response.json();

    console.log(jsonData)
    if (jsonData.success) {
        populateLoansTable(jsonData.data);
    } else {
        alert('No loans found')
    }
}

function populateLoansTable(loans) {
    const loanTableBody = document.querySelector('#loansTable tbody');
    loanTableBody.innerHTML = '';
    loans.forEach(loan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${loan.borrowerName}</td>
            <td>${loan.amount}</td>
            <td>${loan.interestRate}</td>
            <td>${loan.duration}</td>
            <td>${loan.status}</td>
            <td>
                <input type="hidden" id="loanId" />
                <button class="btn btn-primary btn-sm" id="btnFund" onclick="editLoan('${loan.loanId}')">Fund</button>
            </td>
            `;
        loanTableBody.appendChild(row);
    });
}

function updateLoan() {
    const id = document.getElementById('loanId').value;
    const status = 'funded';

    const token = localStorage.getItem('jwtToken');

    const reqUpdateLoanDto = {
        status: status
    }

    fetch(`/ApiMstLoan/UpdateLoan/${id}`, {
        method: 'PUT',
        headers: {
            //'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqUpdateLoanDto)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update loan data');
            }
            return response.json();
        })
        .then(data => {
            alert('Loan updated successfully');
            $('#confirmationModal').modal('hide');;
            fetchLoans();
        })
        .catch(error => {
            alert('Error updating loan data: ' + error.message)
        });
}

async function fetchLender() {
    const token = localStorage.getItem('jwtToken');
    const id = localStorage.getItem("id")

    const response = await fetch(`/ApiMstUser/GetUserById/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        alert('Failed to fetch user data')
        return;
    }

    const jsonData = await response.json();

    console.log(jsonData)
    if (jsonData.success) {
        const userBalance = jsonData.data.balance;
        const currencyFormat = new Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: 'IDR'
        });


        document.getElementById('balance').innerHTML = currencyFormat.format(userBalance);
    } else {
        alert('No user found')
    }
}

async function addBalance() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwtToken");
    const balanceInput = document.getElementById('balanceAmount').value;

    try {
        const response = await fetch(`/ApiMstUser/GetUserById/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data: ' + response.statusText);
        }

        const data = await response.json();


        if (data.success) {
            const addBalance = parseFloat(balanceInput);
            const userBalance = data.data.balance + addBalance;
            console.log('User Balance: ' + userBalance);
            const reqMstUserDto = {
                name: data.data.name,
                role: data.data.role,
                balance: userBalance
            };

            const updateResponse = await fetch(`/ApiMstUSer/UpdateUser/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": "Bearer " + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqMstUserDto)
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to add balance');
            }

            const updateData = await updateResponse.json();
            console.log(updateData);

            $('#addBalanceModal').modal('hide');
            alert('Balance added successfully');
            fetchLender();
        } else {
            alert('User not found');
        }
    } catch (error) {
        alert('Error: ' + error);
    }
}

window.omload = fetchLender();
window.onload = fetchLoans();

function editLoan(id) {
    $('#confirmationModal').modal('show');;

    const token = localStorage.getItem('jwtToken');

    fetch(`/ApiMstLoan/GetLoanById/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch loan data');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const loan = data.data;

                //for loan id
                document.getElementById('loanId').value = id;
            }
            else {
                alert('Loan not found');
            }
        })
        .catch(error => {
            alert('Error fetching loan data: ' + error.message)
        });
}

async function fundingLoan() {
    const loanId = document.getElementById('loanId').value;
    const lenderId = localStorage.getItem('id');

    //const token = localStorage.getItem('jwtToken');

    const reqFundingLoanDto = {
        loanId: loanId,
        lenderId: lenderId
    };
    console.log(reqFundingLoanDto);

    fetch(`/ApiMstLoan/FundingLoan/`, {
        method: 'POST',
        headers: {
            //'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqFundingLoanDto)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fund loan data');
            }
            return response.json();
        })
        .then(data => {
            alert('Loan funded successfully');
            $('#confirmationModal').modal('hide');;
            fetchLoans();
            window.omload = fetchLender();
        })
        .catch(error => {
            alert('Error funding loan data: ' + error.message)
        });
}



