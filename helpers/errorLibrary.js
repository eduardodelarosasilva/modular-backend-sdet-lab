export const ERROR_LIBRARY = {
    MISSING_FIELDS: { status: 400, message: 'Faltan campos obligatorios' },
    INVALID_EMAIL_FORMAT: { status: 400, message: 'El formato del email no es válido' },
    UNAUTHORIZED_COOKIE: { status: 401, message: 'No se encontró la cookie de sesión' },
    INVALID_SESSION: { status: 401, message: 'Sesión expirada o inválida' },
    WRONG_PASSWORD: { status: 401, message: 'Credenciales inválidas (Password)' },
    WRONG_EMAIL: { status: 401, message: 'Credenciales inválidas (Email)' },
    NOT_AN_ADMIN: { status: 403, message: 'Acceso denegado: Se requiere rol de administrador' },
    DATA_NOT_FOUND: { status: 404, message: 'El recurso solicitado no existe' },
    EMAIL_ALREADY_EXISTS: { status: 409, message: 'El email ya está registrado' },
    USERNAME_ALREADY_EXISTS: { status: 409, message: 'El username ya está registrado' },
    SERVER_ERROR: { status: 500, message: 'Error interno del servidor' }
};