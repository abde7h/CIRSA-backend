# Pruebas de Carga - GameStatistics API

## Antecedentes

Este proyecto realiza pruebas de carga en la API GameStatistics utilizando la herramienta k6. El objetivo es evaluar y mejorar el rendimiento del sistema bajo diferentes condiciones de carga.

## Instalación

Asegúrate de tener k6 instalado siguiendo estos pasos:

1. Descarga k6 según tu sistema operativo desde [el sitio oficial de k6](https://k6.io/docs/getting-started/installation).
2. Sigue las instrucciones de instalación proporcionadas para tu sistema operativo.

Una vez que hayas instalado k6, estarás listo para ejecutar las pruebas de carga en la API GameStatistics.


## Uso

### Asegúrate de tener el proyecto GameStatistics en ejecución.
```bash
cd GameStatistics
dotnet run 
```
### Comandos para ejecutar los test

1. **Smoke Test:**
    ```bash
    k6 run smoke-test.js
    ```

2. **Average Load Test:**
    ```bash
    k6 run average-load-test.js
    ```

3. **Spike Test:**
    ```bash
    k6 run spike-test.js
    ```


## Toma de Decisiones

En el desarrollo de las pruebas, se tomaron las siguientes decisiones:

- **Elección de k6:** Se optó por k6 debido a su facilidad de uso y capacidad para realizar pruebas de carga eficientes.

- **Configuración de Etapas:** Las etapas de carga en los tests (aumento, mantenimiento, reducción) se configuraron para simular diferentes condiciones y evaluar el rendimiento en cada fase.

## Informe de Prueba de Carga

El informe detallado se encuentra en [Informe.pdf](Informe.pdf). Proporciona resultados, conclusiones y recomendaciones para mejorar el rendimiento de la API GameStatistics.
