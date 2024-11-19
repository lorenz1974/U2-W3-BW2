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

setTimeout(() => {
    const closeserchFriends = document.getElementById("closeserchFriends")
    const serchFriends = document.getElementById("serchFriends")
    const aggiungiAmici = document.getElementById("aggiungiAmici")
    const openButton = document.getElementById("openButton")
    const closeButton = document.getElementById("closeButton")
    const finestra = document.getElementById("finestra")
    const introduction = document.getElementById("introduction")
    
  serchFriends.style.display = "none"
  finestra.style.display = "none"
  introduction.style.display = "flex"

  openButton.addEventListener("click", function () {
    finestra.style.display = "block"
    introduction.style.display = "none"
  })

  closeButton.addEventListener("click", function () {
    finestra.style.display = "none"
    introduction.style.display = "flex"
    serchFriends.style.display = "none"
  })

  aggiungiAmici.addEventListener("click", function () {
    serchFriends.style.display = "block"
  })

  closeserchFriends.addEventListener("click", function () {
    serchFriends.style.display = "none"
  })
}, 500)
