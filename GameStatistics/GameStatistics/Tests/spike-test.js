import http from 'k6/http';
import { check, sleep } from 'k6';

const idReal = '02ee6536-551c-4753-b197-7e866f183030';

export const options = {
    stages: [
        { duration: '1m', target: 1 }, // Mantiene 1 VU durante 1 minuto
        { duration: '1m', target: 10 }, // Aumenta a 10 VUs durante 1 minuto
        { duration: '1m', target: 1 }, // Reduce a 1 VU durante 1 minuto
    ],
};

export default function () {
    // Prueba de Pico - Obtener Todos los Datos de Juegos durante Pico de Carga
    let responseAllGames = http.get('http://localhost:5212/GameData');
    check(responseAllGames, {
        'es estado 200': (r) => r.status === 200,
    });

    // Prueba de Pico - Obtener Datos de un Juego durante Pico de Carga
    let responseSingleGame = http.get(`http://localhost:5212/GameData/${idReal}`);
    check(responseSingleGame, {
        'es estado 200': (r) => r.status === 200,
    });

    // Prueba de Pico - Crear un Nuevo Juego durante Pico de Carga
    let createGamePayload = {
        GameName: `Nuevo Juego ${Math.floor(Math.random() * 100)}`, // Datos dinámicos
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

    // Prueba de Pico - Actualizar un Juego Existente durante Pico de Carga
    let updateGamePayload = {
        GameName: `Juego Actualizado ${Math.floor(Math.random() * 100)}`, // Datos dinámicos
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

    // Prueba de Pico - Eliminar un Juego durante Pico de Carga
    let responseDeleteGame = http.del(`http://localhost:5212/GameData/${idReal}`);
    check(responseDeleteGame, {
        'es estado 204': (r) => r.status === 204,
    });

    sleep(1);
}
