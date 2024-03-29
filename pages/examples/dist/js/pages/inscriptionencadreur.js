alert("Encadreur!");


function handleRegistration(event) {
    event.preventDefault();

    // Get user input
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const specialite = document.getElementById("specialite").value;
    const numTel = document.getElementById("numTel").value;
    const password= document.getElementById("password").value;
    const email = document.getElementById("email").value;

    // Create an object with user information
    const encadreur = {
        nomEncadreur: nom,
        prenomEncadreur:prenom,
        specialite: specialite,
        password:password,
        emailEncadreur: email,
        telEncadreur: numTel
    };
    fetch('http://127.0.0.1:8096/stagiaire/encadreur/creerEncadreur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(encadreur)
        }).then(response => {
            if (!response.ok) {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
            return response;
        }).then(() => {
            alert("INSCRIPTION EFFECTUER AVEC SUCCESS! ✅")
        }).catch(error => {
            console.error('POST request error:', error);
            alert('Error: ' + error.message);
        });


}

// Attach the handleRegistration function to the form's submit event
const registerEncadreur = document.getElementById("registerEncadreur");
registerEncadreur.addEventListener("submit", handleRegistration);