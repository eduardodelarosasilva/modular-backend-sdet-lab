// aqui va la logica de rutas.. 
import { Router } from "express";
import { USER_BBDD } from "../bbdd.js";

const accountRouter = Router();

//1. trazabilidad y aduitoria:este middleware de router es para saber de donde viene la peticion, si estamos corriendo en dockers, jenkins,
//de una maquina local, o de un agente de jenkins. 2 si a.guien ahce 100 peticiones seguidas, lo bloqueamos
accountRouter.use((req, res, next) => {//El next() es el "semáforo en verde 
    console.log(req.ip);
    next();
});

// Ruta para cuando entras a http://localhost:3000/
accountRouter.get('/', (req, res) => {
    res.send('<h1>¡Bienvenido a mi Servidor Pro!</h1><p>Prueba ir a /cuenta/juan/123</p>');
});

accountRouter.get('/:guid', (req, res) => {
    const { guid } = req.params;
    const user = USER_BBDD.find((user) => user.guid === req.params.guid)

    //el return es una medida de seguridad (fail-fast). Te asegura que, en cuanto detectas que algo falta o está mal, cortas el flujo y sales de ahí.
    //o que configuraste algo correctamente y terminast.(el superheore de POM)
    if (!user) return res.status(404).send();//osea con return paramos aqui, y no hacemos el return de abajo
    //no necesitamos "return" si es la última línea, 
    // pero ayuda visualmente a saber que aquí termina el flujo.
    return res.send(user);
});
//extraemos el  guid y name del body p/validar
accountRouter.post('/:guid', (req, res) => {
    const { guid, name } = req.body
    //si no hay guid ni name en body entonces es bad request 
    if (!guid || !name) return res.status(400).send();
    //validamos user no existente....si el name que viene en BBDD coincide con el guid param 
    const user = USER_BBDD.find((user) => user.guid === req.params.guid)
    //si el usuaio ya existe , error 409 (conflicto)
    if (user) return res.status(409).send();

    //si no existe lo subimos al json
    USER_BBDD.push({
        guid, name
    });
    return res.send(`Usuario ${name} creado exitosamente!`);

})
//actualizar el nombre de una cuenta
accountRouter.patch('/:guid', (req, res) => {
    const { guid } = req.params;
    const { name } = req.body

    if (!name) return res.status(400).send();  //si no hay name en el body entonces es bad request
    //validamos si el Qp hace  match con algun elemtno de la DB
    const user = USER_BBDD.find((user) => user.guid === req.params.guid)
    //si hay nombre "user" pero no coincide , sera unauthorizaed
    if (!user) return res.status(404).send();

    //lo guardamos en la RAM
    user.name = name;
    return res.json({
        mensaje: "Usuario actualizado con éxito",
        usuario_actualizado: user
    });
})
accountRouter.delete('/:guid', (req, res) => {
    const { guid } = req.params;   // aqui 
    const userIndex = USER_BBDD.findIndex((user) => user.guid === guid); // 1. Buscamos el ÍNDICE (la posición en el array)
    // 2. Si findIndex devuelve -1, es que no lo encontró(debe devolver "0" osea 1 elemento encontrado ..match)
    if (userIndex === -1) { return res.status(404).send("No se encontró el usuario para borrar"); }
    // 3. ¡CORTAR! El método splice quita elementos del array original | (Desde la posición userIndex, quita 1 elemento)
    USER_BBDD.splice(userIndex, 1);
    // 4. Respondemos con un 200 o 204 (No Content)
    console.log(`Usuario con GUID ${guid} eliminado. Quedan: ${USER_BBDD.length}`);
    res.send(`Usuario con GUID ${guid} ha sido borrado.`);
});



// --- RUTA POST (CREAR) ---
accountRouter.post('/cuenta/:idcuenta/:moneda', (req, res) => {
    // 1. Primero los LOGS (Práctica de Headers y Body)
    console.log("--- NUEVA PETICIÓN POST ---");
    console.log("Headers del Cliente:", req.headers);
    console.log("Body recibido:", req.body);
    // 2. EXTRACCIÓN Y VALIDACIÓN (Estilo SDET) // Extraemos el nombre para validar que el cliente no mandó basura
    const { name } = req.body;
    if (!name) {
        // Si no hay nombre, devolvemos error 400 (Bad Request) y CORTAMOS la ejecución con 'return'
        return res.status(404).json({
            status_qa: "Fail",
            error: "El campo 'name' es obligatorio para el registro"
        });
    }
    // 3. LÓGICA (Si pasó la validación, lo guardamos)
    USER_BBDD.push(req.body);
    console.log("BBDD actualizada. Total registros:", USER_BBDD.length);
    // 4. RESPUESTA ÚNICA (Final del camino)
    res.status(201).json({
        mensaje: "Usuario agregado con éxito",
        nombre_detectado: name,
        db_actual: USER_BBDD // Devolvemos la lista para confirmar el E2E
    });
});
// --- RUTA GET (CONSULTAR) ---
accountRouter.get('/cuenta/:idcuenta/:moneda', (req, res) => {
    // 1. LOGS para tu práctica
    console.log("--- NUEVA PETICIÓN GET ---");
    console.log("Headers:", req.headers);
    console.log("Parámetros:", req.params);
    console.log("¿Qué acepta el cliente?:", req.get("accept"));
    // 2. RESPUESTA ÚNICA (Consolidada)
    // Juntamos todo en un solo objeto para no tener dos res.json()
    res.json({
        mensaje: "Petición procesada con éxito",
        usuario_url: req.params.idcuenta,
        moneda_url: req.params.moneda,
        status_qa: "Pass",
        nota: "Headers impresos en la terminal del servidor"
    });
});
export default accountRouter;