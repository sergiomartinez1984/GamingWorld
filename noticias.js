// crea una variable que enlaza con la base de datos que vamos a utilizar, que en este caso es firebase
const db = firebase.firestore();
// crea la variable que hace referencia al formulario del html noticias.html
const formNoticias = document.getElementById('noticiaForm');
// crea la variable que hace referencia al contenedor de noticas.html
const containerNoticias = document.getElementById('containerNoticias');

//Con el siguiente metodo, guardo los datos del formulario en mi base de datos.
const guardarNoticia = (titulo, noticia) =>
db.collection('noticias').doc().set({
    titulo,
    noticia
});

//Creo una variable llamada obtenerDatos para recoger los datos de base de datos que le indico
const obtenerNoticias = () => db.collection('noticias').get();

//Para generar la lista de noticias llamamos a la base de datos y rellenamos un div por cada elemento
//que haya en la base de datos
window.addEventListener('DOMContentLoaded', async (e) => {
    const noticias = await obtenerNoticias();
    noticias.forEach(doc => {
            //Cada div se crea con un estilo que tenemos definido en la libreria bootstrap,
            // la cual llamamos desde el html noticias.html
        containerNoticias.innerHTML += `<div class="card card-body mt-2 border-primary">
            <h3>${doc.data().titulo}</h3>           
            <h5>${doc.data().noticia}</h5>   
            <button onclick="deleteNoticia('${doc.id}')" class="btn btn-dark" style="width: 7em;align-self: flex-end;">Borrar</button>                       
        </div>`
    })
})
//Envia cada dato que hay dentro de cada elemento del formulario a la base de datos mediante el metodo guardarDatos()
function sendNoticia() {
    formNoticias.addEventListener('submit', async e => {    
        e.preventDefault();
        const titulo = formNoticias['tituloNoticia'];
        const texto = formNoticias['textoNoticia'];
    
        await guardarNoticia(titulo.value, texto.value);

        console.log("Noticia añadida");
        resetForm();
        location.reload();
        titulo.focus();
    })
}
//funcion para resetear el formulario despues de añadir un usuario nuevo
function resetForm(){
    formNoticias.reset();
}
//Función para borrar un elemento pasandole un Id
function deleteNoticia(id){
    db.collection('noticias').doc(id).delete().then(() => {
    console.log('Noticia borrada');
    location.reload();
    })
}