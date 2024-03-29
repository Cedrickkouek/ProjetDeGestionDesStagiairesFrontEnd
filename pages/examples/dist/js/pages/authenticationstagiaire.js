function handleRegistration(event) {
    event.preventDefault();

    // Get user input

    const email = document.getElementById("email").value;
    const password= document.getElementById("password").value;

    // Create an object with user information
    const user = {
        emailEncadreur: email,
        password:password
    };
    fetch('http://127.0.0.1:8096/stagiaire/encadreur/authEncadreur', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
        return response;
    }).then(() => {
        alert("CONNEXION REUSSI! ✅");
        window.location.href = "../tables/encadreur.html";
    }).catch(error => {
        console.error('POST request error:', error);
        alert('Error: ' + error.message);
    });


}

const authenticateEncadreur = document.getElementById("authenticateEncadreur");
authenticateEncadreur.addEventListener("submit", handleRegistration);