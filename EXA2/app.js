
const supabaseUrl = "https://fkfkmvkfxopwauvtllfi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrZmttdmtmeG9wd2F1dnRsbGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjMyMjQsImV4cCI6MjA5MDM5OTIyNH0.dIOzZFHJfkAr2smhqy_o1Pxu2y3B_Mn1F3qzmlMbSRA";
var supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let usuarioActual = null;

// LOGIN //parte de mejoria, quiero agregar más
async function login(){
    let user = document.getElementById("loginUser").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    let { data } = await supabase
        .from("usuarios")
        .select("*")
        .eq("usuario", user)
        .eq("pass", pass);

    if(data.length > 0){
        usuarioActual = data[0];

        document.getElementById("loginDiv").classList.add("hidden");
        document.getElementById("agendaDiv").classList.remove("hidden");

        document.getElementById("userInfo").innerText =
            user + " (" + usuarioActual.rol + ")";
    }else{
        alert("Credenciales incorrectas");
    }
}

function toggleDark(){ // No sirve de nada pero esta lindo
    document.body.classList.toggle("dark");
}

// REGISTRO  //Esta parte es el registro pero hubieron MUCHOS fallos, videos y todo  //quiero hacer más
async function registrar(){
    let user = document.getElementById("regUser").value.trim();
    let pass = document.getElementById("regPass").value.trim();
    let rol = document.getElementById("regRol").value;

    let { data, error } = await supabase
        .from("usuarios")
        .insert([{ usuario: user, pass, rol }]);

    console.log(data, error); 

    if(error){
        alert("Error: " + error.message);
    }else{
        alert("Usuario creado correctamente");
        volverLogin();
    }
}
// Segun vi en un video, se logro poner la hora y fecha de hoy si es posible. Se ve bien, lo dejo asi
// INSERT
async function agregarClase(){
    let materia = document.getElementById("materia").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    await supabase
        .from("clases")
        .insert([{
            usuario: usuarioActual.usuario,
            materia,
            fecha,
            hora
        }]);

    alert("Clase guardada");
}

// SELECT //Varios erroes tontos, se investiga, se prueba y parece funcionar
async function mostrarClases(){
    let { data } = await supabase
        .from("clases")
        .select("*");

    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    data.forEach(c => {
        let fila = tabla.insertRow();
        fila.insertCell(0).innerText = c.usuario;
        fila.insertCell(1).innerText = c.materia;
        fila.insertCell(2).innerText = c.fecha;
        fila.insertCell(3).innerText = c.hora;
    });
}

// NAVEGACIÓN
function mostrarModulo(modulo){
    document.getElementById("moduloCrear").classList.add("hidden");
    document.getElementById("moduloClases").classList.add("hidden");

    if(modulo === "crear"){
        document.getElementById("moduloCrear").classList.remove("hidden");
    }else{
        document.getElementById("moduloClases").classList.remove("hidden");
        mostrarClases();
    }
}

function mostrarRegistro(){
    document.getElementById("loginDiv").classList.add("hidden");
    document.getElementById("registroDiv").classList.remove("hidden");
}

function volverLogin(){
    document.getElementById("registroDiv").classList.add("hidden");
    document.getElementById("loginDiv").classList.remove("hidden");
}

function logout(){
    usuarioActual = null;
    document.getElementById("agendaDiv").classList.add("hidden");
    document.getElementById("loginDiv").classList.remove("hidden");
}