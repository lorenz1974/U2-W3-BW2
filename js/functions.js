// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

// esegue il fect delle API
const fetchFunction = async (fetchUrl, method, headersObj, bodyObject) => {
  try {
    // Debug iniziale
    const debugFetchingMessage = `fetching: ${fetchUrl}`
    _D(1, debugFetchingMessage)

    let fetchObj = {}

    // Configurazione dell'oggetto fetch
    if (method === 'GET' || method === 'DELETE') {
      fetchObj = {
        method: method,
        headers: new Headers(headersObj),
      }
    } else {
      fetchObj = {
        method: method,
        headers: new Headers(headersObj),
        body: JSON.stringify(bodyObject),
      }
    }

    // Lancia il fetch
    const response = await fetch(fetchUrl, fetchObj)

    // Controllo dello stato della risposta
    if (!response.ok) {
      const errorMessage = `Errore nella response dal server: ${response.statusText}`
      _D(1, errorMessage, 'fetchFunction - responseError')
      sendAnAlert(errorMessage, 'danger')
      throw new Error(errorMessage)
    }

    // Determina il tipo di contenuto dalla risposta
    const contentType = response.headers.get('content-type')
    const debugContentTypeMessage = `Content-Type: ${contentType}`
    _D(2, debugContentTypeMessage)

    let parsedResponse

    if (contentType.includes('application/json')) {
      parsedResponse = await response.json()
      const debugJSONMessage = 'fetchFunction - responseJSON'
      _D(3, parsedResponse, debugJSONMessage)
    } else if (
      contentType.includes('text/html') ||
      contentType.includes('text/plain')
    ) {
      parsedResponse = await response.text()
      const debugTextMessage = 'fetchFunction - responseText'
      _D(3, parsedResponse, debugTextMessage)
    } else if (
      contentType.includes('application/octet-stream') ||
      contentType.includes('image/')
    ) {
      parsedResponse = await response.blob()
      const debugBlobMessage = 'fetchFunction - responseBlob'
      _D(3, parsedResponse, debugBlobMessage)
    } else {
      // Default: restituisci direttamente lo stream binario
      parsedResponse = await response.arrayBuffer()
      const debugBufferMessage = 'fetchFunction - responseArrayBuffer'
      _D(3, parsedResponse, debugBufferMessage)
    }

    return parsedResponse
  } catch (error) {
    const catchErrorMessage = `fetchFunction - Errore nel fetching dei dati: ${error.message}`
    _D(1, catchErrorMessage, 'fetchFunction - catchError')
    sendAnAlert(catchErrorMessage, 'danger')
    throw new Error(catchErrorMessage)
  }
}

// Ricerca un parametro dell'URL
const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search)
  const paramValue = urlParams.get(param)

  _D(2, `url param '${param}': ${paramValue}`)

  return paramValue ? paramValue.trim() : null
}

// Action può essere:
// - 'check' per controllare l'autenticazione
// - 'logon' per autenticare l'utente
// - 'logoff' per deautenticare l'utente
const userAutentication = (action) => {
  switch (action) {
    case 'check': {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated')
      if (parseInt(isAuthenticated) === 1) {
        return true
      } else {
        return false
      }
    }
    case 'logon': {
      sessionStorage.setItem('isAuthenticated', 1)
      return true
    }
    case 'logoff': {
      sessionStorage.setItem('isAuthenticated', '')
      return true
    }
    default: {
      return false
    }
  }
}

const applySearchFilter = async () => {
  try {
    // Esegui il fetch
    apiItemsArray = await fetchFunction(
      fetchUrl,
      method,
      headersObj,
      bodyObject
    )
    _D(3, apiItemsArray, 'applySearchFilter - apiItemsArray')
  } catch (error) {
    // Gestione degli errori nel fetching
    sendAnAlert(
      `applySearchFilter - Errore durante il fetch dei dati: ${error.message}`,
      'danger'
    )
    throw new Error(
      "Errore durante il recupero dei dati con l'operazione di fetching."
    )
  }

  // Recupera il parametro di ricerca
  const search = getUrlParam('search')
  _D(1, `search: ${search}`)

  // Converte il termine di ricerca in minuscolo se esiste
  const searchLower = search ? search.toLowerCase() : ''

  // Verifica se la ricerca estesa è attiva
  const extensiveSearch = getUrlParam('extensiveSearch') === '1'

  // Applica il filtro
  apiItemsArray = apiItemsArray.filter((item) => {
    // Controlla se il termine di ricerca corrisponde a uno dei campi
    const matchesSearch =
      !search ||
      item._id.includes(search) ||
      item.name.toLowerCase().includes(searchLower) ||
      item.brand.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)

    // Controlla se il brand non include "user"
    const excludesUserBrand = !item.brand.toLowerCase().includes('user')

    // Filtra in base alla modalità di ricerca
    return extensiveSearch ? matchesSearch : matchesSearch && excludesUserBrand
  })

  // Aggiorna il campo di ricerca per migliorare la UX
  if (search) {
    const searchInput = document.getElementById('searchInput')
    if (searchInput) {
      searchInput.value = search
    }
  }
}

// Funzione che manda messaggi all'utente
const sendAnAlert = (message, level) => {
  document.getElementById('alertMessage').innerHTML = message
  document.getElementById('alertMessage').classList.add(`alert-${level}`)
  document.getElementById('alertMessage').classList.toggle('d-none')
}

// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

debugLevel = 3

//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

// Funzione che attacca l'eventListener al form di ricerca
// document.getElementById('searchDiv').addEventListener('submit', (e) => {
//     e.preventDefault()
// })
