const swapi = require('swapi-node');
const { responseHeader } = require('./helpers')
const mysql = require('./database')

exports.obtenerVehiculoPorId = async (event, context) => {
    let response = responseHeader
    try {
        const params = event.queryStringParameters
        const id = parseInt(params.id)
        const vehicle = await swapi.vehicle({ id: id }).then((result) => {
            return result
        })
        if(!vehicle){
            return {
                ...response,
                'statusCode': 204,
                'body': JSON.stringify(err)
            }
        }
        return {
            ...response,
            'statusCode': 200,
            'body': JSON.stringify({
                capacidadCarga: vehicle.cargo_capacity,
                tripulacion: vehicle.crew,
                longitud: vehicle.length,
                fabricante: vehicle.manufacturer,
                modelo: vehicle.model,
                nombre: vehicle.name,
                pasajeros: vehicle.passengers,
                claseVehiculo: vehicle.vehicle_class
            })
        }
    } catch (err) {
        console.log(err);
        return {
            ...response,
            'statusCode': 500,
            'body': JSON.stringify(err)
        }
    }
}


exports.guardarVehiculo = async (event, context) => {
    let response = responseHeader
    try {
        const body = JSON.parse(event.body)
        const procedure = `sp_vehiculo_guardar('${body.capacidadCarga}','${body.tripulacion}','${body.longitud}','${body.fabricante}','${body.modelo}','${body.nombre}','${body.pasajeros}','${body.claseVehiculo}')`
        const {status, data} = await mysql.queryProcedure(procedure)
        if(!status){
            return {
                ...response,
                'statusCode': 500,
                'body': JSON.stringify(data)
            }
            
        }
        return {
            ...response,
            'statusCode': 200,
            'body': JSON.stringify(data[0][0])
        }
    } catch (err) {
        console.log(err);
        return {
            ...response,
            'statusCode': 500,
            'body': JSON.stringify(err)
        }
    }
}

exports.paginarVehiculos = async (event, context) => {
    let response = responseHeader
    try {
        const params = event.queryStringParameters
        const procedure = `sp_vehiculos_paginar(${params.pagina * params.limite},${params.limite})`
        const {status, data} = await mysql.queryProcedure(procedure)
        if(!status){
            return {
                ...response,
                'statusCode': 500,
                'body': JSON.stringify(data[0])
            }
            
        }
        const registros = data[0][0].registros
        return {
            ...response,
            'statusCode': 200,
            'body': JSON.stringify({
                registros,
                pagina: parseInt(params.pagina),
                data: data[1]
            })
        }
    } catch (err) {
        console.log(err);
        console.log(err);
        return {
            ...response,
            'statusCode': 500,
            'body': JSON.stringify(err)
        }
    }
}
