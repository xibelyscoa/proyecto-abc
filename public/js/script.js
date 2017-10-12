window.onload = function () {
  const nivelesHttp = new XMLHttpRequest();
  const materiasHttp = new XMLHttpRequest();

  nivelesHttp.onreadystatechange = function () {
    if (nivelesHttp.readyState == 4 && nivelesHttp.status == 200) {
      const respuesta = JSON.parse(nivelesHttp.responseText);
      llenarNiveles(respuesta)
    }
  };
  // Listar los niveles escolares traidos por la base de datos
  const llenarNiveles = (niveles) => {
    const select = document.querySelector('select')

    niveles.forEach((nivel) => {
      const opcion = document.createElement('option')
      opcion.textContent = nivel.nombre
      select.appendChild(opcion)
    })
    $('select').material_select();
  }
  nivelesHttp.open("GET", '/api/niveles/', true);
  nivelesHttp.send();

  materiasHttp.onreadystatechange = function () {
    if (materiasHttp.readyState == 4 && materiasHttp.status == 200) {
      const respuesta = JSON.parse(materiasHttp.responseText);
      llenarMaterias(respuesta)
    }
  };
//Listar las materias academicas traidas por la base de datos
  const llenarMaterias = (materias) => {
    const checkbox = document.querySelector('.materias')

    materias.forEach((materia) => {
      const p = document.createElement('p')
      const input = document.createElement('input')
      const label = document.createElement('label')
      label.setAttribute('for', 'checkbox_' + materia._id)
      input.setAttribute('type', 'checkbox')
      input.setAttribute('id', 'checkbox_' + materia._id)
      input.setAttribute('value', materia.area)
      label.textContent = materia.area
      input.addEventListener('click', function(e){
        var chk= this.getAttribute('checked')
        if (chk== null){
          this.setAttribute('checked', '')
        }else{
          this.removeAttribute('checked')
        }
      })
      p.appendChild(input)
      p.appendChild(label)
      checkbox.appendChild(p)

    });
  }
  materiasHttp.open("GET", '/api/materias/', true);
  materiasHttp.send();
}
//funcion onclick para seleccionar contenidos
var consultaContenido = document.querySelector('#consultaContenido');
consultaContenido.onclick = function () {
  const contenidosHttp = new XMLHttpRequest();
// funcion para llenar los contenidos en la coleccion
  const llenarContenidos = (contenidos) => {
    const div = document.querySelector('.collection')
    const contenedorCarta = document.querySelector('#contenedorCarta')
    div.textContent = ''
    contenedorCarta.textContent = ''
    // Test de soporte LDB
    if(setLocalData('test','test')){
      cleanLocalData();
    }else{
      document.cookie=JSON.stringify(contenidos);
    }
    contenidos.forEach((contenido) => {
      const item = document.createElement('a')
      item.setAttribute('href', '#!')
      item.setAttribute('id', 'item_' + contenido._id)
      item.setAttribute('class', 'collection-item blue-text')
      item.addEventListener('click', click);
      item.textContent = contenido.unidad
      div.appendChild(item)
      contenedorCarta.appendChild(CrearElementosCarta(contenido))
      porLDB=setLocalData(contenido._id,contenido);
    });
    document.querySelector('#contenidos').removeAttribute('hidden')
  }
  contenidosHttp.onreadystatechange = function () {
    if (contenidosHttp.readyState == 4 && contenidosHttp.status == 200) {
      const respuesta = JSON.parse(contenidosHttp.responseText);
      llenarContenidos(respuesta)
    }
  };
// ajax para listar los contenidos en la carta de acuerdo a la materia
  contenidosHttp.open("POST", '/api/contenidos/by/', true);
  contenidosHttp.setRequestHeader("Content-type", "application/json");
  var gradoValue= document.querySelector('select').value
  var query= []
  document.querySelector('.materias').querySelectorAll('input').forEach((casilla) => {
    if(casilla.getAttribute('checked')!= null){
      var materiaValue= {
        materia:casilla.value,
        grado: gradoValue
      }
      query.push(materiaValue);
    }
  })
  contenidosHttp.send(JSON.stringify( 
    { $or:query}
  ));
} 
// funcion click de la materia para ocultar todas las cartas y dejar visible solo a la seleccionada
function click() {
  const contenedorCarta = document.querySelector('#contenedorCarta')
  contenedorCarta.childNodes.forEach((cartasOcultas) => {
    cartasOcultas.hidden = true
  });
  document.querySelector('#card_' + this.id.replace('item_', '')).removeAttribute('hidden')
}

