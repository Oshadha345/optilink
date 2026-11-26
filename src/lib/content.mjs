// Copy from content/content.md (the single source of truth for wording). Numbers that
// also exist in data.json are rendered from data.json by the section builders instead.

export const HERO = {
  headline: "Talk across the isolation line.",
  sub: "A two-way infrared communicator that lets doctors and patients understand each other in Sinhala, Tamil and English, with no network at all.",
};

export const PROBLEM = {
  title: "Isolated patients are seen less often and suffer more preventable harm",
  intro:
    "In Sri Lankan hospital wards, and especially isolation wards, doctors and patients need to communicate without close contact, often without a shared language and without a reliable network; some patients also cannot speak. No low-cost, offline tool lets them exchange clinical questions, answers and urgent needs reliably from across the room.",
  barriers: [
    ["Distance", "In isolation, every close conversation exposes staff and uses a set of PPE. Masks muffle speech and hide lip movement."],
    ["Language", "Sinhala, Tamil and English are all in daily hospital use, and a doctor and patient often do not share a first language."],
    ["Network", "Many wards, especially in rural hospitals, have weak mobile signal or no Wi-Fi, so app-based tools fail where they are needed most."],
    ["Voice", "Patients with breathing difficulty or after surgery may not speak easily, but can still press a key."],
  ],
  ppeNote: "One isolation entry (gown, gloves, mask) costs about Rs 540–650 in PPE at Sri Lankan retail prices.",
};

export const GAP = {
  title: "No option we found is low-cost, offline, two-way and trilingual",
  statement:
    "Existing options either need close contact, depend on a network or a smartphone, cost far too much, ignore Sinhala and Tamil, or carry no structured clinical content. We found no low-cost, offline device that lets a clinician and a patient exchange structured clinical questions, answers and urgent requests from across a room, each in their own language, with confirmed delivery and an automatic English record.",
  whyNotTitle: "Why not Google Translate or a free AAC app?",
  whyNot:
    "Both are useful, and both support Sinhala and Tamil. At the bedside they still need a phone or tablet per patient, which must be cleaned and charged, and they give no alert, no reply and no record.",
  local: [
    ["Gunawardana et al. (2019)", "built a Sinhala-only Android communication app, tested at Ragama Hospital: one language, one-way, a phone per patient."],
    ["Abesooriya and Rassool (2024, 2025, University of Jaffna)", "describe Sinhala-speaking ward staff defaulting to Sinhala with Tamil-speaking patients."],
    ["Infrared is already accepted in hospital rooms:", "US patent 5,561,412 (Patient/nurse call system) uses infrared transceivers. OptiLink differs by being standalone, trilingual and two-way."],
  ],
};

// Positioning-map tooltips. Entries that map to a row in data.alternatives use that row
// verbatim; the three below are worded only from facts in content.md and the needs matrix.
export const MAP_INFO = {
  OptiLink: {
    strength: "Checked clinical phrases, each person reads their own language, works with no network, about Rs 9,500 per bed.",
    short: "Needs line of sight, uses a fixed vocabulary, and has not yet been tested with patients.",
  },
  "AAC apps and devices": {
    strength: "Built for long-term speech loss; Cboard supports Sinhala and Tamil.",
    short: "One-way: no clinician station, no alert, no reply, no record. A device per bed, and some lack Sinhala or Tamil.",
  },
  "Communication board": {
    strength: "Very low cost, needs no network, and works for a patient who cannot speak.",
    short: "Not usable from across the room; no alert, no confirmed delivery, no checked phrases or English record.",
  },
};
export const MAP_ALT = {
  "Tablet with Translate or video": "Tablet with Google Translate or video call",
  "Walkie-talkie, intercom": "Walkie-talkie, intercom, baby monitor",
  "Talking through glass": "Talking at the bedside or through glass",
  "Wireless call button": "Wireless call button (433 MHz)",
  "Hospital nurse-call": "Hospital nurse-call (Ascom, Rauland, Hillrom)",
};

