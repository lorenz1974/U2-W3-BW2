// ***********************************************************************//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//



//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//



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

            default: { break }
        }
    }, true)

    // TARGET3.addEventListener('blur', () => {
    //		  TARGET Blurred
    // })



})