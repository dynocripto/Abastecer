<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['txtNombre']) || empty($_POST['txtApellido']) || empty($_POST['txtDireccion']) || empty($_POST['cedula']) || empty($_POST['telefono']) || empty($_POST['email']) || empty($_POST['nivelEst']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $idcapacitador = $_POST['idcapacitador'];
        $nombre = $_POST['txtNombre'];
        $apellido = $_POST['txtApellido'];
        $direccion = $_POST['txtDireccion'];
        $cedula = $_POST['cedula'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];
        $nivelEst = $_POST['nivelEst'];
        $status = $_POST['listStatus'];

        $sql = "SELECT * FROM capacitador WHERE (cedula = ? AND capacitador_id != ?)";
        $query = $pdo->prepare($sql);
        $query->execute(array($cedula,$idcapacitador));
        $result = $query->fetch(PDO::FETCH_ASSOC);

        if($result > 0) {
            $arrResponse = array('status' => false,'msg' => 'Cedula ya registrada');
        } else {
            if($idcapacitador == 0) {
                $sql_insert = "INSERT INTO capacitador (nombre,apellido,direccion,cedula,telefono,correo,nivel_est,estatus) VALUES (?,?,?,?,?,?,?,?)";
                $query_insert = $pdo->prepare($sql_insert);
                $request = $query_insert->execute(array($nombre,$apellido,$direccion,$cedula,$telefono,$email,$nivelEst,$status));
                $option = 1;
            } else {
                $sql_update = "UPDATE capacitador SET nombre = ?,apellido = ?,direccion = ?,cedula = ?,telefono = ?,correo = ?,nivel_est = ?,estatus = ? WHERE capacitador_id = ?";
                $query_update = $pdo->prepare($sql_update);
                $request = $query_update->execute(array($nombre,$apellido,$direccion,$cedula,$telefono,$email,$nivelEst,$status,$idcapacitador));
                $option = 2;
            }
            
            if($request > 0) {
                if($option == 1) {
                   $arrResponse = array('status' => true,'msg' => 'capacitador creado correctamente'); 
                } else {
                   $arrResponse = array('status' => true,'msg' => 'capacitador actualizado correctamente');
                }
            } 
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}