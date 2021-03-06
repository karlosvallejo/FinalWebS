let urlimg;
let id_usu;
let jsonUsu;
let proyectos;

const formitoCrear=$('#crearposti');


//VERIFICA SI HE INICIADO SESION
if(!sessionStorage.datos){
    window.location.replace('/');
} else {
    jsonUsu=JSON.parse(sessionStorage.datos);
    urlimg= "http://localhost:3000/Users/"+jsonUsu.profilePic;
    id_usu= jsonUsu.correo;
    console.log(jsonUsu);
    solicutarProyectos();
}




function solicutarProyectos() {
    postAjax("/api/proyectos",{creador:id_usu}).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            window.alert("correcto");
            console.log(data);
            sessionStorage.proyectos= JSON.stringify(data);
            proyectos=JSON.parse(sessionStorage.proyectos);
            let listi= $('#listin');

            //data contiene un array con los proyectos, el parametro nombre es el nombre del proyecto
            listi.empty();
            $.each(data,(i,value)=>{
                let button= $("<button>"+value.nombre+"</button>").click(function () {
                    abrirProyecto(value.nombre);
                });
                let item= $('<li>').append(button);
                listi.append(item);
            });



        }
    })
}



//LISTENERS
formitoCrear.submit((event)=>{
    event.preventDefault();
    const url= formitoCrear.prop('action');
    const formito= new FormData(formitoCrear[0]);
    formito.append("creador",id_usu);
    for (let pair of formito.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    postAjaxFormData(url,formito).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            window.alert("correcto");
            solicutarProyectos();
        }
    })

});

//----------------------------------------------------------------------------------------------------

function abrirProyecto(name) {
$.each(proyectos,(index,value)=>{
    if(name===value.nombre){
        sessionStorage.proyectoSel=JSON.stringify(value);
        console.log(JSON.parse(sessionStorage.proyectoSel));
        window.location.replace("./view");
    }
})


}




//PETICIONES
function postAjax(url,data) {
    console.log(data);
    return $.ajax({
                      dataType : "json",
                      contentType: "application/json; charset=utf-8",
                      url: url,
                      data: JSON.stringify(data),
                      processData: false,
                      type: 'POST',
                  });
}

function postAjaxFormData(url,data) {
    return $.ajax({
                      url: url,
                      data: data,
                      processData: false,
                      type: 'POST',
                      contentType:false
                  });
}