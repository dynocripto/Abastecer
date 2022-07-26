<?php

require_once '../../includes/config.php';

/*$sql = "SELECT c.curso_id,c.estatus,m.materia_id,m.nombre_materia,m.estatus,t.turno_id,t.tipo_turno,c1.capacitador_id,c1.nombre,c1.estatus FROM curso as c INNER JOIN materia as m ON c.materia_id = m.materia_id INNER JOIN capacitador as c1 ON c1.capacitador_id = c1.capacitador_id WHERE c1.estatus != 0 AND m.estatus != 0 AND c.estatus != 0";
$query = $pdo->prepare($sql);*/
$sql = "SELECT * FROM curso as c INNER JOIN materia as m ON c.materia_id = m.materia_id INNER JOIN capacitador as c1 ON c1.capacitador_id = c1.capacitador_id WHERE c.estatus != 0 AND m.estatus != 0 AND c.estatusC != 0";
$query = $pdo->prepare($sql);
$query->execute();

$data = $query->fetchAll(PDO::FETCH_ASSOC);

for($i = 0;$i < count($data);$i++) {
    if($data[$i]['estatusC'] == 1) {
        $data[$i]['estatusC'] = '<span class="badge badge-success">Activo</span>';
    } else {
        $data[$i]['estatusC'] = '<span class="badge badge-danger">Inactivo</span>';
    }

    $data[$i]['options'] = '<div class="text-center">
        <button class="btn btn-primary btn-sm btnEditCurso" rl="'.$data[$i]['curso_id'].'" title="Editar"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn btn-danger btn-sm btnDelCurso" rl="'.$data[$i]['curso_id'].'" title="Eliminar"><i class="fas fa-trash-alt"></i></button>                   
                               </div>';
}

echo json_encode($data,JSON_UNESCAPED_UNICODE);
die();
