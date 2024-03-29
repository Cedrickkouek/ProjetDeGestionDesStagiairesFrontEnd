// Fetch the JSON data from your Spring Boot backend
fetch('http://127.0.0.1:8096/stagiaire/encadreur/findAllEnc', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
}).then((response) => {
    return response.json();
}).then((data) => {
    console.log(data);
    displayEncadreurs(data);
}).catch(error => {
    console.error('Error fetching data:', error);
});

function displayEncadreurs(data) {
    const tableBody = document.querySelector('#example1 tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((encadreur, index) => {
        const row = document.createElement('tr');

        // Create and append cells for each property
        const idCell = document.createElement('td');
        idCell.textContent = encadreur.idEncadreur; // Corrected from user.idEncadreur to encadreur.idEncadreur
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        const nameLink = document.createElement('a');
        nameLink.innerHTML = `${encadreur.nomEncadreur}  ${encadreur.prenomEncadreur} <br/>`;
        nameCell.appendChild(nameLink);
        const specialite = document.createElement('small');
        specialite.textContent = `Encadreur de ${encadreur.specialite}`;
        nameCell.appendChild(specialite);
        row.appendChild(nameCell);

        // Additional cells for avatars and progress can be added similarly

        const avatarCell = document.createElement('td');
        const avatarList = document.createElement('ul');
        avatarList.className = 'list-inline';
        const avatarItem = document.createElement('li');
        avatarItem.className = 'list-inline-item';
        const avatarImg = document.createElement('img');
        avatarImg.alt = 'Avatar';
        avatarImg.className = 'table-avatar';
        avatarImg.src = '../../dist/img/avatar.png'; // Assuming a default avatar
        avatarItem.appendChild(avatarImg);
        avatarList.appendChild(avatarItem);
        avatarCell.appendChild(avatarList);
        row.appendChild(avatarCell);

        

        // Project progress cell
        const projectProgressCell = document.createElement('td');
        projectProgressCell.className = 'project_progress';

        // Create a progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress progress-sm';
        const progressBarInner = document.createElement('div');
        progressBarInner.className = 'progress-bar bg-green';
        progressBarInner.role = 'progressbar';
        progressBarInner.ariaValuenow = '60';
        progressBarInner.ariaValuemin = '0';
        progressBarInner.ariaValuemax = '100';
        progressBarInner.style.width = '60%';
        progressBar.appendChild(progressBarInner);

        // Create a list of images within the progress bar
        const imageList = document.createElement('ul');
        imageList.className = 'list-inline';
        const imageSources = ['../../dist/img/avatar2.png', '../../dist/img/avatar3.png', '../../dist/img/avatar5.png'];

        imageSources.forEach(src => {
            const listItem = document.createElement('li');
            listItem.className = 'list-inline-item';
            const img = document.createElement('img');
            img.alt = 'Avatar';
            img.className = 'table-avatar';
            img.src = src;
            listItem.appendChild(img);
            imageList.appendChild(listItem);
        });

        // Append the image list to the progress bar cell
        projectProgressCell.appendChild(progressBar);
        projectProgressCell.appendChild(imageList);
        row.appendChild(projectProgressCell);

        // Project actions cell
        const projectActionsCell = document.createElement('td');
        projectActionsCell.className = 'project-actions text-right';
        // Dossier button
        const dossierButton = document.createElement('a');
        dossierButton.className = 'btn btn-primary btn-sm';
        dossierButton.href = '#';
        const dossierIcon = document.createElement('i');
        dossierIcon.className = 'fas fa-folder';
        dossierButton.appendChild(dossierIcon);
        projectActionsCell.appendChild(dossierButton);
        // Modifier button
        const modifierButton = document.createElement('a');
        modifierButton.className = 'btn btn-info btn-sm';
        modifierButton.href = '#';
        const modifierIcon = document.createElement('i');
        modifierIcon.className = 'fas fa-pencil-alt';
        modifierButton.appendChild(modifierIcon);
        projectActionsCell.appendChild(modifierButton);
        // Supprimer button
        const supprimerButton = document.createElement('a');
        supprimerButton.className = 'btn btn-danger btn-sm';
        supprimerButton.href = '#';
        const supprimerIcon = document.createElement('i');
        supprimerIcon.className = 'fas fa-trash';
        supprimerButton.appendChild(supprimerIcon);
        projectActionsCell.appendChild(supprimerButton);
        row.appendChild(projectActionsCell);


        // Append the row to the table body
        tableBody.appendChild(row);
    });
}
