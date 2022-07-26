<?php
require_once '../../includes/config.php';

// OPCION PARA capacitador
$sqlConsultacapacitador = "SELECT capacitador_id,nombre,apellido FROM capacitador WHERE estatus = 1";
$queryConsultacapacitador = $pdo->prepare($sqlConsultacapacitador);
$queryConsultacapacitador->execute();
$data = $queryConsultacapacitador->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>