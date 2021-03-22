const mainUrl = "http://192.168.1.77:1337/";

const headersConfig = (token, file) => {

    let contentType;
    if (file) contentType = 'multipart/form-data'
    else contentType = 'application/json'
    
    let config = {
        'Content-Type': contentType,
        Authorization: `Bearer ${token}`,
    }

    return config
}

const account = {
    signIn: mainUrl + "api/v1/login",
    signOut: mainUrl + "api/v1/logout",
    forgot: mainUrl + "api/v1/forgot-password",
    change: mainUrl + "api/v1/change-password"
}

const sesiones = {

}

const usuarios = {
    
    nuevoUsuario: mainUrl + "/api/v1/nuevo-usuario",
    verUsuarios: mainUrl + "api/v1/ver-usuarios",
    verPerfil: mainUrl + "api/v1/ver-perfil",
    updateProfile: mainUrl + "api/v1/editar-perfil",
    updateUser: mainUrl + "api/v1/editar-usuario",
    updateUserPic: mainUrl + "api/v1/editar-usuario-fotografia",
    updateProfilePic: mainUrl + "api/v1/actualizar-mi-foto",
}

const Api = {
    ...account,
    headersConfig: headersConfig,
    sesiones: sesiones,
    usuarios: usuarios,
}

export default Api;