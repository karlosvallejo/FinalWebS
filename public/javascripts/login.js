const form = jQuery('#formularioLogin');













//LISTENERS
form.submit((event)=>{
   event.preventDefault();
   const url= form.prop('action');
   const formito= new FormData(form[0]);
    for (let pair of formito.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
   postAjax(url,formito).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            window.alert("correcto");
        }
   })

});





//PETICIONES
function postAjax(url,data) {
    return $.ajax({
                      url: url,
                      data: data,
                      processData: false,
                      contentType: false,
                      type: 'POST',
                  });
}