export const HOW = {
  title: "One message, two languages, no network",
  intro:
    "The two units never send words. They send a short code number for a phrase, and each unit looks that number up in its own memory and shows it in the language chosen on that unit.",
  why: "A message is a few bytes; translation is instant and always identical; Sinhala and Tamil (which small displays cannot draw) are shown as pre-drawn images stored in each unit.",
  phrase: {
    en: "Do you have pain?",
    si: "ඔබට වේදනාවක් තිබේද?",
    ta: "உங்களுக்கு வலி இருக்கிறதா?",
  },
  steps: [
    { doctor: "A Sinhala-speaking doctor, across an isolation room, selects bed 3 and sends “Do you have pain?”", bed: "" },
    { doctor: "", bed: "The Bed Unit beeps twice and shows the question in Tamil, the language chosen on that unit." },
    { doctor: "The screen shows “Delivered”, then the answer, which is added to the report.", bed: "The patient presses 1 (YES)." },
    { doctor: "The doctor runs the pain assessment: location, severity 0–10, duration, constant or not. The report gets one sentence: “Patient has pain in the chest, severity 6/10, for 1–3 days, constant.”", bed: "Each answer sends the next question automatically." },
    { doctor: "The Doctor Station shows “BED 3 REQUEST”. The doctor replies “The nurse will come in 5 minutes”.", bed: "Later the patient presses 7 and sends “Water”. The reply is read in Tamil." },
  ],
  features: [
    ["Questions", "26 in four groups (General, Pain, Symptoms, Care & meds): 21 questions plus 5 instructions with a number."],
    ["Instructions with a number", "Times per day, tablets each time, minutes until the nurse comes, fasting hours, temperature (375 is shown as 37.5)."],
    ["Answer types", "Yes/no, acknowledge, choose one, choose several (body parts), pain 0–10, a number."],
    ["Guided assessments", "New patient, Breathing, Fever, Stomach, plus the pain sequence. Each answer sends the next question automatically; a first NO ends it early; the result is one English sentence."],
    ["Patient requests (7)", "I have pain, Water, Toilet, Can’t breathe (repeating alarm until acknowledged), Feel sick, Call nurse, Call family."],
    ["Typed messages", "English, up to 48 characters, both directions, with 6 ready phrases (THANK YOU, PLEASE WAIT, I WILL COME SOON, CALL THE NURSE, I AM OK, I NEED HELP)."],
    ["Patient report", "Every answer and request as an English sentence, grouped by bed, kept when the unit is switched off, cleared with New patient."],
    ["Several beds", "One Doctor Station talks to up to 14 numbered Bed Units."],
    ["Confirmed delivery", "Delivered / NOT delivered!, automatic retries, link indicator."],
    ["Battery monitor", "Warnings on the unit, and a Bed Unit reports a low battery to the Doctor Station."],
  ],
};

export const USING = {
  title: "Patients answer with one key; doctors work from a short menu",
  switchOn: "Switch on with the red rocker switch, then press 1 Sinhala, 2 Tamil or 3 English. Each unit keeps its own language.",
  doctorMenu: ["Assessments", "Questions", "Instructions", "Patient report", "New patient"],
  sinceNote: "Since firmware 4.6 the Bed Unit uses only 0–9, * and #.",
};

export const COST = {
  title: "A 10-bed OptiLink ward costs about the same as two tablets.",
  atScale: "At scale: the enclosure and PCB are almost half the unit cost (Rs 3,770); injection moulding and panelised PCBs would cut both.",
  tabletRs: 83880,
  tabletEach: 41940,
};

export const MARKET = {
  title: "91,159 public hospital beds, and isolation wards come first",
  items: [
    ["Category", "Low-cost, offline, multilingual bedside communication system, usable from a distance. It sits between AAC devices, nurse-call systems and translation tools. Not a diagnostic device or monitor."],
    ["Users", "Doctors and nurses in isolation and general wards; patients of any language background, including those who cannot speak easily."],
    ["Buyers", "Hospital directors, the Ministry of Health and provincial health services, private hospitals, donors and CSR sponsors."],
    ["First market", "Isolation wards and units; general wards in multilingual districts; rural hospitals with poor connectivity."],
  ],
};