function guardarContenidos() {
  if (this.querySelector('i').textContent === 'add'){
    document.querySelector('#item_' + this.id.replace('btn_', '')).setAttribute('class', 'collection-item active blue')
    this.setAttribute('class', 'btn-floating halfway-fab waves-effect waves-light blue')
    this.querySelector('i').textContent = 'check';
  } else {
      this.querySelector('i').textContent = 'add';
      this.setAttribute('class', 'btn-floating halfway-fab waves-effect waves-light red')
      document.querySelector('#item_' + this.id.replace('btn_', '')).setAttribute('class', 'collection-item blue-text')
  }

}

//Se crean los elementos de las cards y se la asigna el valor de la descripcion del contenido de la base de datos
function CrearElementosCarta(contenido) {
  const DivCard = document.createElement('div')
  DivCard.setAttribute('class', 'card')
  DivCard.setAttribute('id', 'card_' + contenido._id)
  DivCard.hidden = true;
  const DivcardImage = document.createElement('div')
  DivcardImage.setAttribute('class', 'card-image')
  const img = document.createElement('img')
  var imagen=contenido.imagen;
  if(imagen===''||imagen==undefined){
    img.setAttribute('src', 'img/materias/default.svg')
  }else{
    img.setAttribute('src', 'img/materias/'+imagen)
  }
  const span = document.createElement('span')
  span.setAttribute('class', 'card-title')
  span.textContent = contenido.unidad
  const a = document.createElement('a')
  a.setAttribute('class', 'btn-floating halfway-fab waves-effect waves-light red')
  a.setAttribute('id', 'btn_' + contenido._id)
  a.addEventListener('click', guardarContenidos)
  const i = document.createElement('i')
  i.setAttribute('class', 'material-icons')
  i.textContent = 'add'
  const DivCardContent = document.createElement('div')
  DivCardContent.setAttribute('class', 'card-content')
  const p = document.createElement('p')
  p.textContent = contenido.descripcion
  a.appendChild(i)
  DivcardImage.appendChild(img)
  DivcardImage.appendChild(span)
  DivcardImage.appendChild(a)
  DivCard.appendChild(DivcardImage)
  DivCardContent.appendChild(p)
  DivCard.appendChild(DivCardContent)
  return DivCard;
}
document.querySelector('#generar_reporte').onclick = function () {
  var gradoValue= document.querySelector('select').value;
  var queryContenidos= [];
  var contenidos_encookies=[];
  var almacen=false;
  // Test de soporte LDB
  if(setLocalData('test','test')){
    almacen=true;
  }else{
    contenidos_encookies=JSON.parse(document.cookie);
  }
  document.querySelector('.collection').querySelectorAll('a').forEach((item) => {
    //console.log(item.getAttribute('class').search('active'));
    if(item.getAttribute('class').search('active')===16){
      var contenido_id= item.id.replace('item_', '');
      if(almacen){
        queryContenidos.push(getLocalData(contenido_id));  
      }else{
        contenidos_encookies.forEach(function(cont){
          if(cont._id===contenido_id){
            queryContenidos.push(getLocalData(contenido_id));
            return;
          }
        });
      }
    }
  });
  const planHttp = new XMLHttpRequest();
  planHttp.onreadystatechange = function () {
    if (planHttp.readyState == 4 && planHttp.status == 200) {
      const respuesta = JSON.parse(planHttp.responseText);
      document.querySelector('#reporte').removeAttribute('hidden');
      document.querySelector('#link').value='https://abc-plan.herokuapp.com/'+respuesta._id;
      document.querySelector('iframe').setAttribute('src','/plan/'+respuesta._id);
    }
  };

  planHttp.open("POST", '/api/planes/', true);
  planHttp.setRequestHeader("Content-type", "application/json");
  planHttp.send(JSON.stringify({ 
    contenidos :queryContenidos,
    nombre: document.querySelector('#nameClient').value,
    email: document.querySelector('#emailClient').value,
    grado: document.querySelector('select').value 
    }
  ));
  document.querySelector('#reporte').removeAttribute('hidden');
};

function setLocalData(keyinput,valinput){
  if(typeof(window.localStorage) != 'undefined'){ 
      window.localStorage.setItem(keyinput,JSON.stringify(valinput));
      return true;
  }else{ 
      return false; 
  }
}

function getLocalData(keyinput){
  if(typeof(window.localStorage) != 'undefined'){ 
    return JSON.parse(window.localStorage.getItem (keyinput));
  }
}

function cleanLocalData(){
  if(typeof(window.localStorage) != 'undefined'){ 
    window.localStorage. clear() ;
  }
  return true;  
}

