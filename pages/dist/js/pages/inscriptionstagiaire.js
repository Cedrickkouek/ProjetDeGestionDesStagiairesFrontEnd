alert("GOOD!");


function handleRegistration(event) {
    event.preventDefault();

    // Get user input
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const dateNaissance = document.getElementById("dateNaissance").value;
    const etablissement = document.getElementById("etablissement").value;
    const numTel = document.getElementById("numTel").value;
    const filiere= document.getElementById("filiere").value;
    const email = document.getElementById("email").value;

    // Create an object with user information
    const user = {
        nom: nom,
        prenom:prenom,
        dateNaissance: dateNaissance,
        etablissement:etablissement,
        filiere:filiere,
        email: email,
        numTel: numTel
    };
    fetch('http://127.0.0.1:8096/stagiaire/stagiaire/creerStagiare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (!response.ok) {
            throw new Error('ERREUR DE CONNEXION ❌');
        }
        return response;
    }).then(() => {
        
        alert("VOTRE DEMANDE DE STAGE A ETE ENVOYER ✅!")
    }).catch(error => {
        console.error('POST request error:', error);
    });

}

// Attach the handleRegistration function to the form's submit event
const formulaireEnregistrement = document.getElementById("formulaireEnregistrement");
formulaireEnregistrement.addEventListener("submit", handleRegistration);