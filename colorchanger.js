const background = document.getElementsByTagName('body')[0]
const afla = document.getElementById('afla')
let culoare = 'blue'
let poz = 0
let warn = 0
const buton = document.getElementById('buton')
const defaultculoare = document.getElementById('defaultculoare')
const stop = document.getElementById('stop')
const start = document.getElementById('start')
const titlu = document.getElementById('titlu')
let animation = 0
const consola = document.getElementById('consola')
document.getElementById('consolechat').style.visibility = 'hidden'
let def = 1
function changecolor () {
  let i
  culoare = '#'
  const litere = '0123456789ABCDEF'
  for (i = 1; i <= 6; i++) {
    culoare += litere[Math.floor(Math.random() * 16)]
  }
  poz++
  warn++
  console.log(`${culoare} a fost schimbat pe pozitia ${poz}`)
  background.style.backgroundColor = culoare
  console.log(`elementul ${warn}`)
  const div = document.createElement('div')
  div.classList.add('elem')
  const text = document.createElement('textarea')
  text.classList.add('text')
  text.innerHTML = culoare
  div.appendChild(text)
  const buton1 = document.createElement('button')
  buton1.classList.add('but')
  buton1.style.backgroundColor = culoare
  buton1.setAttribute('id', 'tooltip')
  const toolTip = document.createElement('span')
  toolTip.classList.add('tooltiptext')
  toolTip.innerHTML = 'Copy to clipboard'
  buton1.addEventListener('click', function () {
    const copyText = text
    copyText.select()
    document.execCommand('copy')
    toolTip.innerHTML = 'Copied: ' + copyText.value
    document.getSelection().removeAllRanges()
  })
  buton1.addEventListener('mouseleave', function () {
    toolTip.innerHTML = 'Copy to clipboard'
  })
  buton1.appendChild(toolTip)
  div.appendChild(buton1)
  consola.appendChild(div)
  consola.scrollTop = consola.scrollHeight
  if (warn > 50) console.error('Too much space occupied')
  else if (warn > 20) console.warn('You should clear the console for better view')
}
afla.addEventListener('click', function () {
  document.getElementById('consolechat').style.visibility = 'visible'
})
defaultculoare.addEventListener('click', function () {
  culoare = '#476EA6'
  console.log('default')
  background.style.backgroundColor = culoare
  poz = 0
  defaultculoare.addEventListener('dblclick', function () {
    console.clear()
    poz = 0
    warn = 0
  })
  if (def === 0) {
    const div = document.createElement('div')
    div.classList.add('elem')
    const text = document.createElement('textarea')
    text.innerHTML = 'Default'
    text.classList.add('text')
    const but = document.createElement('button')
    but.classList.add('but')
    but.style.backgroundColor = culoare
    div.appendChild(but)
    div.appendChild(text)
    consola.appendChild(div)
  }
})

stop.addEventListener('click', function () {
  if (animation !== 0) {
    animation = 0
    console.log('Animation was paused')
    afla.style.animationPlayState = 'paused'
    defaultculoare.style.animationPlayState = 'paused'
    buton.style.animationPlayState = 'paused'
    titlu.style.animationPlayState = 'paused'
  }
})
function startanimation () {
  titlu.style.animationPlayState = 'running'
  afla.style.animationPlayState = 'running'
  defaultculoare.style.animationPlayState = 'running'
  buton.style.animationPlayState = 'running'
}
start.addEventListener('click', function () {
  if (animation !== 1) {
    animation = 1
    console.log('Animation started')
    startanimation()
  }
})
function copy () {
  const copyText = document.getElementById('1')
  copyText.select()
  document.execCommand('copy')
  document.querySelector('.tooltiptext').innerHTML = 'Copied: ' + copyText.value
  document.getSelection().removeAllRanges()
}
function out () {
  document.querySelector('.tooltiptext').innerHTML = 'Copy to clipboard'
}
function scrie () {
  const inputValue = document.getElementById('scrie')
  if (inputValue.value !== '') {
    if (inputValue.value === '/help') {
      const lista = document.createElement('ul')
      const div = document.createElement('div')
      div.classList.add('elem')
      const text = document.createElement('li')
      text.classList.add('help')
      text.innerHTML = 'Type /clear to clear the console'
      lista.appendChild(text)
      ///
      const text2 = document.createElement('li')
      text2.classList.add('help')
      text2.innerHTML = 'Type /close to close the console'
      lista.appendChild(text2)
      ///
      const text3 = document.createElement('li')
      text3.classList.add('help')
      text3.innerHTML = 'Note: if you close the console, you can anytime click on \'Show colors\' to open it back'
      lista.appendChild(text3)
      ///
      div.appendChild(lista)
      consola.appendChild(div)
      consola.scrollTop = consola.scrollHeight
    }
    if (inputValue.value !== '/help' && inputValue.value !== '/close' && inputValue.value !== '/clear') {
      const lista = document.createElement('ul')
      const text3 = document.createElement('li')
      text3.classList.add('help')
      text3.innerHTML = 'Type /help to see the commands'
      lista.appendChild(text3)
      consola.appendChild(lista)
      consola.scrollTop = consola.scrollHeight
    }
    if (inputValue.value === '/close') {
      document.getElementById('consolechat').style.visibility = 'hidden'
    }
    if (inputValue.value === '/clear') {
      def = 0
      consola.innerHTML = ''
    }
    inputValue.value = ''
  }
}
function submit (e) {
  e = e || window.event
  if (e.keycode === 13 || e.which === 13) {
    scrie()
  }
}