export const TECH = {
  title: "Common parts, a 38 kHz infrared link, and phrase images stored on board",
  intro: "Both units are identical hardware; the firmware sets the role.",
  irTx: "The ATmega’s Timer2 makes a continuous 38 kHz square wave. The serial data line passes through a 74HC04 inverter and a 74HC08 AND gate with that carrier, so the LED flashes at 38 kHz only while a data bit is low, and stays dark otherwise. An S8050 transistor drives the 940 nm LED through a 33 ohm ½ W resistor (about 100 mA pulses). A pull-up keeps the LED off if the processor is removed. The VS1838B receiver strips the carrier and returns clean serial data.",
  frameNote: "A frame is a preamble, a start byte, then 32 bits: destination and source address and frame type (11 bits together), a 1-bit sequence number, a 12-bit phrase ID and a CRC-8 checksum.",
  pcbFacts: [
    "103.3 × 70.1 mm single-sided FR-4, 1.6 mm, 1 oz copper",
    "Tracks and gaps at least 0.5 mm (power 1.0 mm)",
    "155 component holes and 4 M3 mounting holes",
    "8 insulated wire links",
    "KiCad ERC and DRC: 0 violations",
  ],
  pipeline: [
    "Every phrase is written once in a table (English, Sinhala, Tamil, ID, answer type).",
    "A Python tool renders Sinhala and Tamil with proper text shaping (Pillow with libraqm, Noto fonts).",
    "Each rendering becomes a run-length compressed 1-bit image.",
    "Images and an index load into each unit’s 32 KB EEPROM (29,219 bytes, content version 3).",
    "The firmware draws English with its own font and Sinhala or Tamil from the images.",
  ],
  service: "Pressing 9 on the language screen opens firmware version, battery voltage, phrase-memory check, bed number, screen brightness, sleep time, large answer hints, keypad test and a 10-message link test.",
};

export const DESIGN = {
  title: "A wipeable, screwless case that opens without tools",
  facts: [
    ["Enclosure", "OptiLink Lift: three PLA+ parts, in a waisted, hand-friendly shape."],
    ["Parts", "Body 162 × 95 × 32.6 mm, front 162 × 95 × 9.0 mm, battery cover 80 × 43.4 × 8.1 mm. Assembled 162 × 95 × 36 mm."],
    ["Colours", "Body and front blue-grey, cover off-white."],
    ["Screwless", "The front joins the body on a 2 mm seam lip with foam tape on four posts, so it opens without tools. The battery cover clips in with printed parts only, no screws or magnets."],
    ["Openings", "OLED window 35.6 × 20.6 mm, rocker switch, low-battery light, keypad tail slot, IR LED and receiver windows at the top end, buzzer vents."],
    ["Printing", "0.4 mm nozzle, 0.2 mm layers, 4 walls."],
  ],
  packaging: {
    title: "Packaging",
    text: "A matte-black presentation box, lid 315 × 298 × 25 mm, with a wrap-around lid sticker and a QR code to this website.",
    inBox: ["Two OptiLink units", "Battery charger", "Quick guide"],
  },
};

export const SAFETY = {
  title: "A communication aid, with its limits stated plainly",
  items: [
    ["Regulation", "OptiLink is a communication aid. It does not diagnose, treat or monitor. It is a student prototype and not a certified medical device; before any sale the team would confirm its classification with Sri Lanka’s NMRA (Act No. 5 of 2015 sorts devices into Listed, Class I, IIa, IIb and III)."],
    ["Alongside normal care", "It supports, and does not replace, normal care, monitors and the ward’s nurse-call system. Real emergencies still use the call bell."],
    ["Infection control", "Wipeable, screwless case; a clear sleeve per patient, wiped with 70% alcohol between patients."],
    ["Privacy", "No internet or cloud; infrared stays in the room; the report uses bed numbers, not names, and is cleared with New patient."],
  ],
  limitations: [
    "Infrared needs line of sight (handled by acknowledgements, retries and the link indicator).",
    "The vocabulary is fixed.",
    "Patients must be able to read.",
    "Typed messages are English only.",
    "Not yet tested with patients.",
  ],
};

export const TEAM = {
  title: "Three students, one course project",
  course: "EE356 Product Design, Faculty of Engineering, University of Peradeniya, Sri Lanka",
};

