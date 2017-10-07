window.onload = function () {
  const nivelesHttp = new XMLHttpRequest();
  const materiasHttp = new XMLHttpRequest();

  nivelesHttp.onreadystatechange = function () {
    if (nivelesHttp.readyState == 4 && nivelesHttp.status == 200) {
      const respuesta = JSON.parse(nivelesHttp.responseText);
      llenarNiveles(respuesta)
    }
  };

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

var consultaContenido = document.querySelector('#consultaContenido');
consultaContenido.onclick = function () {
  const contenidosHttp = new XMLHttpRequest();

  const llenarContenidos = (contenidos) => {
    const div = document.querySelector('.collection')
    const contenedorCarta = document.querySelector('#contenedorCarta')
    div.textContent = ''
    contenedorCarta.textContent = ''
    contenidos.forEach((contenido) => {
      const item = document.createElement('a')
      item.setAttribute('href', '#!')
      item.setAttribute('id', 'item_' + contenido._id)
      item.setAttribute('class', 'collection-item blue-text')
      item.addEventListener('click', click);
      item.textContent = contenido.unidad
      div.appendChild(item)
      contenedorCarta.appendChild(CrearElementosCarta(contenido))
    });

    document.querySelector('#contenidos').removeAttribute('hidden')
  }
  contenidosHttp.onreadystatechange = function () {
    if (contenidosHttp.readyState == 4 && contenidosHttp.status == 200) {
      const respuesta = JSON.parse(contenidosHttp.responseText);
      llenarContenidos(respuesta)
    }
  };

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

//l
function CrearElementosCarta(contenido) {
  const DivCard = document.createElement('div')
  DivCard.setAttribute('class', 'card')
  DivCard.setAttribute('id', 'card_' + contenido._id)
  DivCard.hidden = true;
  const DivcardImage = document.createElement('div')
  DivcardImage.setAttribute('class', 'card-image')
  const img = document.createElement('img')
  img.setAttribute('src', 'img/school/abacus.svg')
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
