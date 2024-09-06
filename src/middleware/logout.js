document.getElementById('logoutButton').addEventListener('click', () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '../index.html'; // Cambia esto a la URL de tu página de inicio de sesión
});