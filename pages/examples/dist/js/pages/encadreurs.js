fetch('http://127.0.0.1:8096/stagiaire/encadreur/findAllEnc', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
}).then((response) => {
    return response.json();
}).then((data) => {
    console.log(data);
    displayUsers(data);
}).catch(error => {
    console.error('Error fetching data:', error);
});

var id;

function displayUsers(data) {
    const tableBody = document.querySelector('#example1 tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(user => {
        const row = document.createElement('tr');

        // Create and append cells for each property
        const idCell = document.createElement('td');
        idCell.textContent = user.idEncadreur;
        row.appendChild(idCell);

        const nomCell = document.createElement('td');
        nomCell.textContent = user.nomEncadreur;
        row.appendChild(nomCell);

        const prenomCell = document.createElement('td');
        prenomCell.textContent = user.prenomEncadreur;
        row.appendChild(prenomCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.emailEncadreur;
        row.appendChild(emailCell);

        const specialiteCell = document.createElement('td');
        specialiteCell.textContent = user.specialite;
        row.appendChild(specialiteCell);

        const downloadButtonCell = document.createElement('td');
        const downloadButton = document.createElement('button');
        downloadButton.type = 'button';
        downloadButton.className = 'btn btn-primary float-right';
        downloadButton.style.marginRight = '5px';
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Generate PDF';
        downloadButtonCell.appendChild(downloadButton);
        row.appendChild(downloadButtonCell);

        const deleteButtonCell = document.createElement('td');
        deleteButtonCell.className = 'btn btn-danger btn-sm';
        deleteButtonCell.innerHTML = '<i class="fas fa-trash"></i>';
        row.appendChild(deleteButtonCell);

        // Additional cells for actions can be added similarly

        // Append the row to the table body
        tableBody.appendChild(row);



        const deleteButton = row.querySelector('.btn-danger');
        deleteButton.addEventListener('click', function() {
             id = row.dataset.id;
            deleteRow(id);
        });
    });
}

const url = new URL('http://127.0.0.1:8096/stagiaire/encadreur/supprimerencadredeurById');
    url.searchParams.append('idencadredeur', id);

function deleteRow(id) {
    fetch(url, {
        method: 'DELETE',
    }).then(response => {
        return response.text().then(errorMessage => {
            throw new Error(errorMessage);
        });
        // Remove the row from the table
        const row = document.querySelector(`tr[data-id="${id}"]`);
        row.remove();
    }).catch(error => {
        console.error('Error deleting row:', error);
    });
}
