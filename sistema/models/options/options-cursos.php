<?php

require_once '../../includes/config.php';

$sqlCurso = "SELECT * FROM curso as c INNER JOIN materia as m ON c.materia_id = m.materia_id INNER JOIN capacitador as c1 ON c1.capacitador_id = c1.capacitador_id WHERE c.estatusC = 1";
$queryCurso = $pdo->prepare($sqlCurso);
$queryCurso->execute();
$data = $queryCurso->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);