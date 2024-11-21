const drawAlbum = async (targetObject) => {
  try {
    const albumData = await fetchFunction(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${targetObject}`
    )

    let albumHTML = `
        <section class="d-none d-md-block">
        <!-- barra con bottoni e utente -->
        <div
          class="d-flex justify-content-between align-items-center mt-2 mb-1 ms-2 me-2"
        >
          <!-- div con bottoni -->
          <div class="d-flex justify-content-start align-content-center">
            <button
              class="d-inline-block rounded-circle border-0 me-3 ps-1"
              style="background-color: #000000"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                fill="currentColor"
                class="bi bi-chevron-left rounded-circle mb-1"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </button>
            <!-- freccia destra -->
            <button
              class="d-inline-block rounded-circle border-0 me-3 pe-1"
              style="background-color: #000000"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                fill="currentColor"
                class="bi bi-chevron-left rounded-circle mb-1"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </button>
          </div>
          <!-- div con utente -->
          <div>
            <div class="dropdown">
              <a
                class="btn rounded-pill btn-dark dropdown-toggle ps-0 pt-0 pb-0"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="./assets/imgs/main/image-1.jpg"
                  alt=""
                  class="img-fluid rounded-circle"
                  style="width: 30px"
                />
                Utente
              </a>

              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
            `

    albumHTML += `
            <section id="albumInfo">
                <div class="row">
                    <div
                        class="col-12 col-md-5 p-4 pb-md-0 text-center position-relative mb-1"
                    >
                        <!-- freccia torna in home -->
                        <!-- va aggiunto uno sfondo al div capire se è fattibile usare il tool di Stefano -->
                        <button class="border-0 bg-transparent d-md-none">
                            <a class="text-light" href="centralColumn.html">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    fill="currentColor"
                                    class="bi bi-arrow-lef me-3 position-absolute"
                                    style="left: 20px; top: 25px"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                    />
                                </svg>
                            </a>
                        </button>
                        <!-- copertina -->
                        <img id="albumCover" src="${
                          albumData.cover_medium
                        }" alt="" />
                    </div>
                    <div class="col-12 col-md-7 p-md-4 pb-md-0">
                        <!-- info album -->
                        <div class="ps-4 ps-md-0">
                            <p class="fw-semibold d-none d-md-block mb-1 fs-6 mt-2">ALBUM</p>
                            <h1 id="albumName" class="pb-2 pb-md-5">${
                              albumData.title
                            }</h1>
                            <img
                                id="artistPic"
                                src="${
                                  albumData.contributors[0].picture_medium
                                }"
                                alt=""
                                class="img-fluid rounded-circle d-inline-block me-2"
                                style="width: 30px"
                            />
                            <h6 id="artistName-${
                              albumData.contributors[0].id
                            }" class="d-inline-block mb-3 mb-md-4 mt-md-5">
                                ${albumData.contributors[0].name}
                            </h6>
                            <p class="fw-semibold mb-4">
                                Anno di uscita:
                                <span id="albumYear" class="fw-semibold">${albumData.release_date.slice(
                                  0,
                                  4
                                )}</span> ·
                                <span class="d-none d-md-inline-block" id="numberOfSongs"
                                > Numero tracce: ${
                                  albumData.nb_tracks
                                } · </span>
                                <span class="d-none d-md-inline-block" id="duration"
                                > Durata: ${formatDuration(
                                  albumData.duration
                                )} Minuti</span>
                            </p>
                        </div>
                    </div>
                </div>
      </section >

      <section id="songList" class="container mt-4">
      `

    albumHTML += `
              <section id="icone" class="container mb-3">
        <!-- icone mobile -->
        <div
          class="container mt-4 mb-5 d-flex justify-content-between align-content-center position-relative d-md-none"
        >
          <div>
            <!-- cuore -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-heart d-inline-block me-4"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
              />
            </svg>
            <!-- download -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-down-circle d-inline-block me-4"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
              />
            </svg>
            <!-- puntini -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-three-dots-vertical d-inline-block"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
              />
            </svg>
          </div>
          <div>
            <!-- random e play -->
            <div
              class="position-absolute"
              style="top: 0px; bottom: 5px; right: 80px"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-shuffle d-inline-block"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
                />
                <path
                  d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"
                />
              </svg>
            </div>
            <!-- play -->
            <div
              class="position-absolute"
              style="top: -20px; bottom: 5px; right: -10px"
            >
              <button
                class="d-inline-block rounded-circle p-3 border-0 bg-success"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-play-fill rounded-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- icone desktop -->
        <div class="mt-4 d-md-block d-none">
          <!-- play -->
          <div class="d-inline-block">
            <button
              class="d-inline-block rounded-circle p-2 mb-2 border-0 bg-spotify mt-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="black"
                class="bi bi-play-fill rounded-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                />
              </svg>
            </button>
          </div>
          <div class="d-inline-block ms-3">
            <!-- cuore -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-heart me-4"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
              />
            </svg>
          </div>
          <div class="d-inline-block">
            <!-- download -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-down-circle d-inline-block me-4"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
              />
            </svg>
          </div>
          <div class="d-inline-block">
            <!-- puntini -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
              />
            </svg>
          </div>
        </div>
      </section>

            <section class="container d-none d-md-block" id="songHeading">
        <!-- brani  -->
        <!-- intestazione desktop -->
        <div class="row g-0 d-none d-md-flex ms-2 me-2 mb-0">
          <div class="col col-1">
            <p class="mb-0">#</p>
          </div>

          <div class="col col-6">
            <p class="mb-0">TITOLO</p>
          </div>

          <div class="col-3 text-end">
            <p class="mb-0">RIPRODUZIONI</p>
          </div>

          <div class="col col-2 text-end mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clock"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
              />
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
              />
            </svg>
          </div>
        </div>
        <hr class="mt-1" />
      </section>
        `

    albumData.tracks.data.forEach((track, index) => {
      trackHTML = `
            <div class="row g-0 ms-2 me-2 mb-0">
                <div class="col col-1 d-none d-md-block">
                    <p id="songNumber" class="mt-2 mb-0">${index + 1}</p>
                </div>

                <div
                    class="col col-10 col-md-6 d-flex flex-column align-content-center justify-content-center"
                >
                    <p id="songNameList" class="mb-0 fw-bold">${
                      track.title_short
                    }</p>
                    <p id="artistNameList" class="fs-7">${track.artist.name}</p>
                </div>

                <div class="col-3 text-end d-none d-md-block">
                    <p id="playedCounter" class="mb-0 mt-2">${track.id.toLocaleString(
                      'it-IT'
                    )}</p>
                </div>

                <div class="col col-2 text-end mb-0 d-none d-md-block">
                    <p id="songDurationList" class="mb-0 mt-2">${formatDuration(
                      track.duration
                    )}</p>
                </div>
                <div class="col col-2 text-end mb-0 mt-2 d-md-none">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-three-dots-vertical d-inline-block"
                    viewBox="0 0 16 16"
                    >
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                    />
                    </svg>
                </div>
                </div>
                `
      albumHTML += trackHTML
    })

    albumHTML += `
            </section>
            `

    document.getElementById('centralColumn').innerHTML = albumHTML
  } catch (error) {
    console.log(error)
  }
}
