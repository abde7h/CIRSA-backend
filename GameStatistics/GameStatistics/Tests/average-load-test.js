import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de la prueba con etapas de carga
export const options = {
    stages: [
        { duration: '1m', target: 5 }, // Aumenta gradualmente a 5 VUs en 1 minuto
        { duration: '2m', target: 5 }, // Mantiene 5 VUs durante 2 minutos
        { duration: '1m', target: 0 }, // Reduce gradualmente a 0 VUs en 1 minuto
    ],
};

const idReal = '02ee6536-551c-4753-b197-7e866f183030';

export default function () {
    // 1. Prueba de Carga - Obtener Todos los Datos de Juegos bajo Carga Promedio
    let responseAllGames = http.get('http://localhost:5212/GameData');
    check(responseAllGames, {
        'es estado 200': (r) => r.status === 200,
    });

    // 2. Prueba de Carga - Obtener Datos de un Juego bajo Carga Promedio
    let responseSingleGame = http.get(`http://localhost:5212/GameData/${idReal}`);
    check(responseSingleGame, {
        'es estado 200': (r) => r.status === 200,
    });

    // 3. Prueba de Carga - Crear un Nuevo Juego bajo Carga Promedio
    let createGamePayload = {
        GameName: 'Nuevo Juego',
        Category: 'Categoría',
        TotalBets: 100,
        TotalWins: 50,
        AverageBetAmount: 2.5,
        PopularityScore: 0.75,
    };

    let responseCreateGame = http.post('http://localhost:5212/GameData', JSON.stringify(createGamePayload), { headers: { 'Content-Type': 'application/json' } });
    check(responseCreateGame, {
        'es estado 201': (r) => r.status === 201,
    });

    // 4. Prueba de Carga - Actualizar un Juego Existente bajo Carga Promedio
    let updateGamePayload = {
        GameName: 'Juego Actualizado',
        Category: 'Nueva Categoría',
        TotalBets: 150,
        TotalWins: 75,
        AverageBetAmount: 3.0,
        PopularityScore: 0.8,
    };

    let responseUpdateGame = http.put(`http://localhost:5212/GameData/${idReal}`, JSON.stringify(updateGamePayload), { headers: { 'Content-Type': 'application/json' } });
    check(responseUpdateGame, {
        'es estado 204': (r) => r.status === 204,
    });

    // 5. Prueba de Carga - Eliminar un Juego bajo Carga Promedio
    let responseDeleteGame = http.del(`http://localhost:5212/GameData/${idReal}`);
    check(responseDeleteGame, {
        'es estado 204': (r) => r.status === 204,
    });

    sleep(1);
}
