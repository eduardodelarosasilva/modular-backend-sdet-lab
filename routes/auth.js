import { Router } from 'express';
import { USER_BBDD } from '../bbdd.js';
import authByEmailPwd from '../helpers/auth-by-email-pwd.js';

const authRouter = Router();

//endpoint public (no necesita autenticacion ni autorizacion)
authRouter.get('publico', (req, res) => res.send('Endpoint Publico'));

//endpoint autenticado para ususarios 
authRouter.post('Autenticacion', (req, res) => {
    //extaremos los datos que vamos a validar
    const { email, password } = req.body;
    //validamos que tenga credenciales(no autenticado)
    if (!email || !password) return res.status(400).send();
    try {
        //importamos el helper
        const user = authByEmailPwd(email, password);
        //madnamos mensaje de autenticacion
        return res.send(`Usuario ${user.name} autenticado`)
    } catch (err) {
        return res.status(401).send();
    }
});

//endpoint autorizado p/ administradores
authRouter.post('AAutorizathion', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send();
    try {
        const user = authByEmailPwd(email, password);
        if (user.role !== "admin") return res.status(403).send();
        //madnamos mensajed de autenticacion
        return res.send(`Usuario administrador ${user.name} autorizado`)
    } catch (err) {
        return res.status(401).send();
    }
});

export default authRouter