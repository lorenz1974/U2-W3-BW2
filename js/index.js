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