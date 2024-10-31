// src/notificationService.js
import Swal from 'sweetalert2';

const NotificationService = {
    success: (title, text) => {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    },
    error: (title, text) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    },
    warning: (title, text) => {
        Swal.fire({
            icon: 'warning',
            title: title,
            text: text,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    },
    info: (title, text) => {
        Swal.fire({
            icon: 'info',
            title: title,
            text: text,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    },
};

export default NotificationService;
