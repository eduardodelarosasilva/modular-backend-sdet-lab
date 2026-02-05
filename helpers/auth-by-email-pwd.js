import { USER_BBDD } from "../bbdd.js";
const authByEmailPwd = (email, password) => {
    const user = USER_BBDD.find((user) => user.email === email);
    if (!user) throw new Error('usuario no encontrado');
    if (user.password !== password) throw new Error('contraseña incorrecta');
    // Agregamos una validación de rol para cuando necesites 403
    // if (user.role !== 'admin') throw new Error('permisos insuficientes');

    return user;
    //este user es neceseario retornarlo por que lo vamos a usar en auth session, y token session,
    //aqui usamos throw new Error porque es sincrono, es decir la BBDD esta aqui, en la ram, por tanto
    //  no tiene que eseprar una repsuesta, de lo contrario serai (error)=>Promise.reject(error)   porque esperaria una promesa
}
export default authByEmailPwd;



// authRouter.post('Autenticacion', (req, res) => {
//     //extaremos los datos que vamos a validar
//     const { email, password } = req.body;
//     //validamos que tenga credenciales(no autenticado)
//     if (!email || !password) return res.status(400).send();
//     //Vvalidamos que el email proporcionado coincide con ls DB
//     const user = USER_BBDD.filter((user) => user.email === email);
//     //si no hay ususario lo rechazamos
//     if (!user) return res.status(401).send();
//     // SI NO HAY PASSWORD  no esta autorizado
//     if (user.password !== password) return res.status(401).send();
//     //madnamos mensajed de autenticacion
//     res.send(`Usuario ${user.name} autenticado`)
// });