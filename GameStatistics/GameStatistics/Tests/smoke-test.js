import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
};

const idReal = '02ee6536-551c-4753-b197-7e866f183030';

export default function () {
    // Prueba Inicial - Obtener Todos los Datos de Juegos
    let respuestaTodosLosJuegos = http.get('http://localhost:5212/GameData');
    check(respuestaTodosLosJuegos, {
        'es estado 200': (r) => r.status === 200,
    });

    // Prueba Inicial - Obtener Datos de un Juego
    let respuestaDatosUnJuego = http.get(`http://localhost:5212/GameData/${idReal}`);
    check(respuestaDatosUnJuego, {
        'es estado 200': (r) => r.status === 200,
    });

    // Prueba - Crear un Nuevo Juego
    let respuestaCrearJuego = http.post('http://localhost:5212/GameData', {
        GameName: 'Nuevo Juego',
        Category: 'Nueva Categoría',
        TotalBets: 10,
        TotalWins: 5,
        AverageBetAmount: 2.5,
        PopularityScore: 8.9,
    });
    check(respuestaCrearJuego, {
        'es estado 201': (r) => r.status === 201,
    });

    // Prueba - Actualizar un Juego Existente
    let respuestaActualizarJuego = http.put(`http://localhost:5212/GameData/${idReal}`, {
        GameName: 'Juego Actualizado',
        Category: 'Categoría Actualizada',
        TotalBets: 20,
        TotalWins: 10,
        AverageBetAmount: 3.0,
        PopularityScore: 9.5,
    });
    check(respuestaActualizarJuego, {
        'es estado 204': (r) => r.status === 204,
    });

    // Prueba - Eliminar un Juego
    let respuestaEliminarJuego = http.del(`http://localhost:5212/GameData/${idReal}`);
    check(respuestaEliminarJuego, {
        'es estado 204': (r) => r.status === 204,
    });

    sleep(1);
}
