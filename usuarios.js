    // crea una variable que enlaza con la base de datos que vamos a utilizar, que en este caso es firebase
    const db = firebase.firestore();
    // crea la variable que hace referencia al formulario del html crearUsuario.html
    const form = document.getElementById('contactForm');
    // crea la variable que hace referencia al contenedor de listaUsuarios.html
    const container = document.getElementById('container');
    // crea la variable que hace referencia al boton reset de crearUsuario.html
    const reset = document.getElementById('reset');


    //Con el siguiente metodo, guardo los datos del formulario en mi base de datos.
    const guardarDatos = (nombre, apellido, email, fecha, sexo, how, rango, opinion, comentario) =>
        db.collection('users').doc().set({
            nombre,
            apellido,
            email,
            fecha,
            sexo,
            how,
            rango,
            opinion,
            comentario
        });
    //Creo una variable llamada obtenerDatos para recoger los datos de base de datos que le indico    
    const obtenerDatos = () => db.collection('users').get();

    //Para generar la lista de usuarios llamamos a la base de datos y rellenamos un div por cada elemento
    //que haya en la base de datos
    window.addEventListener('DOMContentLoaded', async (e) => {
        const usuarios = await obtenerDatos();
        usuarios.forEach(doc => {
            //Cada div se crea con un estilo que tenemos definido en la libreria bootstrap,
            // la cual llamamos desde el html listaUsuarios
            container.innerHTML += 
            `<div class="card card-body mt-2 border-primary">
                <h3>${doc.data().nombre} ${doc.data().apellido} (${doc.data().email})</h3>
                <h5>Sexo: ${doc.data().sexo}</h5>
                <h5>Fecha de nacimiento: ${doc.data().fecha}</h5>
                <h5>Nos conociste: ${doc.data().how}</h5>             
                <h5>Tipo de juego favorito: ${doc.data().opinion}</h5>             
                <h5>Dejanos tu comentario: ${doc.data().comentario}</h5>   
                <button onclick="deleteUsers('${doc.id}')" class="btn btn-dark" style="width: 7em;align-self: flex-end;">Borrar</button>                       
            </div>`
        })
    })
    //Envia cada dato que hay dentro de cada elemento del formulario a la base de datos mediante el metodo guardarDatos()
    function send() {
        form.addEventListener('submit', async e => {    
            e.preventDefault();
            const nombre = form['nombre'];
            const apellido = form['apellido'];
            const email = form['email'];
            const fecha = form['fecha'];
            const sexo = document.querySelector('input[name="sexo"]:checked');
            const how = form['how'];
            const rango = form['rango'];
            const opinion = document.querySelector('input[name="opinion"]:checked');
            const comentario = form['texto'];
        
            await guardarDatos(nombre.value, apellido.value, email.value, fecha.value, sexo.value, how.value, rango.value, opinion.value, comentario.value);
    
            console.log("Usuario añadido");
            resetForm();
            location.reload();
            nombre.focus();
        })
    }
    //funcion para resetear el formulario despues de añadir un usuario nuevo
    function resetForm(){
        form.reset();
    }

    //Función para borrar un elemento pasandole un Id
    function deleteUsers(id){
        db.collection('users').doc(id).delete().then(() => {
        console.log('Usuario borrado');
        location.reload();
        })
    }
