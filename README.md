# 💜 PIOCAMP 2018 | Taller de React JS desde cero 💜

## ¿ Qué haremos ?

Un lindo buscador de GIFs 

## ¿ Qué aprenderemos ?

* Aprenderemos lo que se necesita para comenzar un proyecto con React JS.
* Qué son los componentes ?
* Conceptos de componentes: Functional & Logical.
* JSX (que en mi mente es como un hijito entre JS y HTML).
* Conceptos básicos de React JS: Props & State.
* Consumo de una API.
* Mostrar los datos consumidos en la UI y estilizarlos.

## ¿ Qué debemos hacer para comenzar ?

1. Instalar el boilerplate: `npm install -g create-react-app`.
2. Crear un proyecto nuevo: `npx create-react-app gif-search`.
3. Entrar al proyecto: `cd gif-search`.
4. Correr el proyecto: `npm start`.
5. Ir al navegador y ver que el proyecto corre: `http://localhost:3000/`.

Ahora siiiii, ¿ estás lista ? 

¡ Empecémos !

# 🔍 GIF SEARCH 🔍 

## Algunos conceptos importantes:

* _ReactJS:_ es una librería de JS para crear aplicaciones Web.
* _Webpack:_ es un paquete de activos que toma todos nuestros archivos JS / CSS, los combina en un solo archivo y sirve ese archivo. También incluye Hot Reloading, lo que significa que deberíamos ver cualquier cambio en el código sin tener que actualizar nuestro navegador.
* _Babel:_ es una herramienta de compilación que nos permite escribir código JavaScript ES2015 (también conocido comúnmente como ES6). 
* _ESLint:_ una utilidad de alineación de JavaScript que comprueba nuestro código JavaScript en busca de problemas de espaciado, errores, etc.

## Los componentes de nuestra aplicación son:

<img src="./src/assets/mockup.png" alt="mockup"/>

## App.js

Este componente es nuestro contenedor y será nuestro punto de partida. por ahora modificaremos el código que ya viene por defecto y le pondremos un lindo Hello World:

```
import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello World !
      </div>
    );
  }
}

export default App;
```
## SearchBar.js

Ahora, crearemos nuestro componente SearchBar para nuestra barrita de búsqueda dentro de una nueva carpeta src / components. Por ahora, solo pondremos un `div` para asegurarnos de que lo estamos introduciento en nuestro `App.js` de la manera correcta.

Entonces, nuestro SearchBar quedaría así:
```
import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { }
    }

    render() {
        return (
            <div>
                Seré una barrita de búsqueda :)
            </div>
        );
    }
}

export default SearchBar;
```
Y en App.js lo importamos así:
```
import React, { Component } from 'react';
import SearchBar from './components/SearchBar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       Hello World !
       <SearchBar/>
      </div>
    );
  }
}

export default App;
```
Si en tu navegador ves el resultado correcto, escribiremos lo siguiente en SearchBar:
```
import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <input onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }
}

export default SearchBar;
```
Y en el App.js:
```
import React, { Component } from 'react';
import SearchBar from './components/SearchBar';

import './App.css';

class App extends Component {
  handleTermChange(term) {
    console.log(term);
  }
  
  render() {
    return (
      <div className="App">
       <SearchBar onTermChange={this.handleTermChange}/>
      </div>
    );
  }
}

export default App;
```
Si todo sale bien, deberías ver esto en tu pantalla:
<img src="./src/assets/screen1.png" alt="search bar to begin"/>

## El estado y nuestros Gifs

Si vemos nuestro mockup nuevamente:

<img src="./src/assets/mockup.png" alt="mockup"/>

Veremos que hay dos componentes diferentes que necesitaremos construir aquí: un GifList que se asigna a través de la matriz de gifs que recibiremos de la API de Giphy y un GifItem para procesar los gifs individuales.

Antes de que nos preocupemos por llamar a la API de Giphy, simulemos algunos datos falsos para pasarlos a nuestros componentes. 

