<?php

require_once '../../includes/config.php';

if($_POST) {
    $idcapacitador = $_POST['idcapacitador'];

    $sql_capacitador = "SELECT * FROM curso WHERE capacitador_id = $idcapacitador AND estatusC != 0";
    $query_capacitador = $pdo->prepare($sql_capacitador);
    $query_capacitador->execute();
    $result_capacitador = $query_capacitador->fetchAll(PDO::FETCH_ASSOC);

    if(empty($result_capacitador)) {
        $sql = "UPDATE capacitador SET estatus = 0 WHERE capacitador_id = ?";
        $query = $pdo->prepare($sql);
        $result = $query->execute(array($idcapacitador));

        if($result) {
            $arrResponse = array('status' => true,'msg' => 'Eliminado correctamente');
        } else {
            $arrResponse = array('status' => false,'msg' => 'Error al eliminar');
        }
    } else {
        $arrResponse = array('status' => false,'msg' => 'No se puede eliminar a un capacitador asociado a un curso');
    }

    
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}