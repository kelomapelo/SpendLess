// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.framework7.SpendLess', // App bundle ID
  name: 'SpendLess', // App name
  theme: 'auto', // Automatic theme detection
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
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
$$('#des-screen .cancelar-button').on('click', function () {
  app.vi.createAd();
  app.loginScreen.close('#des-screen');
  });
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
$$('#int-screen .cancelar-button').on('click', function () {
  app.vi.createAd();
  app.loginScreen.close('#int-screen');
});
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

$$('#ing-screen .cancelar-button').on('click', function () {
  app.vi.createAd();
  app.loginScreen.close('#ing-screen');
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

  localStorage.setItem("entradas", JSON.stringify(arreglo_global));

});

$$('#gas-screen .cancelar-button').on('click', function () {
  app.vi.createAd();
  app.loginScreen.close('#gas-screen');
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

  localStorage.setItem("entradas", JSON.stringify(arreglo_global));
  
}); 

// Borrar
$$('#borrar-screen .cancelar-button').on('click', function () {
  app.loginScreen.close('#borrar-screen');
  });
$$('#borrar-screen .login-button').on('click', function () {
  var nombre = $$('#borrar-screen [name="nombre"]').val();

  arreglo_global = JSON.parse(localStorage.getItem("entradas"));

  for (var i = 0; i < arreglo_global.length; i++) { 
    if (arreglo_global[i][1] == nombre) {
      app.dialog.confirm('Esta seguro de borrar el movimiento "'+ nombre +'"?', function () {
        arreglo_global.splice(i - 1, 1);
        localStorage.setItem("entradas", JSON.stringify(arreglo_global));
        app.dialog.alert('Borrado');
      });
      app.loginScreen.close('#borrar-screen');
    } else {
      app.dialog.alert('El nombre ingresado no existe');
      app.loginScreen.close('#borrar-screen');
    }
  }
  
});

var notificacion =
  app.notification.create({
  title: 'SpendLess',
  subtitle: 'Recordatorio',
  text: 'No olvides agregar tus Gastos/Ingresos',
  closeTimeout: 5000,
  });

function iniciando() {
  arreglo_global = JSON.parse(localStorage.getItem("entradas"));
  app.dialog.alert(arreglo_global);
  entradas = arreglo_global;
  notificacion.open();
  capital();
}

 function estadisticsgas() {

  var total = 0;
  var texto_total;
  var valor_gas = 0;
  var texto;
  var valortexto;
    for( var i = 0; i < arreglo_global.length; i++) { 
        total += 1;
      if (arreglo_global[i][0] == "Gasto") {
        valor_gas += 0.1;
        valortexto = valor_gas * 10;
        texto = valortexto.toString();
      }else {
        valortexto = valor_gas;
        texto = valortexto.toString();
      }
      texto_total = total.toString();
    }

  var gauge = app.gauge.get('.gasto-gauge');
  
  gauge.update({
    value: valor_gas,
    valueText: texto,
    labelText: "de " + texto_total + " movimientos",
  });

 }

 function estadisticsing() {
  
  var total = 0;
  var texto_total;
  var valor_ing = 0;
  var texto;
  var valortexto;
    for( var i = 0; i < arreglo_global.length; i++) { 
      total += 1;
      if (arreglo_global[i][0] == "Ingreso") {
        valor_ing += 0.1;
        valortexto = valor_ing * 10;
        texto = valortexto.toString();
      }else {
        valortexto = valor_ing;
        texto = valortexto.toString();
      }
      texto_total = total.toString();
    }

  var gauge = app.gauge.get('.ingreso-gauge');
  
  gauge.update({
    value: valor_ing,
    valueText: texto,
    labelText: "de " + texto_total + " movimientos",
  });
 }

function actualizar(){
  capital();
  historial();
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


//HISTORIAL
function historial(){
  var i;
  var rojo = "http://ximg.es/88x88/f4433/f4433.jpg";
  var verde = "http://ximg.es/88x88/4caf50/4caf50.jpg";
  var imagen;
  for (var i = 0; i < arreglo_global.length; i++) { 
    if (arreglo_global[i][2] > 0) {
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
                    '<div class="item-title">'+ arreglo_global[i][1] +'</div>' +
                    '<div class="item-after">'+ '$' + arreglo_global[i][2] +' / '+ arreglo_global[i][3] +'</div>' +
                  '</div>' +
                  '<div class="item-subtitle">'+ arreglo_global[i][5] +'</div>' +
                  '<div class="item-text">'+ arreglo_global[i][4] +'</div>' +
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
  for (var i = 0; i < arreglo_global.length; i++) {
    
    numero = Number(arreglo_global[i][2]);

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

