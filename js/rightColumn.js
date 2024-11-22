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

  openButton.addEventListener("click", function () {
    introduction.style.display = "none"
    finestra.style.display = "block"
  })

  closeButton.addEventListener("click", function () {
    finestra.style.display = "none"
    serchFriends.style.display = "none"
    introduction.style.display = "flex"
  })

  aggiungiAmici.addEventListener("click", function () {
    serchFriends.style.display = "block"
  })

  closeserchFriends.addEventListener("click", function () {
    serchFriends.style.display = "none"
  })
}, 500)
