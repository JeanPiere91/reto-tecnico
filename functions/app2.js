const swapi = require('swapi-node');
const { responseHeader } = require('./helpers')
const mysql = require('./database')

exports.obtenerPersonaPorId = async (event, context) => {
    let response = responseHeader
    try {
        const params = event.queryStringParameters
        const id = parseInt(params.id)
        const people = await swapi.people({ id: id }).then((result) => {
            return result
        })
        if(!people){
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
                nombre: people.name,
                altura: people.height,
                masa: people.mass,
                colorPelo: people.hair_color,
                colorPiel: people.skin_color,
                colorOjo: people.eye_color,
                fechaNacimiento: people.birth_year,
                genero: people.gender
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


exports.guardarPersona = async (event, context) => {
    let response = responseHeader
    try {
        const body = JSON.parse(event.body)
        const procedure = `sp_persona_guardar('${body.nombre}','${body.altura}','${body.masa}','${body.colorPelo}','${body.colorPiel}','${body.colorOjo}','${body.genero}','${body.fechaNacimiento}')`
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

exports.paginarPersonas = async (event, context) => {
    let response = responseHeader
    try {
        const params = event.queryStringParameters
        const procedure = `sp_personas_paginar(${params.pagina * params.limite},${params.limite})`
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
