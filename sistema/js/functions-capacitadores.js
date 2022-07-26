$('#tablecapacitadores').DataTable();
var tablecapacitadores;

document.addEventListener('DOMContentLoaded',function(){
    tablecapacitadores = $('#tablecapacitadores').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": "./models/capacitadores/table_capacitadores.php",
            "dataSrc":""
        },
        "columns": [
            {"data":"capacitador_id"},
            {"data":"nombre"},
            {"data":"apellido"},
            {"data":"direccion"},
            {"data":"cedula"},
            {"data":"telefono"},
            {"data":"correo"},
            {"data":"nivel_est"},
            {"data":"estatus"},
            {"data":"options"}
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"asc"]]
    });

    // CREAR capacitador
    var formcapacitador = document.querySelector('#formcapacitador');
    formcapacitador.onsubmit = function(e) {
        e.preventDefault();
        var nombre = document.querySelector('#txtNombre').value;
        var apellido = document.querySelector('#txtApellido').value;
        var direccion = document.querySelector('#txtDireccion').value;
        var cedula = document.querySelector('#cedula').value;
        var telefono = document.querySelector('#telefono').value;
        var email = document.querySelector('#email').value;
        var nivelEst = document.querySelector('#nivelEst').value;
        var status = document.querySelector('#listStatus').value;

        if(nombre == '' || apellido == '' || direccion == '' || cedula == '' || telefono == '' || email == '' || nivelEst == '' || status == '') {
            swal('Atencion','Todos los campos son necesarios','error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = './models/capacitadores/ajax-capacitadores.php';
        var formData = new FormData(formcapacitador);
        request.open('POST',ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
                var objData = JSON.parse(request.responseText);
                if(objData.status) {
                    $('#modalFormcapacitador').modal('hide');
                    formcapacitador.reset();
                    swal('Crear capacitador',objData.msg,'success');
                    tablecapacitadores.ajax.reload(function(){
                        editcapacitador();
                        delcapacitador();
                    });
                } else {
                    swal('Atencion',objData.msg,'error');
                }
            }
        }
    }
});

function editcapacitador() {
    var btnEditcapacitador = document.querySelectorAll('.btnEditcapacitador');
    btnEditcapacitador.forEach(function(btnEditcapacitador){
        btnEditcapacitador.addEventListener('click',function(){
            document.querySelector('#titleModal').innerHTML = 'Actualizar capacitador';
            document.querySelector('.modal-header').classList.replace('headerRegister','updateRegister');
            document.querySelector('#btnActionForm').classList.replace('btn-primary','btn-info');
            document.querySelector('#btnText').innerHTML = 'Actualizar';

            var idcapacitador = this.getAttribute('rl');

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/capacitadores/edit_capacitadores.php?id='+idcapacitador;
            request.open('GET',ajaxUrl,true);
            request.send();
            request.onreadystatechange = function() {
                if(request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if(objData.status) {
                        document.querySelector('#idcapacitador').value = objData.data.capacitador_id;
                        document.querySelector('#txtNombre').value = objData.data.nombre;
                        document.querySelector('#txtApellido').value = objData.data.apellido;
                        document.querySelector('#txtDireccion').value = objData.data.direccion;
                        document.querySelector('#cedula').value = objData.data.cedula;
                        document.querySelector('#telefono').value = objData.data.telefono;
                        document.querySelector('#email').value = objData.data.correo;
                        document.querySelector('#nivelEst').value = objData.data.nivel_est;
                        document.querySelector('#listStatus').value = objData.data.estatus;

                        if(objData.data.estatus == 1) {
                            var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                        } else {
                            var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                        }

                        var htmlSelect = `${optionSelect}
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option> 
                                        `;
                        document.querySelector("#listStatus").innerHTML = htmlSelect;
                        
                        $("#modalFormcapacitador").modal("show");
                    } else {
                        swal('Atencion',objData.msg,'error');
                    }
                }
            }
        })
    })
};

function delcapacitador() {
    var btnDelcapacitador = document.querySelectorAll('.btnDelcapacitador');
    btnDelcapacitador.forEach(function(btnDelcapacitador){
        btnDelcapacitador.addEventListener('click',function(){
            var idcapacitador = this.getAttribute('rl');
            swal({
                title: "Eliminar capacitador",
                text: "Realmente desea eliminar el capacitador?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            },function(Confirm){
                if(Confirm) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxDelcapacitador = './models/capacitadores/delet_capacitador.php';
                    var strData = "idcapacitador="+idcapacitador;
                    request.open('POST',ajaxDelcapacitador,true);
                    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    request.send(strData);
                    request.onreadystatechange = function() {
                        if(request.readyState == 4 && request.status == 200) {
                            var objData = JSON.parse(request.responseText);
                            if(objData.status) {
                                swal("Eliminar!", objData.msg , "success");
                                tablecapacitadores.ajax.reload(function(){
                                    editcapacitador();
                                    delcapacitador();
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

window.addEventListener('load',function(){
    editcapacitador();
    delcapacitador();
},false);

function openModalcapacitador() {
    document.querySelector('#idcapacitador').value = "";
    document.querySelector('#titleModal').innerHTML = 'Nuevo capacitador';
    document.querySelector('.modal-header').classList.replace('updateRegister','headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info','btn-primary');
    document.querySelector('#btnText').innerHTML = 'Guardar';
    document.querySelector('#formcapacitador').reset();
    $('#modalFormcapacitador').modal('show');
}