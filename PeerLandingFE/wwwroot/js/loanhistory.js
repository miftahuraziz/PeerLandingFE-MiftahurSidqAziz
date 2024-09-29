async function fetchFundings() {
    //const token = localStorage.getItem('jwtToken');

    const response = await fetch(`/ApiFunding/GetAllFundings`, {
        method: 'GET'
    });
    console.log(response);

    if (!response.ok) {
        alert('Failed to fetch fundings')
        return;
    }

    const jsonData = await response.json();

    console.log(jsonData)
    if (jsonData.success) {
        populateFundingsTable(jsonData.data);
    } else {
        alert('No loans found')
    }
}

function populateFundingsTable(fundings) {
    const fundingsTable = document.querySelector('#fundingsTable tbody');
    fundingsTable.innerHTML = '';
    fundings.forEach(funding => {
        const date = new Date(funding.fundedAt).toDateString();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${funding.borrowerName}</td>
            <td>${funding.lenderName}</td>
            <td>${funding.amount} Months</td>
            <td>${date}</td>
            <td>${funding.status}</td>
            `;
        fundingsTable.appendChild(row);
    });
}

window.onload = fetchFundings();
