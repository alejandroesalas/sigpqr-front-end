import Swal from 'sweetalert2';

export const global = {
    url: 'https://sigpqr-back-end.herokuapp.com/api/',
    contentType: 'application/x-www-form-urlencoded',
    tagProgram: 'programs',
    tagAdmin: 'admin',
    tagUser: 'users',
    tagCoordinator: 'coordinators',
    tagFaculty: 'faculties',
    tagAdd: 'add',
    tagEdit: 'edit'
};
export const swal = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
});
