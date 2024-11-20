const playlistsArray = [
  {
    playlistName: "Lollo playlist",
    playlistSpotify: false,
    playlistTracks: [
      2621330942, 81160512, 69865229, 83473950, 81160302, 2066613247,
      2066613177, 81160388, 98763040, 81160468,
    ],
    playlistImg:
      "https://www.cucchiaio.it/content/cucchiaio/it/ricette/2021/06/gin-tonic/_jcr_content/header-par/image-single.img.jpg/1624435073277.jpg",
  },
  {
    playlistName: "Queen playlist",
    playlistSpotify: false,
    playlistTracks: [
      12206946, 12209331, 67503808, 7868649, 12274786, 7179758, 7868650,
      12206933, 7179759, 6820130, 7179764, 7868652, 67503795, 7856457,
    ],
    playlistImg:
      "https://www.ondarock.it/images/monografie/queen_1_1342800837.jpg",
  },
  {
    playlistName: "Capodanno playlist",
    playlistSpotify: false,
    playlistTracks: [
      1584700062, 1584699932, 2036620, 98538214, 1584699772, 1584700052,
      649738942, 1584699962, 1584699832, 1584700012, 1584700042, 1584699752,
    ],
    playlistImg:
      "https://www.nutrizionistasantini.it/wp-content/uploads/2023/12/anno-nuovo-sfondo-con-bicchieri-di-champagne-1024x683.jpg",
  },
  {
    playlistName: "Natale playlist",
    playlistSpotify: false,
    playlistTracks: [
      583177, 2525786021, 46026641, 1768442, 62835702, 135872042, 913873,
      420966182, 2876330482, 531746301, 1590131392,
    ],
    playlistImg:
      "https://static.vecteezy.com/ti/vettori-gratis/p1/4804427-buon-natale-saluto-testo-sfondo-design-natale-pino-elemento-con-colorati-ornamenti-natalizi-per-feste-stagione-decorazione-in-sfondo-verde-illustrazione-vettoriale.jpg",
  },
  {
    playlistName: "Sanremo playlist",
    playlistSpotify: false,
    playlistTracks: [
      774808482, 3003875331, 1575123302, 16739710, 2268734907, 1628347282,
      2438505425, 2274690477,
    ],
    playlistImg:
      "https://www.rai.it/cropgd/800x400/dl/img/2024/08/19/1724072652011_sanremo-generico-2_slide.jpg",
  },
  {
    playlistName: "Pippo playlist",
    playlistSpotify: false,
    playlistTracks: [
      774808483, 3003875334, 1575123307, 16739718, 2268734904, 1628347281,
      2438505423, 2274690479,
    ],
    playlistImg:
      "https://static.nexilia.it/indiscreto/2014/08/pippo-franco-che-fico.jpg",
  },
  {
    playlistName: "Island Pop",
    playlistSpotify: true,
    playlistTracks: [
      6113110, 74568936, 775788292, 1829935537, 2582341422, 527505891,
      503133452, 2836373892, 1670556602, 86956185, 962245972, 1344305982,
      527505901, 527505911, 1858274097, 1723330727, 122506960, 2413630085,
      2068438117, 106751068, 3576408,
    ],
  },
  {
    playlistName: "Sleep playlist",
    playlistSpotify: true,
    playlistTracks: [
      2064585957, 2134778427, 1405911322, 2134778517, 15176223, 2659588462,
      757235112, 2134778507, 2134778527, 2134778447, 2134778417, 664355352,
      3115574, 2115084097, 2134778437, 142246903, 445804582, 1592020141,
      2075417807,
    ],
  },
  {
    playlistName: "Stress Relief",
    playlistSpotify: true,
    playlistTracks: [
      2675212382, 525948612, 1664120082, 2012733657, 2267672507, 539350272,
      2937597701, 426097712, 525952762, 1214645302, 65521012, 2253876307,
      448015772, 1422313652, 464047792, 133568372, 552092902, 103744576,
      2270221717, 534285582, 1153321862, 349936771, 2224694087,
    ],
  },
  {
    playlistName: "Soul Lounge",
    playlistSpotify: true,
    playlistTracks: [
      2270304337, 1678459427, 62141673, 62141667, 1594486171, 62141688,
      1622269312, 2350777365, 62141681, 62141679, 62141686, 62141675, 916800252,
      1008808632, 1008808742, 1008808642, 132560854, 6189048, 585868092,
    ],
  },
  {
    playlistName: "Deep Focus",
    playlistSpotify: true,
    playlistTracks: [
      426097602, 119198234, 2724213712, 2894805531, 2517123641, 2523920421,
      688711182, 2968984951, 466443892, 2531187451, 2609821202, 1120664522,
      812342242, 2609821192, 406278622, 2609821242, 1776553607, 2609821232,
      1240858302, 1240858312, 1240858292, 2609821212, 2609821272, 2174999577,
      2609821182,
    ],
  },
  {
    playlistName: "Peacefull Guitar",
    playlistSpotify: true,
    playlistTracks: [963180662, 1678404717],
  },
];
const buonseraTab = document.getElementById("buonasera");
const playlistMobile = document.getElementById("playListsSection");

