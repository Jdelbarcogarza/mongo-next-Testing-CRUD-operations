/**
 * Dentro de la función del folder /api de NextJS podremos utilizar la Startop API para llamará nuestra base de datos.
 * 
 */

import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {

    // se espera a que se cumpla la conexión con la Mongo DB. Se regresa el objeto.
    const client = await clientPromise

    const DB_NAME = 'sample_analytics'

    const db = client.db(DB_NAME)

    if (req.method == 'GET') {

        // aqui ya se hace un query con lo que queremos extraer de la DB
        let users = await db.collection("customers").find({}).limit(5).toArray()
        // se devuelve el objeto json
        res.status(200).json({users})

    } else if (req.method == 'POST') {

        // por axios, el req.body no tiene que parsearse a ser un Objeto, porque ya va parseado de antemano.
        let bodyObject = req.body
        console.log(bodyObject)
        let newUser = await db.collection("customers").insertOne(bodyObject)
        res.status(200).json({newUser})
        
    } else if (req.method == 'PUT') {
        
        let bodyObject = req.body

        //console.log("ESTO ES LO QUE PIDES",bodyObject.data)
        // TODO leer objeto boject body

        // data: '{"filter":{"name":"Jorge"},"updateDocument":{"$rename":{"name":"JorgeNuevo"}}}'
        /*let updateUser = await db.collection("customers").updateOne({name: "Jorge"}, {
            $set: { name: "JorgeNuevo" } 
          })*/

        let updateUser = await db.collection("customers").updateOne(bodyObject.data.filter, bodyObject.data.updateDocument)

        res.status(200).json({updateUser})

    } else if (req.method == 'DELETE') {

        let bodyObject = req.body

        console.log("Esto se lo que buscas", bodyObject)

        let deleteUser =  await db.collection("customers").deleteOne(bodyObject)

        res.status(200).json({deleteUser})
    }
}