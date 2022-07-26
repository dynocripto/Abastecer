<?php
require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['txtNombre']) || empty($_POST['txtApellido']) || empty($_POST['edad']) || empty($_POST['txtDireccion']) || empty($_POST['cedula']) || empty($_POST['telefono']) || empty($_POST['email']) || empty($_POST['fechaNac']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $idempleado = $_POST['idempleado'];
        $nombre = $_POST['txtNombre'];
        $apellido = $_POST['txtApellido'];
        $edad = $_POST['edad'];
        $direccion = $_POST['txtDireccion'];
        $cedula = $_POST['cedula'];
        $telefono = intval($_POST['telefono']);
        $email = $_POST['email'];
        $fechaNac = $_POST['fechaNac'];
        $status = $_POST['listStatus'];

        $sql = "SELECT * FROM empleados WHERE (cedula = ? AND empleado_id != ?)";
        $query = $pdo->prepare($sql);
        $query->execute(array($cedula,$idempleado));
        $request = $query->fetch(PDO::FETCH_ASSOC);

        if($request > 0) {
            $arrResponse = array('status' => false,'msg' => 'Cedula ya registrada');
        } else {
            if($idempleado == 0) {
                $sql_insert = "INSERT INTO empleados (nombre,apellido,edad,direccion,cedula,telefono,correo,fecha_nac,estatus) VALUES (?,?,?,?,?,?,?,?,?)";
                $query_insert = $pdo->prepare($sql_insert);
                $request = $query_insert->execute(array($nombre,$apellido,$edad,$direccion,$cedula,$telefono,$email,$fechaNac,$status));
                $option = 1;
            } else {
                $sql_update = "UPDATE empleados SET nombre = ?,apellido = ?,edad = ?,direccion = ?,cedula = ?,telefono = ?,correo = ?,fecha_nac = ?,estatus = ? WHERE empleado_id = ?";
                $query_update = $pdo->prepare($sql_update);
                $request = $query_update->execute(array($nombre,$apellido,$edad,$direccion,$cedula,$telefono,$email,$fechaNac,$status,$idempleado));
                $option = 2;
            }
            
            if($request > 0) {
                if($option == 1) {
                    $arrResponse = array('status' => true,'msg' => 'empleado creado correctamente');
                } else {
                    $arrResponse = array('status' => true,'msg' => 'empleado actualizado correctamente');
                }
            } 
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}