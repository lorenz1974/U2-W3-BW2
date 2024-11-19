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

    const leftColumnHTML = fetchFunction('./leftColumn.html')
    document.getElementById('leftColumn').innerHTML = (await leftColumnHTML).match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1];

    const centralColumnHTML = fetchFunction('./centralColumn.html')
    document.getElementById('centralColumn').innerHTML = (await centralColumnHTML).match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1];

    const rightColumnHTML = fetchFunction('./rightColumn.html')
    document.getElementById('rightColumn').innerHTML = (await rightColumnHTML).match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1];

    const navbarHTML = fetchFunction('./navbar.html')
    document.getElementsByTagName('footer')[0].innerHTML = (await navbarHTML).match(/<footer[^>]*>([\s\S]*?)<\/footer>/i)[1];

    // TARGET1.addEventListener('click', () => {
    //		  TARGET Clicked
    // })

    // TARGET2.addEventListener('change', () => {
    //		  TARGET Changed
    // })

    // TARGET3.addEventListener('blur', () => {
    //		  TARGET Blurred
    // })



})