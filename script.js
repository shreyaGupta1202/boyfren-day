/* The event's IST calendar date. */
const EVENT_DATE = "2026-10-03";
const EVENT_TIME_ZONE = "Asia/Kolkata";

/* Keep/edit every itinerary item here. Start time uses 24-hour IST time. */
const ITINERARY = [
  {
    time: "10:00 AM–10:30 AM", start: "10:00", place: "BB’s Residence",
    description: "Present time! And seeing you baby in all her gorgeousness.",
    unlockedText: "Surprise unlocked ✦",
    map: "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiIgfCjxJmXAxUAAAAAHQAAAAAQBQ..i&udm&fvr=1&pvq=Cg0vZy8xMWo4azNfZ3hzIhYKEGVtYmFzc3kgcHJpc3RpbmUQAhgD&lqi=ChBlbWJhc3N5IHByaXN0aW5lSJj3_pGisICACFoaEAAQARgAGAEiEGVtYmFzc3kgcHJpc3RpbmU&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3bae1398fd2d8129:0x2d4db826ac1a5586"
  },
  {
    time: "11:15 AM–12:30 PM", start: "11:15", place: "Escape Room",
    description: "Time to solve a murder mystery together.",
    unlockedText: "Mystery unlocked",
    map: "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KTvO1NdpFK47MTYgDSzsbAna&daddr=27,+NMR+Building,+1st+floor+Intermediate+Ring+Road,+100+Feet+Rd,+Koramangala,+Bengaluru,+Karnataka+560047"
  },
  {
    time: "1:00 PM–2:00 PM", start: "13:00", place: "1BHK Restaurant",
    description: "A table, a meal, and my favourite company.",
    unlockedText: "Surprise unlocked ✦",
    map: "https://www.google.com/maps/dir//1+Bar+House+Kitchen+(1BHK),+56,+Raj+villa,+5th+cross,+60+Feet+Rd,+6th+Block,+Koramangala,+Bengaluru,+Karnataka+560095/@12.9366662,77.6650655,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae158d73e7c9f3:0xa5827f4ece2bf43!2m2!1d77.6211321!2d12.9365488?entry=ttu&g_ep=EgoyMDI2MDkyOC4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    time: "2:00 PM–6:00 PM", start: "14:00", place: "Loco Bear",
    description: "Girl, you ain't beating me in bowling and go karting.",
    unlockedText: "Adventure unlocked",
    map: "https://www.google.com/maps/dir//Loco+Bear+-+The+Ultimate+Entertainment+Hub,+Jakkasandra+Extension,+1st+Block+Koramangala,+Koramangala,+Bengaluru,+Karnataka+560034/@12.9366662,77.6650655,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bae153659ea5543:0x67f16fe1c49ebfe5!2m2!1d77.6402395!2d12.9273936?entry=ttu&g_ep=EgoyMDI2MDkyOC4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    time: "7:00 PM–10:00 PM", start: "19:00", place: "Ssaffron by Shangri-La",
    description: "Trying to act posh while stuffing our faces with food.",
    unlockedText: "Hungry Mode unlocked",
    map: "https://www.google.com/maps/dir//Ssaffron,+Level+18,+Shangri-La,+56-6B,+Palace+Rd,+Abshot+Layout,+Vasanth+Nagar,+Bengaluru,+Karnataka+560001/@12.9366662,77.6650655,15z/data=!m3!4b1!5s0x3bae16410e686591:0xc9365bd58488b48b!4m8!4m7!1m0!1m5!1m1!1s0x3bae176b49ddef5d:0x51e05309fce95503!2m2!1d77.5882445!2d12.991968?entry=ttu&g_ep=EgoyMDI2MDkyOC4wIKXMDSoASAFQAw%3D%3D"
  }
];

const cards = document.querySelector("#itineraryCards");
const eventDateIsValid = /^\d{4}-\d{2}-\d{2}$/.test(EVENT_DATE);

function eventTimestamp(startTime) {
  const [year, month, day] = EVENT_DATE.split("-").map(Number);
  const [hour, minute] = startTime.split(":").map(Number);
  // Asia/Kolkata has a permanent +05:30 offset. Constructing from UTC means the
  // result stays correct even when the visitor's device timezone is not IST.
  return Date.UTC(year, month - 1, day, hour, minute) - (5.5 * 60 * 60 * 1000);
}

function formatUnlockTime(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: EVENT_TIME_ZONE, hour: "numeric", minute: "2-digit", hour12: true
  }).format(new Date(timestamp));
}

function cardMarkup(item, index) {
  const unlockAt = eventDateIsValid ? eventTimestamp(item.start) - (60 * 60 * 1000) : null;
  const unlocked = unlockAt !== null && Date.now() >= unlockAt;
  const note = !eventDateIsValid
    ? "Unlock time will appear when the event date is set."
    : unlocked ? item.unlockedText : `Unlocks at ${formatUnlockTime(unlockAt)}`;
  return `<article class="itinerary-card ${unlocked ? "is-unlocked" : "is-locked"}" data-unlock-at="${unlockAt ?? ""}">
    <div class="card-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
    <div class="card-content">
      <time class="card-time">${item.time}</time>
      <div class="card-details">
        <h3 class="place-name">${item.place}</h3>
        <a class="map-link" href="${item.map}" target="_blank" rel="noopener noreferrer" aria-label="Open ${item.place} in Google Maps">→</a>
      </div>
      <p class="card-description">${item.description}</p>
      <p class="unlock-note">${note}</p>
    </div>
  </article>`;
}

function renderItinerary() {
  cards.innerHTML = ITINERARY.map(cardMarkup).join("");
}

function refreshUnlocks() {
  if (!eventDateIsValid) return;
  const now = Date.now();
  document.querySelectorAll(".itinerary-card").forEach((card) => {
    const unlockAt = Number(card.dataset.unlockAt);
    if (now >= unlockAt && card.classList.contains("is-locked")) {
      card.classList.replace("is-locked", "is-unlocked");
      card.querySelector(".unlock-note").textContent = ITINERARY[Number(card.querySelector(".card-number").textContent) - 1].unlockedText;
    }
  });
}

renderItinerary();
refreshUnlocks();
setInterval(refreshUnlocks, 15 * 1000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshUnlocks(); });
window.addEventListener("focus", refreshUnlocks);
