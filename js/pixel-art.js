var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

const $paleta = $('#paleta');
const $grillaPixeles = $('#grilla-pixeles');
const $indicador = $('#indicador-de-color');


function crearPaleta() {
  for (i = 0; i < nombreColores.length; i++) {
    $paleta.append('<div class="color-paleta" style="background-color: ' + nombreColores[i] + ' "></div>');;
  }
}

function crearGrilla() {
  for (i = 0; i < 1750; i++) {
    $grillaPixeles.append('<div></div>');
  }
}

function seleccionarPaleta() {
  $('#paleta div').click(function () {
    let colorClick = $(this).css("background-color");
    $indicador.css("background-color", colorClick)
  });

}

function pintar() {
  let colorClick;
  let estaClick;
  $grillaPixeles.mousedown(function () {
    colorClick = $indicador.css("background-color");
    estaClick = true;
    $(this).css("background-color", colorClick)
  })

  $grillaPixeles.mouseup(function () {
    estaClick = false;
  })


  $('#grilla-pixeles div').mousemove(function () {
    if (estaClick) {
      $(this).css("background-color", colorClick)
    }
  })

  $grillaPixeles.mouseleave(function () {
    estaClick = false;
  })
}



$(document).ready(function() {
  crearPaleta();
  crearGrilla();
  seleccionarPaleta();
  pintar();
})


// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change',
  (function () {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    $indicador.css("background-color", colorActual);

  })
);