var request = require('supertest')
const api_gateway = 'https://nb5ghd88r3.execute-api.us-east-1.amazonaws.com/dev/'
describe('obtener datos vehiculo', () => {
    test('obtener datos swapi', async () => {
        const response = await request(api_gateway).get('obtener-vehiculo-por-id?id=1').send();
        expect(response.status).toBe(200)
    })

    test('paginar vehiculos', async () => {
        const response = await request(api_gateway).get('paginar-vehiculos?pagina=0&limite=10').send();
        expect(response.status).toBe(200)
    })
    
    test('guardar vehiculo', async () => {
        const response = await request(api_gateway).post('guardar-vehiculo')
        .send({
            "capacidadCarga":"40000",
            "tripulacion":"40",
            "longitud":"40.5",
            "fabricante":"Bayerische Motoren Werke",
            "modelo":"BMW 118i",
            "nombre":"BMW",
            "pasajeros":"5",
            "claseVehiculo":"Gama Alta"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
        expect(response.status).toBe(200)
    })
}) 