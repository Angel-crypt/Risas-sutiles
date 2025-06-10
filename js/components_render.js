// Carga el contenido del footer.html en el elemento con id 'footer'
fetch('../components/footer.html')
    // Ejecuta una solicitud GET para obtener el contenido del archivo footer.html
    .then(res => res.text())
    // Convierte la respuesta a texto
    .then(data => {
        // Inserta el contenido del archivo footer.html en el elemento con id 'footer'
        document.getElementById('footer').innerHTML = data;
    });