export const FAQ = (cfg) => [
  ["Why infrared and not Bluetooth or Wi-Fi?", "No pairing, network or IT setup; no radio near medical equipment; infrared stays inside the room, so messages do not reach other wards; cheap and low-power. The trade-off is line of sight, handled with acknowledgements, retries and a link indicator."],
  ["How can a small screen show Sinhala and Tamil?", "Each phrase is rendered on a PC with proper text shaping and stored as a compressed image; the processor only draws images."],
  ["Why fixed phrases?", "Every phrase can be checked in advance by native speakers and a clinician, and fixed answers become English report sentences automatically. Free English text is still available."],
  ["Can it replace the nurse-call system?", "No. It is an extra channel that supports normal care."],
  ["What is the working distance?", cfg.range || "Being measured."],
  ["How long does the battery last?", cfg.battery || "Being measured."],
  ["Why not Google Translate or a free AAC app?", "Both are useful, and both support Sinhala and Tamil. At the bedside they still need a phone or tablet per patient, which must be cleaned and charged, and they give no alert, no reply and no record."],
];

export const SETUP = {
  steps: [
    "Fit a charged 9 V NiMH battery (49 × 26 × 17 mm) behind the battery cover.",
    "Switch on with the red rocker switch.",
    "Choose a language: 1 Sinhala, 2 Tamil, 3 English. Each unit keeps its own language.",
    "Bed Unit: check its bed number (1–14) in the service menu (press 9 on the language screen).",
    "Doctor Station: choose Questions or Assessments, pick the bed (F3 selects the next bed), and send. Wait for “Delivered”.",
    "Patient: answer with 1 (YES / OK) or 2 (NO); press 7 to ask for help; press # to send.",
    "Hold START (doctor) or * (bed) for 1 second to go home.",
    "Battery: a blinking red light and one beep means LOW (6.4–7.0 V); a steady light and three beeps means CRITICAL (below 6.4 V). Charge the battery in the dual-slot charger.",
  ],
  troubleshooting: [
    ["“NOT delivered!”", "Point the units at each other, keep the IR windows clear, and send again."],
    ["Link indicator low", "Reduce distance or remove obstacles."],
    ["Wrong language", "Hold the home key and choose again from the language screen."],
  ],
};

export const SOURCES = {
  international: [
    ["Divi et al. 2007", "Int J Qual Health Care 19(2):60–67", "Adverse events in patients with limited English"],
    ["Flores 2005", "Med Care Res Rev 62(3):255–299", ""],
    ["Karliner et al. 2007", "Health Serv Res 42(2):727–754", ""],
    ["Happ et al.", "SPEACS: communication with non-speaking ICU patients", ""],
    ["Kirkland and Weinstein 1999", "Lancet 354:1177–1178", "Health-worker entries into contact-isolation rooms"],
    ["Saint et al. 2003", "Am J Infect Control 31(6)", ""],
    ["Stelfox et al. 2003", "JAMA 290:1899–1905", "Adverse events and complaints among isolated patients"],
    ["Morgan et al. 2009", "Am J Infect Control 37:85–93", ""],
  ],
  srilanka: [
    ["Ranasinghe et al. 2016", "", "Survey of 753 Sinhalese doctors on Tamil and second-language barriers"],
    ["Abesooriya and Rassool 2024, 2025", "University of Jaffna", "Language use between ward staff and patients"],
    ["Gunawardana et al. 2019", "", "Sinhala-only Android communication app tested at Ragama Hospital"],
    ["Department of Census and Statistics", "Census 2012 and Census 2024", "Share of mainly Tamil-speaking communities"],
    ["Ministry of Health", "Annual Health Bulletin 2024", "Public hospital and bed counts"],
    ["NMRA Act No. 5 of 2015", "", "Medical device classification"],
    ["US Patent 5,561,412", "Patient/nurse call system", "Infrared transceivers in a hospital room"],
  ],
  prices: ["Daraz.lk", "Tronic.lk", "Duino.lk", "LakSafety", "HuMed.lk", "Healthguard.lk", "Vendor sites"],
};