playlistsArray.forEach((playlist) => {
  if (playlist.playlistSpotify === false) {
    const playlistCard = document.createElement("div");
    playlistCard.className = "col";

    playlistCard.innerHTML = `
      <div class="card bg-body-tertiary rounded">
        <div class="card-body d-flex align-items-center">
           <img 
            src="${playlist.playlistImg}" 
            class="me-3 rounded" 
            alt="Playlist Cover" 
            style="width: 70px; height: 70px; object-fit: cover;"
          />
          <div>
            <h5 class="card-title mb-0">${playlist.playlistName}</h5>
            <p class="card-text text-muted">${playlist.playlistTracks.length} brani</p>
          </div>
        </div>
      </div>
    `;

    buonseraTab.appendChild(playlistCard);
  }
});

playlistsArray.forEach((playlist) => {
  if (playlist.playlistSpotify === true) {
    const playlistCardMobile = document.createElement("div");
    playlistCardMobile.className = "col";

    playlistCardMobile.innerHTML = `
         <div
          class="card mb-3 border-0"
          style="
            background: rgb(0, 0, 0);
            background: linear-gradient(
              342deg,
              rgba(0, 0, 0, 1) 38%,
              rgba(156, 152, 152, 1) 100%
            );
          "
        >
          <div class="row g-0">
            <div class="col-4">
              <img
                id="playlistImgHome"
                src=""
                class="img-fluid p-4"
                alt="..."
              />
            </div>
            <div class="col-8">
              <div class="card-body">
                <p class="mb-1 text-secondary">Playlist</p>
                <h2 id="playListNameHome" class="card-title fs-1">${playlist.playlistName}</h2>
              </div>
            </div>

            <div>
              <!-- card bottom -->
              <div
                class="container d-flex justify-content-between align-items-center mb-3"
              >
                <div class="d-flex justify-content-start align-content-center">
                  <!-- CUORE -->
                  <div class="text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
                    </svg>
                  </div>

                  <!-- PUNTINI -->
                  <div class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                      />
                    </svg>
                  </div>
                </div>
                <!-- BRANI E PLAY -->
                <div>
                  <div class="d-inline-block">
                    <p class="p-0 m-0 me-2 text-nowrap">${playlist.playlistTracks.length} brani</p>
                  </div>

                  <button
                    class="d-inline-block rounded-circle p-2 border-0"
                    style="background-color: #272822"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
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
          </div>
        </div>
        `;

    playlistMobile.appendChild(playlistCardMobile);
  }
});

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

document.addEventListener("DOMContentLoaded", async () => {
  // DOM Loaded
  // TARGET1.addEventListener('click', () => {
  //		  TARGET Clicked
  // })
  // TARGET2.addEventListener('change', () => {
  //		  TARGET Changed
  // })
  // TARGET3.addEventListener('blur', () => {
  //		  TARGET Blurred
  // })
});
