window.onload=function() {
    const nivelesHttp = new XMLHttpRequest();
    const materiasHttp = new XMLHttpRequest();

    nivelesHttp.onreadystatechange = function() {
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
   
    }
    nivelesHttp.open("GET",'/api/niveles/', true);
    nivelesHttp.send();


    materiasHttp.onreadystatechange = function() {
        if (materiasHttp.readyState == 4 && materiasHttp.status == 200) {
          const respuesta = JSON.parse(materiasHttp.responseText);
          llenarMaterias(respuesta)
        }
    };

    const llenarMaterias = (materias) => {
      const checkbox = document.querySelector('.materias')
      
      materias.forEach((materia) => {
        const label = document.createElement('label')
        label.setAttribute('class','checkbox-inline')
        const input = document.createElement('input')
        input.setAttribute('type','checkbox')
        input.setAttribute('id','checkbox_'+materia.area)
        input.setAttribute('value',materia.area)
        label.appendChild(input)
        label.innerHTML=label.innerHTML+materia.area
        checkbox.appendChild(label)
      })
    }
    materiasHttp.open("GET",'/api/materias/', true);
    materiasHttp.send();
    
   }