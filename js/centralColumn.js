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

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchSfogliaTutto');
    const playListsSearch = document.getElementById('playListsSearch');
    const bigHeader = document.getElementById('bigHeader');
    const ultraBigSection = document.getElementById('ultraBigSection');
    const closeButton = document.getElementById('closeButton');

    playListsSearch.style.display = 'none';

    searchButton.addEventListener('click', function(event) {
        
        event.preventDefault();

        playListsSearch.style.display = 'block';
        bigHeader.style.display = 'none';
        ultraBigSection.style.display = 'none';
    });

    closeButton.addEventListener("click", function () {

        playListsSearch.style.display = 'none';
        bigHeader.style.display = 'block';
        ultraBigSection.style.display = 'block';
    })
});