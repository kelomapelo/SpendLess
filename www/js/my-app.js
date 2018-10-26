// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.framework7.SpendLess', // App bundle ID
  name: 'SpendLess', // App name
  theme: 'auto', // Automatic theme detection
  vi: {
    placementId: 'pltT43MAYvRgxO6gTPO',
  },
  panel: {
    swipe: 'left'
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var estadisticasView = app.views.create('#view-estadisticas', {
  url: '/estadisticas/'
});
var settingsView = app.views.create('#view-agregar', {
  url: '/agregar/'
});
var calculatorView = app.views.create('#view-calculator', {
  url: '/calculator/'
});
var calendarrView = app.views.create('#view-calendar', {
  url: '/calendar/'
});

let arreglo_global = [];

let entradas;

// Descuento
$$('#des-screen .login-button').on('click', function () {
  var valor = $$('#des-screen [name="valor"]').val();
  var descuento = $$('#des-screen [name="descuento"]').val();
  var resultado = valor -(valor*(descuento/100));
  var final = valor*(descuento/100);


  // Close login screen
  app.loginScreen.close('#des-screen');

  // Alert Resultado
  app.dialog.alert('Valor del producto: $' + valor + '<br>Descuento: $' + final + '<br>Valor con descuento: $' + resultado);
});

// Interes
$$('#int-screen .login-button').on('click', function () {
  var valor = $$('#int-screen [name="valor"]').val();
  var interes = $$('#int-screen [name="interes"]').val();
  var resultado = parseInt(valor) + (valor*(interes/100));
  var final = valor*(interes/100);

  // Close login screen
  app.loginScreen.close('#int-screen');

  // Alert Resultado
  app.dialog.alert('Valor del producto: $' + valor + '<br>Interes: $' + final + '<br>Valor con interes: $' + resultado);
});

$$('#ing-screen .login-button').on('click', function () {
  var nombre = $$('#ing-screen [name="nombre"]').val();
  var monto = $$('#ing-screen [name="monto"]').val();
  var fecha = $$('#ing-screen [name="fecha"]').val();
  var des = $$('#ing-screen [name="des"]').val();
  var radio = $$('#ing-screen [name="radio"]:checked').val(); 
  var tipo = "Ingreso";

  app.loginScreen.close('#ing-screen');

  app.dialog.alert('Nombre: ' + nombre + '<br>Monto: $' + monto + '<br>Fecha: ' + fecha
    + '<br>Descripcion: ' + des + '<br>Categoria: ' + radio);

  localStorage.setItem("entradas", JSON.stringify(arreglo_global));

  var arreglo = [];
  arreglo.push(tipo);
  arreglo.push(nombre);
  arreglo.push(monto);
  arreglo.push(fecha);
  arreglo.push(des);
  arreglo.push(radio);

  arreglo_global = JSON.parse(localStorage.getItem("entradas"));

  arreglo_global.push(arreglo);

  app.dialog.alert(arreglo_global);

  localStorage.setItem("entradas", JSON.stringify(arreglo_global));
});

$$('#gas-screen .login-button').on('click', function () {
  var nombre = $$('#gas-screen [name="nombre"]').val();
  var monto1 = $$('#gas-screen [name="monto"]').val();
  var fecha = $$('#gas-screen [name="fecha"]').val();
  var des = $$('#gas-screen [name="des"]').val();
  var radio = $$('#gas-screen [name="radio"]:checked').val(); 
  var tipo = "Gasto";
  var monto = Number(monto1) * -1;

  app.loginScreen.close('#gas-screen');

  app.dialog.alert('Nombre: ' + nombre + '<br>Monto: $' + monto + '<br>Fecha: ' + fecha
    + '<br>Descripcion: ' + des + '<br>Categoria: ' + radio);

  localStorage.setItem("entradas", JSON.stringify(arreglo_global));

  var arreglo = [];
  arreglo.push(tipo);
  arreglo.push(nombre);
  arreglo.push(monto.toString());
  arreglo.push(fecha);
  arreglo.push(des);
  arreglo.push(radio);

  arreglo_global = JSON.parse(localStorage.getItem("entradas"));

  arreglo_global.push(arreglo);

  app.dialog.alert(arreglo_global);

  localStorage.setItem("entradas", JSON.stringify(arreglo_global));

}); 

var notificacion =
  app.notification.create({
  title: 'SpendLess',
  subtitle: 'Recordatorio',
  text: 'No olvides agregar tus Gastos/Ingresos',
  closeTimeout: 3000,
  });

function inicio() {
  entradas = JSON.parse(localStorage.getItem("entradas"));
  capital();
}

function pedir(){
  app.dialog.alert(entradas);
  historial();
  esta();
}

var prepairedAd;
if (!app.vi.sdkReady) {
  app.on('viSdkReady', function () {
    prepairedAd = app.vi.createAd({
      autoplay: false,
    });
  })
} else {
  prepairedAd = app.vi.createAd({
    autoplay: false,
  });
}

// Show prepaired ad
$$('.show-prepaired').on('click', function () {
  prepairedAd.start();
});

function esta(){

  y = document.getElementById("estadistica");
    y.setAttribute('data-type', 'circle');
    y.setAttribute('data-size', '250');
    y.setAttribute('data-value', '0.35');
    y.setAttribute('data-value-text', '$350');
    y.setAttribute('data-value-text-color', '#4caf50');
    y.setAttribute('data-value-font-size', '45');
    y.setAttribute('data-value-font-weight', '600');
    y.setAttribute('data-label-text', 'de $3000 son ingresos');
    y.setAttribute('data-border-color', '#4caf50');
    y.setAttribute('data-border-bg-color', '#f44336');
}

//HISTORIAL
function historial(){
  var i;
  var rojo = "http://ximg.es/88x88/f4433/f4433.jpg";
  var verde = "http://ximg.es/88x88/4caf50/4caf50.jpg";
  var imagen;
  for (var i = 0; i < entradas.length; i++) { 
    if (entradas[i][2] > 0) {
      imagen = verde;
    } else {
      imagen = rojo;
    }

    j = document.createElement('div');
        j.setAttribute('id', i);
    document.getElementById("historial").appendChild(j); 


    document.getElementById(i).innerHTML = 

      '<div class="list media-list">' +
          '<ul>' +
            '<li>' +
              '<a href="#" class="item-link item-content">' +
                '<div class="item-media"><img src=' + imagen + ' width="80"/></div>' +
                '<div class="item-inner">' +
                  '<div class="item-title-row">' +
                    '<div class="item-title">'+ entradas[i][1] +'</div>' +
                    '<div class="item-after">'+ entradas[i][2] +' / '+ entradas[i][3] +'</div>' +
                  '</div>' +
                  '<div class="item-subtitle">'+ entradas[i][5] +'</div>' +
                  '<div class="item-text">'+ entradas[i][4] +'</div>' +
                '</div>' +
              '</a>' +
            '</li>' +
          '</ul>' +
        '</div>'

  }
}

//BARRA LATERAL
function capital(){
  var i;
  var varcap = 0;
  for (var i = 0; i < entradas.length; i++) {
    
    numero = Number(entradas[i][2]);

    varcap = varcap + numero;

  }
  if (varcap > 0) {
    document.getElementById('capital').innerHTML = "<p class='green'>" + "$" + varcap + "</p>";
  }
  else {
    document.getElementById('capital').innerHTML = "<p class='red'>" + "$" + varcap + "</p>";
  }
}


//CALENDARIO
function calendario(){
  var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'];
  var calendarInline = app.calendar.create({
    containerEl: '#demo-calendar-inline-container',
    value: [new Date()],
    weekHeader: false,
    renderToolbar: function () {
      return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
        '<div class="toolbar-inner">' +
          '<div class="left">' +
            '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
          '</div>' +
          '<div class="center"></div>' +
          '<div class="right">' +
            '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

        events: [
        {
            date: new Date(2018, 9, 8),
            color: '#ff0000'
        },
        {
            date: new Date(2018, 9, 9),
            color: '#00ff00'
        },
    ],

    on: {
      init: function (c) {
        $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
        $$('.calendar-custom-toolbar .left .link').on('click', function () {
          calendarInline.prevMonth();
        });
        $$('.calendar-custom-toolbar .right .link').on('click', function () {
          calendarInline.nextMonth();
        });
      },
      monthYearChangeStart: function (c) {
        $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
      }

    }
  });
}

//CALCULADORA
function cals(buttonValue) 
{
if (buttonValue == 'C') 
{
   document.getElementById('valueshow').value = '0';
}
else
  {
    if(document.getElementById('valueshow').value == '0') 
 {
  
   document.getElementById('valueshow').value = buttonValue;
}
  
  else
   {
    
    document.getElementById('valueshow').value += buttonValue;
   }
  }
 }
  function cal(equation)  
   
  {
  var answer = eval(equation);
document.getElementById('valueshow').value = answer;
 }
