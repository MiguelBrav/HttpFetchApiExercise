import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { YugiohAPP } from './yugioh/yugioh-app'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">Hello Vite!</h1>
    <div class="card">
    </div>
      <div>
      <select id="language-selector">
        <option value="en-us">English</option>
        <option value="es-mx">Español</option>
      </select>
    </div>
  </div>
`

const element = document.querySelector('.card');

YugiohAPP(element);