// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

const populateMyPlaylist = async (list) => {
    _W(`populateMyPlaylist - list: `, list)
    playlistsMegaArray.length = 0

    list.forEach(async (id) => {
        try {
            playlistsMegaArray.push(
                await fetchFunction(TRACK_URL + id)
            )
        } catch (error) {
            _W(error)
        }
    })

    _D(1, playlistsMegaArray,)
    // const data = await Promise.all(
    //     list.map((id) => {
    //         let usingURL = TRACK_URL + id
    //         return fetchFunction(usingURL)
    //     })
    // )
    // playlistsMegaArray.push(...data)

}


const populateMyLibrary = async () => {
    libraryArray.length = 0
    const data = await Promise.all(
        myLibraryID.map((id) => {
            let usingURL = ALBUM_URL + id
            return fetchFunction(usingURL)
        })
    )
    libraryArray.push(...data)

    _D(3, libraryArray,)
}


const drawPlaylistsLinks = () => {
    let playListsLiHTML = ''
    playlistsArray
        .filter((playlist) => playlist.playlistSpotify === false)
        .forEach((playlist) => {

            playListsLiHTML += `
            <li>
                <p id="playList-${playlist.playlistName.replace(' ', '')}" class="btn p-0 me-2 text-body-secondary fw-normal text-truncate">
                    ${playlist.playlistName}
                </p>
            </li>
        `})

    document.getElementById('playlists-list').innerHTML = playListsLiHTML
}


const drawOurLibrary = (albumsArray) => {
    let playlistCardsHTML = ''
    albumsArray.forEach((album) => {
        playlistCardsHTML += `
        <div class="col">
          <div id="album-${album.id}" class="card bg-body-tertiary rounded">
            <div class="card-body d-flex align-items-center">
              <img id="albumImage-${album.id}"
                src="${album.cover}"
                class="me-3 rounded"
                alt="Album Cover"
                style="width: 70px; height: 70px; object-fit: cover;"
              />
              <div>
                <h5 id="albumTitle-${album.id}" class="card-title mb-0">${album.artist.name}</h5>
                <p id="albumText-${album.id}" class="card-text text-muted">${album.title}</p>
              </div>
            </div>
          </div>
        </div>
        `
    })
    document.getElementById('ourPlayListsSection').innerHTML = playlistCardsHTML
}



//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

// Targhettizzo l'informazione inserita nel form per la ricerca
const queryInput = document.getElementById('query')

// Targhettizzo il form per prevenire anche la gestione di default del submit che mi resetterebbe i campi
const form = document.getElementById('columnForm')

//   ed inizializzo l'array fuori dalla funzione di ricerca
const queryArray = []

// metto l'URL all'interno di una costante per poter essere più facilmente utilizzato
const SEARCH_URL =
    'https://striveschool-api.herokuapp.com/api/deezer/search?q='

// qui gestisco la mia libreria
const myLibraryID = [
    726319, 1236002, 119282, 1316047, 1318764, 113578, 59853992, 401032,
    9884672, 116670,
]



//   targhettizzo il link nella colonna sinistra che mi possa condividere l'array di album
let libraryArray = []
let playlistsMegaArray = []
const ALBUM_URL = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
const TRACK_URL = 'https://striveschool-api.herokuapp.com/api/deezer/track/'


//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

document.addEventListener('DOMContentLoaded', async () => {

    const [leftColumnHTML, centralColumnHTML, rightColumnHTML, navbarHTML] = await Promise.all([
        fetchFunction('./leftColumn.html'),
        fetchFunction('./centralColumn.html'),
        fetchFunction('./rightColumn.html'),
        fetchFunction('./navbar.html')
    ]);

    document.getElementById('leftColumn').innerHTML = leftColumnHTML.match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1];
    document.getElementById('centralColumn').innerHTML = centralColumnHTML.match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1];
    document.getElementById('rightColumn').innerHTML = rightColumnHTML.match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1];
    document.getElementsByTagName('footer')[0].innerHTML = navbarHTML.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i)[1];

    drawPlaylistsLinks()

    document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
        const target = e.target.id
        _D(3, `event is:`, e)

        const targetType = target.split('-')[0]
        _D(1, `targetType is: ${targetType}`)

        const targetObject = target.split('-')[1]
        _D(1, `targetObject is: ${targetObject}`)

        switch (targetType) {
            case 'playlist': {
                drawPlaylist(targetObject)
                break
            }

            case 'playPlayList':
            case 'playListPauseControl':
            case 'playListPlayControl': {
                //playPlayList(targetObject)
                document.querySelectorAll('i[id*="playListPauseControl"]').forEach((element) => {
                    element.classList.add('d-none')
                })

                document.querySelectorAll('i[id*="playListPlayControl"]').forEach((element) => {
                    element.classList.remove('d-none')
                })

                document.getElementById('playListPauseControl-' + targetObject).classList.toggle('d-none')
                document.getElementById('playListPlayControl-' + targetObject).classList.toggle('d-none')

                _W('Manda in play la playlist: ' + targetObject)
                break
            }

            case 'playList': {
                const tracksPlaylistArray =
                    playlistsArray.
                        filter((playlist) => playlist.playlistName.replace(' ', '') === targetObject)[0].playlistTracks
                populateMyPlaylist(tracksPlaylistArray)
                drawPlaylist(targetObject)
                break
            }

            case 'play': {
                playTrack(targetObject)
                break
            }

            case 'album':
            case 'albumImage':
            case 'albumTitle':
            case 'albumText':
                {
                    drawAlbum(targetObject)
                    _W('Visualizza album: ' + targetObject)
                    break
                }

            case 'artist':
            case 'artistName':
                {
                    drawArtist(targetObject)
                    break
                }

            case 'libraryLink': {
                document.getElementById('switchTitle').innerText = 'La tua libreria'
                document.getElementById('ourPlayListsSection').innerHTML = ''
                populateMyLibrary().then(() => {
                    console.log('libraryArray:', libraryArray)
                    drawOurLibrary(libraryArray)
                })
            }

            default: { break }
        }
    }, true)

    // TARGET3.addEventListener('blur', () => {
    //		  TARGET Blurred
    // })



})