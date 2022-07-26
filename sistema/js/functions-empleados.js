$('#tableempleados').DataTable();
var tableempleados;

document.addEventListener('DOMContentLoaded',function(){
    tableempleados = $('#tableempleados').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": "./models/empleados/table_empleados.php",
            "dataSrc":""
        },
        "columns": [
            {"data":"empleado_id"},
            {"data":"nombre"},
            {"data":"apellido"},
            {"data":"edad"},
            {"data":"direccion"},
            {"data":"cedula"},
            {"data":"telefono"},
            {"data":"correo"},
            {"data":"fecha_nac"},
            {"data":"estatus"},
            {"data":"options"}
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"asc"]]
    });

    // CREAR empleadoS
    var formempleados = document.querySelector('#formempleado');
    formempleados.onsubmit = function(e) {
        e.preventDefault();
        var nombre = document.querySelector('#txtNombre').value;
        var apellido = document.querySelector('#txtApellido').value;
        var edad = document.querySelector('#edad').value;
        var direccion = document.querySelector('#txtDireccion').value;
        var cedula = document.querySelector('#cedula').value;
        var telefono = document.querySelector('#telefono').value;
        var email = document.querySelector('#email').value;
        var fechaNac = document.querySelector('#fechaNac').value;
        var status = document.querySelector('#listStatus').value;

        if(nombre == '' || apellido == '' || edad == '' || direccion == '' || cedula == '' || telefono == '' || email == '' || fechaNac == '' || status == '') {
            swal('Atencion','Todos los campos son necesarios','error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = './models/empleados/ajax-empleados.php';
        var formempleado = new FormData(formempleados);
        request.open('POST',ajaxUrl,true);
        request.send(formempleado);
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
                var objData = JSON.parse(request.responseText);
                if(objData.status) {
                    $('#modalFormempleado').modal('hide');
                    formempleados.reset();
                    swal('Crear empleado',objData.msg,'success');
                    tableempleados.ajax.reload(function(){
                        editempleado();
                        delempleado();
                    })
                } else {
                    swal('Atencion',objData.msg,'error');
                }
            }
        }
    }
});

window.addEventListener('load',function(){
    editempleado();
    delempleado();
},false);

function editempleado() {
    var btnEditempleado = document.querySelectorAll('.btnEditempleado');
    btnEditempleado.forEach(function(btnEditempleado){
        btnEditempleado.addEventListener('click',function(){
            document.querySelector('#titleModal').innerHTML = 'Actualizar empleado';
            document.querySelector('.modal-header').classList.replace('headerRegister','updateRegister');
            document.querySelector('#btnActionForm').classList.replace('btn-primary','btn-info');
            document.querySelector('#btnText').innerHTML = 'Actualizar';

            var idempleado = this.getAttribute('rl');

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/empleados/edit_empleados.php?id='+idempleado;
            //var strData = 'idempleado='+idempleado;
            request.open('GET',ajaxUrl,true);
            request.send();
            request.onreadystatechange = function() {
                if(request.readyState == 4 && request.status == 200) {
                    if(request.status) {
                        var objData = JSON.parse(request.responseText);
                        document.querySelector('#idempleado').value = objData.data.empleado_id;
                        document.querySelector('#txtNombre').value = objData.data.nombre;
                        document.querySelector('#txtApellido').value = objData.data.apellido;
                        document.querySelector('#edad').value = objData.data.edad;
                        document.querySelector('#txtDireccion').value = objData.data.direccion;
                        document.querySelector('#cedula').value = objData.data.cedula;
                        document.querySelector('#telefono').value = objData.data.telefono;
                        document.querySelector('#email').value = objData.data.correo;
                        document.querySelector('#fechaNac').value = objData.data.fecha_nac;
                        document.querySelector('#listStatus').value = objData.data.estatus;

                        $('#modalFormempleado').modal('show');
                    } else {
                        swal('Atencion',objData.msg,'error');
                    }
                }
            }
        });
    });
};

function delempleado() {
    var btnDelempleado = document.querySelectorAll('.btnDelempleado');
    btnDelempleado.forEach(function(btnDelempleado){
        btnDelempleado.addEventListener('click',function(){
            var idempleado = this.getAttribute('rl');
            swal({
                title: "Eliminar empleado",
                text: "Realmente desea eliminar el empleado?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            },function(confirm){
                if(confirm) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = './models/empleados/del_empleados.php';
                    var strData = 'idempleado='+idempleado;
                    request.open('POST',ajaxUrl,true);
                    request.setRequestHeader('Content-type','Application/x-www-form-urlencoded');
                    request.send(strData);
                    request.onreadystatechange = function() {
                        if(request.readyState == 4 && request.status == 200) {
                            var objData = JSON.parse(request.responseText);
                            if(objData.status) {
                                swal("Eliminar!", objData.msg , "success");
                                tableempleados.ajax.reload(function(){
                                    editempleado();
                                    delempleado();
                                });
                            } else {
                                swal("Atencion",objData.msg,"error");
                            }
                        }
                    }
                }
            })
        })
    })
}

function openModalempleado() {
    document.querySelector('#idempleado').value = "";
    document.querySelector('#titleModal').innerHTML = 'Nuevo empleado';
    document.querySelector('.modal-header').classList.replace('updateUpdate','headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info','btn-primary');
    document.querySelector('#btnText').innerHTML = 'Guardar';
    document.querySelector('#formempleado').reset();
    $('#modalFormempleado').modal('show');
}