Ve a tu App.js y escribe lo siguiente:
```
constructor() {
    super();

    this.state = {
        gifs: [
            {
                id: 1,
                url: 'http://fakeimg.pl/300/'
            },
            {
                id: 2,
                url: 'http://fakeimg.pl/300/'
            },
            {
                id: 3,
                url: 'http://fakeimg.pl/300/'
            }
        ]
    }
}
```
Ahora, creemos el componente `GifItem.js` en la carpeta components y le añadimos lo siguiente:
```
import React from 'react';

const GifItem = ({ gif }) => {
  return (
    <li>
      <img src={gif.url} />
    </li>
  )
};

export default GifItem;
```
Después, crearemos un componente llamado `GifList.js` en la carpeta components y escribimos lo siguiente:
```
import React from 'react';
import GifItem from './GifItem';

const GifList = ({ gifs }) => {
  const gifItems = gifs.map(gif => <GifItem key={gif.id} gif={gif} />);

  return (
    <ul>{gifItems}</ul>
  );
};

export default GifList;
```
Y finalmente, importamos `GifList.js` en nuestro `App.js` y deberíamos tener lo siguiente:
```
import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
        gifs: [
            {
                id: 1,
                url: 'http://fakeimg.pl/300/'
            },
            {
                id: 2,
                url: 'http://fakeimg.pl/300/'
            },
            {
                id: 3,
                url: 'http://fakeimg.pl/300/'
            }
        ]
    }
  }

  handleTermChange(term) {
    console.log(term);
  }

  render() {
    return (
      <div className="App">
       <SearchBar onTermChange={this.handleTermChange}/>
       <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

export default App;
```
En nuestro navegador, veremos:

<img src="./src/assets/screen2.png" alt="feak data"/>

## Consumiendo la API de Giphy

La API base es `http://api.giphy.com/v1/gifs/search?q=`. Después de ese `?q=` le debemos escribir el nombre del gif que queremos y adicionalmente nuestra API HEY con `&api_key=`. La API KEY pública es `dc6zaTOxFJmzC` así que nuestro endpoint si queremos buscar gatos, quedaría así:

`http://api.giphy.com/v1/gifs/search?q=gatos&api_key=dc6zaTOxFJmzC`

Y, para hacer los llamados usaremos una librería llamada [axios](https://github.com/axios/axios). Lo que debemos hacer para hacer uso de ella es instalarla en nuestro proyecto con el comando: `npm install axios`.

Después de haber instalado axios en nuestro proyecto, debemos importarla en App.js en la parte superior así: `import axios from 'axios';` y añadimos en nuestra función `handleTermChange()` lo siguiente:
```
handleTermChange(term) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;
    
    axios.get(url)
      .then(function (response) {
        // handle success
        console.log(response);
      })
}
```
Ve a tu navegador y asegurate que te salga ese `console.log` con la respuesta de la API al hacer cualquier busqueda en el SearchBar. Adicionalmente, quitaremos los datos falsos que le habíamos puesto en nuestro state y simplemente colocaremos:
```
constructor() {
    super();

    this.state = {
        gifs: []
    }
}
```
Después de esto, añadiremos a nuestra función `handleTermChange()` lo siguiente:
```
handleTermChange(term) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

    request.get(url, (err, res) => {
        this.setState({ gifs: res.body.data })
    });
}
```
Y si lo corremos...

<img src="./src/assets/screen3.png" alt="error" />
😭😭😭

Pero, no te preocupes. Él tiene toda la razón. Lo que debemos hacer es un Binding en el Constructor o podemos usar las *arrow functions*. Así que nuestra función quedaría:
```
handleTermChange = term => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;
    
    axios.get(url)
      .then(response => this.setState({ gifs: response.data.data }))
  }
```
Ahora, hacemos una pequeña modificación en el método `render()` de `App.js`:
```
render() {
    return (
      <div className="App">
       <SearchBar onTermChange={term => this.handleTermChange(term)}/>
       <GifList gifs={this.state.gifs} />
      </div>
    );
  }
```
y, lo único que necesitamos para que nuestro buscador funcione, es cambiar en `GifItem`:
```
<img src={gif.images.downsized.url} />
```
Y nuestro resultado eeeeees:

<img src="./src/assets/screen4.png" alt="search result"/>

Wiiiiii 🎉 Estoy contenta pero a la vez no jajajaj. Siento que falta darle más forma... y para eso... CSS 😍 !!!