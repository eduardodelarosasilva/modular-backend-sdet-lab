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



// function increment(x) {
//     x++
// }
// let num = 5
// increment(num);
// console.log(num);

//aqui pasamos por referencia(pasamos todo el objeto)
// function increment(obj) {
//     object.num++;
// }
// let object = {num: 5};
// increment(object);
// console.log(object);

// En JS, los objetos no se guardan directamente en la variable. La variable solo guarda una dirección de
// memoria (un puntero). Al pasar miObjeto a la función, estás pasando la dirección. Por eso, cualquier cambio
//  dentro del objeto afecta a la instancia original.

