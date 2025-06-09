function logout() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Tu sesión se cerrará y serás redirigido al inicio.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'custom-swal',
            title: 'custom-title',
            htmlContainer: 'custom-text',
            confirmButton: 'custom-success',
            cancelButton: 'custom-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();
            window.location.href = '../index.html';
        }
    });
}