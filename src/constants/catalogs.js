const pageInfo = {
  logo: "img/logo.png",
  cover: "img/cover.jpg",
  icon: "img/icon.png",
  nombre: "<project>",
  welcomeMessage: "<welcome-message>",
  slogan: "Lorem Ipsum dolor amet",
  footerMessage: "© 2020 appName.",
}

const errors = {
  default: "Faltan datos",
  mail: "El email no es valido",
  mailUnavalible: "El email ya existe en nuestra base de datos",
  password: "El password es incorrecto",
  passwordReq: "El password no es seguro",
  passwordEq: "El password no es igual",
  name: "Nombre incorrecto",
  invalidName: "El nombre no es valido",
  invalidNumber:"El numero no es valido",
  noUser: "El usuario no existe en el sistema",
  session: "Sesión invalida",
  denied: "Permisos insuficientes",
  estatus: "Tu cuenta esta desabilitada",
  recovery: "Tu token expiro o es incorrecto",
  serverError: "Estamos experimentando problemas, nuestros tecnicos estan trabajando para resolverlos."
}

const Tones = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
]
const arduinoCodes = {
  onOFF:{
    abanico:["Abanico","3", "2", 'flower-outline',"#8bc34a"],
    focoRosa:["Foco Rosa","7","6", 'bulb-outline',"rgb(250,0,150)"],
    focoAzul:["Foco Azul", "5","4",'bulb-outline', "rgb(0,150,150)"], 
  },
  BPM:{
    aumentarBPM:["-" , "+", "swap-vertical-outline"],
  },
  patrones:{
    apagarNP:["Apagar", "a"],
    mismoColor:["Mismo color","O"],
    unoYuno:["Uno y uno","U"],
    //audioReact "V"
    mitadYmitad:["Mitad y mitad","M"],
    tres:["Tres","T"],
    choque:["Choque","X"],
    blink:["Parpadear","P"],
    scanner:["Scanner","S"],
    gradiante:["Gradiante","G"],
    randoms:["Aleatorio","J"],
  },
  patronesDos:{
    repeat:["R","N","infinite-outline"],
  },
  modos:{
    onEjercicioC:["Cardio","E", "e",'body-outline',"rgb(0,250,128)"],
    audio:["React to audio","StartAudio", "StopAudio",'mic-circle-outline',"rgb(150,0,250)"],
    onDuoEstrobo:["Duo Estrobo","Z","z",'flash-outline',"rgb(150,0,150)"],
    onEstroboRosa:["Estrobo Rosa","H", "h",'flash-outline',"rgb(250,0,150)"],
    onEstroboAzul:["Estrobo Azúl","Q","q",'flash-outline',"rgb(0,150,150)"],
  },
  colorSelected:{
    color3:["Color 1", "A"],
    color4:["Color 2","B"]
  },
  colorSelected2:{
    color3:["Color 3", "C"],
    color4:["Color 4","D"]
  },
  colores:{
    blanco:["Blanco","#ffffff","w"],
    otroAmarillo:["Amarillo 2","rgb(250,100,0)","Y"],
    amarillo:["Amarillo","rgb(150,150,0)","y"],
    verde:["Verde","rgb(0,150,0)","g"],
    azul:["Azul","rgb(0,0,150)","b"],
    cyan:["Cyan","rgb(0,150,150)","c"],
  },
  colores2:{
    morado:["Morado","rgb(150,0,150)","m"],
    violeta:["Violeta","rgb(150,0,250)","v"],
    naranja:["Naranja","rgb(250,50,0)","n"],
    otroNaranja:["Naranja 2","#ff5722","o"],
    rosa:["Rosa","rgb(250,0,150)","p"],
    rojo:["Rojo","rgb(150,0,0)","r"], 
  },
  colores3:{
    gris:["gris","rgb(150,250,0)","f"],
    magenta:["magenta","rgb(250,0,250)","i"],
    spring:["Amarillo","rgb(0,250,128)","k"],
    azure:["Verde","rgb(0,128,250)","ñ"],
    azul:["Azul","rgb(0,255,204)","("],
    cyan2:["Cyan","rgb(255,50,50)",")"],
    fosfo:["Verde Fosfo","rgb(150,150,150)",";"] 
  }
}


// Perform a full-body athletic movement, such as the power clean, power snatch, or snatch pull for 8–12 reps. Immediately following the strength movement, move to a cardiac conditioning effort for 2–4 minutes and work at 90–95 percent of your maximum heart rate. After completing this round, rest for two minutes and begin again, performing three total rounds.
// Following the three rounds, take a 5-minute complete rest. Let’s face it: you’ve earned it. But you’re only 30 percent done.
// Following the 5-minute rest, repeat the format first used, again using a whole-body strength movement, but this time substitute a grinding-type movement such as the front squat. Perform 3 total rounds and then take another well-earned 5-minute break.
// The final stage is a bodyweight circuit using exercises performed at high pace for 6–12 reps, each with minimal rest between movements. Rest no longer than a minute between circuits. Complete 3–5 circuits.






const success = {
  userUpdated: "¡Usuario actualizado exitosamente!",
  login: "Sesión exitosa...",
  verified: "Sesión verificada...",
  logout: "Sesión cerrada.",
  recovery: "Contraseña actualizada.",
  emailSend: "¡Correo enviado! revisa tu bandeja de entrada."
}

const pages = {
  account: "Mi cuenta",
  dashboard: "Dashboard",
  profile: "Perfíl",
  users: "Usuarios",
  newUser: "Nuevo usuario",
  reports: "Reportes",
}

const toast = { open:true, message: "", success:false }

const inputs = {
    // buttons
    load:"Cargando",
    update:"Actualizar información",
    changePassword:"Cambiar contraseña",
    updatePassword:"Solicitar correo",
    login:"Iniciar sesión",
    // Labels
    password:"Contraseña",
    confirmPassword:"Confirmar Contraseña",
    name:"Nombre",
    tel:"Telefóno",
    email:"Correo",
    status:"Estatus",
    rol:"Rol",
}

const rol = {
  "1":"Admin",
  "2":"Manager",
  "3":"Associate"
}

const estatus = {
  "2":"Activo",
  "3":"Pendiente",
  "4":"Suspendido",
  "5":"Eliminado"
}

const Catalogs = {
  vertical:'bottom',
  horizontal:'center',
  inputStr:inputs,
  pageInfo: pageInfo,
  errors:errors,
  success: success,
  Tones:Tones,
  rol:rol,
  estatus:estatus,
  pages:pages,
  toast:toast,
  arduino:arduinoCodes
}

export default Catalogs;