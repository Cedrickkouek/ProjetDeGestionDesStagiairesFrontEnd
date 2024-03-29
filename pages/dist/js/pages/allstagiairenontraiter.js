fetch('http://127.0.0.1:8096/stagiaire/stagiaire/findAllStagNonTraiter', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
}).then((response) => {
    return response.json();
}).then((data) => {
    console.log(data);
    displayStagiaires(data);
}).catch(error => {
    console.error('Error fetching data:', error);
});

var emailSelected;


function displayStagiaires(data) {
    const tableBody = document.querySelector('#example1 tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((stagiaire, index) => {
        const row = document.createElement('tr');

        // Create and append cells for each property
        const idCell = document.createElement('td');
        idCell.textContent = stagiaire.idStagiaire; // Use idStagiaire as the ID
        row.appendChild(idCell);

        const nomCell = document.createElement('td');
        nomCell.textContent = stagiaire.nom;
        row.appendChild(nomCell);

        const prenomCell = document.createElement('td');
        prenomCell.textContent = stagiaire.prenom;
        row.appendChild(prenomCell);

        const dateNaissanceCell = document.createElement('td');
        dateNaissanceCell.textContent = stagiaire.dateNaissance;
        row.appendChild(dateNaissanceCell);

        // Assuming "Lieu N" is not directly available in the JSON, you might need to adjust this part
        const lieuNCell = document.createElement('td');
        lieuNCell.textContent = stagiaire.lieuNaissance; // Placeholder for "Lieu N"
        row.appendChild(lieuNCell);

        const etablissementCell = document.createElement('td');
        etablissementCell.textContent = stagiaire.etablissement;
        row.appendChild(etablissementCell);

        const telephoneCell = document.createElement('td');
        telephoneCell.textContent = stagiaire.numTel;
        row.appendChild(telephoneCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = stagiaire.email;
        row.appendChild(emailCell);

        const filiereCell = document.createElement('td');
        filiereCell.textContent = stagiaire.filiere;
        row.appendChild(filiereCell);

        // For "Telecharger" and "valider/ refuser" buttons, you can create buttons and append them to a cell
        const actionsCell = document.createElement('td');
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Generate PDF';
        downloadButton.className = 'btn btn-primary float-right';
        downloadButton.style.marginRight = '5px';
        actionsCell.appendChild(downloadButton);

        const validateButton = document.createElement('button');
        validateButton.textContent = 'Validate';
        validateButton.className = 'btn btn-primary float-right';
        validateButton.style.marginRight = '5px';
        validateButton.style.backgroundColor = 'green';
        actionsCell.appendChild(validateButton);

        const rejectButton = document.createElement('button');
        rejectButton.textContent = 'Reject';
        rejectButton.className = 'btn btn-danger float-right';
        rejectButton.style.marginRight = '5px';
        actionsCell.appendChild(rejectButton);

        validateButton.onclick = function() {
            // Store the email of the clicked row in the emailSelected variable
            emailSelected = stagiaire.email;
            validateRequest(emailSelected);
            alert("EMAIL DE VALIDATION ENVOYE AU CANDIDAT !");
            setTimeout(function(){
                window.location.reload();
            }, 5000);
        };

        rejectButton.onclick = function() {
            // Store the email of the clicked row in the emailSelected variable
            emailSelected = stagiaire.email;
            rejectRequest(emailSelected);
            alert("EMAIL DE REFUS ENVOYE AU CANDIDAT !");
            setTimeout(function(){
                window.location.reload();
            }, 5000);
        };

        row.appendChild(actionsCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

   
   url.searchParams.append('emailStagiaire', emailSelected);

   function rejectRequest(email) {

    const url = new URL('http://127.0.0.1:8096/stagiaire/encadreur/envoiEmailRefuser');
    url.searchParams.append('emailStagiaire', email);
            fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                displayStagiaires(data);
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
   }

   function validateRequest(email) {
    const url = new URL('http://127.0.0.1:8096/stagiaire/encadreur/envoiEmailValidation');
    url.searchParams.append('emailStagiaire', email);
            fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                displayStagiaires(data);
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
   }