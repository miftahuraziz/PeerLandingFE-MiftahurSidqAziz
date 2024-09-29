async function fetchBorrowerLoans() {
    const borrowerId = localStorage.getItem('id');
    //const token = localStorage.getItem('jwtToken');

    const response = await fetch(`/ApiMstLoan/GetLoans?borrowerId=${borrowerId}`, {
        method: 'GET'
    });
    console.log(response);

    if (!response.ok) {
        alert('Failed to fetch loans')
        return;
    }

    const jsonData = await response.json();

    console.log(jsonData)
    if (jsonData.success) {
        populateBorrowerLoansTable(jsonData.data);
    } else {
        alert('No loans found')
    }
}

function populateBorrowerLoansTable(loans) {
    const loanTableBody = document.querySelector('#loanTable tbody');
    loanTableBody.innerHTML = '';
    loans.forEach(loan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${loan.amount}</td>
            <td>${loan.interestRate}</td>
            <td>${loan.duration}</td>
            <td>${loan.status}</td>
            <td>
                <button class="btn btn-primary btn-sm">Detail</button>
            </td>
            `;
        loanTableBody.appendChild(row);
    });
}

window.onload = fetchBorrowerLoans();
async function RequestLoan() {
    try {
        const borrowerId = localStorage.getItem('id');
        const amount = document.getElementById('amount').value;

        const reqLoanDto = {
            borrowerId: borrowerId,
            amount: parseFloat(amount)
        }
        console.log(reqLoanDto);

        //const token = localStorage.getItem('jwtToken');

        const response = await fetch('/ApiMstLoan/CreateLoan/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqLoanDto)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            $('#addLoanModal').modal('hide');
            fetchBorrowerLoans();
        }
        else {
            alert(result.message || 'Request loan failed. Please try again.');
        }
    }
    catch (error) {
        alert('Errord requesting loan: ' + error.message);
    }
}