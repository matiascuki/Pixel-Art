function borrarPantalla() {
  let $grilla = $('#grilla-pixeles') ;
  let $botonBorrar = $('#borrar');

  $botonBorrar.click(function () {
    $grilla.each(function () {
      $("#grilla-pixeles div").animate({
        backgroundColor: '#ffffff'

      },1200)
    })
  })
}
$(document).ready(borrarPantalla())
// Abre una ventana para guardar nuestro arte en un archivo pixel-art.png
function guardarPixelArt() {
  html2canvas($("#grilla-pixeles"), {
    onrendered: function (canvas) {
      theCanvas = canvas;
      canvas.toBlob(function (blob) {
        saveAs(blob, "pixel-art.png");
      });
    }
  });
}

// Carga a un superheroe predefinido
function cargarSuperheroe(superheroe) {
  var $pixeles = $("#grilla-pixeles div");
  for (var i = 0; i < superheroe.length; i++) {
    $pixeles[i].style.backgroundColor = superheroe[i];
  }
}


