<?php

require_once '../../includes/config.php';

$sqlempleado = "SELECT empleado_id,nombre,apellido,estatus FROM empleados WHERE estatus = 1";
$queryempleado = $pdo->prepare($sqlempleado);
$queryempleado->execute();
$data = $queryempleado->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);