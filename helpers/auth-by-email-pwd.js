const authByEmailPwd = (email, password) => {
    const user = USER_BBDD.filter((user) => user.email === email);
    if (!user) throw new Error();
    if (user.password !== password) throw new Error();
    return user;
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