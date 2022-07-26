<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['listempleado']) || empty($_POST['listCurso']) || empty($_POST['listTurno']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $idInscripcion = $_POST['idInscripcion'];
        $empleado = $_POST['listempleado'];
        $curso = $_POST['listCurso'];
        $turno = $_POST['listTurno'];
        $status = $_POST['listStatus'];

        // CONSULTA PARA INSERTAR
        $sql = "SELECT * FROM inscripcion WHERE empleado_id = ? AND curso_id = ? AND turno_id = ? AND estatusI != 0";
        $query = $pdo->prepare($sql);
        $query->execute(array($empleado,$curso,$turno));
        $resultInsert = $query->fetch(PDO::FETCH_ASSOC);
        
        // CONSULTA PARA ACTUALIZAR
        $sql2 = "SELECT * FROM inscripcion WHERE empleado_id = ? AND curso_id = ? AND turno_id = ? AND estatusI != 0 AND inscripcion_id != ?";
        $query2 = $pdo->prepare($sql2);
        $query2->execute(array($empleado,$curso,$turno,$idInscripcion));
        $resultUpdate = $query2->fetch(PDO::FETCH_ASSOC);

        if($resultInsert > 0) {
            $arrResponse = array('status' => false,'msg' => 'el empleado ya tiene el curso y turno asignado, seleccione otro');
        } else {
            if($idInscripcion == 0) {
                $sql_insert = "INSERT INTO inscripcion (empleado_id,curso_id,turno_id,estatusI) VALUES (?,?,?,?)";
                $query_insert = $pdo->prepare($sql_insert);
                $request = $query_insert->execute(array($empleado,$curso,$turno,$status));
                if($request) {
                    $arrResponse = array('status' => true,'msg' => 'Inscripcion creada correctamente'); 
                }
            }  
        }
        if($resultUpdate > 0) {
            $arrResponse = array('status' => false,'msg' => 'el empleado ya tiene el curso y turno asignado, seleccione otro');
        } else {
            if($idInscripcion > 0) {
                $sql_update = "UPDATE inscripcion SET empleado_id = ?,curso_id = ?,turno_id = ?,estatusI = ? WHERE inscripcion_id = ?";
                $query_update = $pdo->prepare($sql_update);
                $request2 = $query_update->execute(array($empleado,$curso,$turno,$status,$idInscripcion));
                if($request2) {
                    $arrResponse = array('status' => true,'msg' => 'Inscripcion actualizada correctamente');
                }
             }
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}