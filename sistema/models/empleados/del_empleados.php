<?php

require_once '../../includes/config.php';

if($_POST) {
    $idempleado = $_POST['idempleado'];

    $sql = "SELECT * FROM inscripcion WHERE empleado_id = $idempleado AND estatusI != 0";
    $query = $pdo->prepare($sql);
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    if(empty($result)) {
        $sql_update = "UPDATE empleados SET estatus = 0 WHERE empleado_id = ?";
        $query_update = $pdo->prepare($sql_update);
        $request = $query_update->execute(array($idempleado));

        if($request) {
            $arrResponse = array('status' => true,'msg' => 'Eliminado correctamente');
        } else {
            $arrResponse = array('status' => false,'msg' => 'Error al eliminar');
        }
    } else {
        $arrResponse = array('status' => false,'msg' => 'No se puede eliminar un empleado asociado a una inscripcion');
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}