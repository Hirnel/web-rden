import React, { useState, Fragment } from "react";
import "../../../../styles/components/_Calendario.scss";

/* 11 nombres de día por semana */
const DAY_NAMES = [
  "Hirnelis",
  "Ohhis",
  "Shirglis",
  "Nerkhis",
  "Aeris",
  "Aquaris",
  "Terris",
  "Pyros",
  "Sanguis",
  "Vacios",
  "Animas",
];

/* Estaciones (el año empieza en Verano día 1) */
const SEASONS = [
  {
    key: "verano",
    label: "Verano",
    days: 99,
    weeks: 9,
    festivoStart: { day: 1, mark: "Ascensión" },
  },
  { key: "otono", label: "Otoño", days: 88, weeks: 8 },
  {
    key: "invierno",
    label: "Invierno",
    days: 88,
    weeks: 8,
    festivoEnd: { day: 88, mark: "Renacer" },
  },
  // Primavera tiene 88 días en grilla + 2 de Summa (89–90) fuera de semana
  { key: "primavera", label: "Primavera", days: 88, weeks: 8, hasSumma: true },
];

/* Desplazamiento absoluto (1..365) por estación */
const START_OFFSET = {
  verano: 0, // 1..99
  otono: 99, // 100..187
  invierno: 99 + 88, // 188..275
  primavera: 99 + 88 + 88, // 276..363 (364–365 = Summa)
};

/* ========= Datos Lunares y Eclipses (absolutos 1..365) ========= */
const PHASES = {
  ohh: {
    new: [1, 74, 147, 220, 293],
    firstQ: [19, 92, 165, 238, 311],
    full: [37, 110, 183, 256, 329],
    lastQ: [55, 128, 201, 274, 347],
    mark: "⭕",
  },
  shirglue: {
    new: [1, 122, 243],
    firstQ: [31, 152, 274],
    full: [61, 182, 303],
    lastQ: [91, 212, 334],
    mark: "◆",
  },
  nerkhve: {
    new: [1],
    firstQ: [92],
    full: [183],
    lastQ: [274],
    mark: "✦",
  },
};

const ECLIPSES = {
  solar: [
    { day: 1, type: "Triple" },
    { day: 74, type: "Ohh" },
    { day: 122, type: "Shirglüe" },
    { day: 147, type: "Ohh" },
    { day: 220, type: "Ohh" },
    { day: 243, type: "Shirglüe" },
    { day: 293, type: "Ohh" },
  ],
  lunar: [
    { day: 37, type: "Ohh" },
    { day: 61, type: "Shirglüe" },
    { day: 110, type: "Ohh" },
    { day: 182, type: "Shirglüe" },
    { day: 183, type: "Ohh + Nerk’hve" },
    { day: 256, type: "Ohh" },
    { day: 303, type: "Shirglüe" },
    { day: 329, type: "Ohh" },
  ],
};

/* Festivos absolutos */
const FESTIVOS_ABS = [
  { abs: 1, label: "Día de la Ascensión" }, // Verano 1
  { abs: 275, label: "Día del Renacer" }, // Invierno 88
];

/* Summa (fuera de ciclo lunar): absolutos 364–365 (Primavera 89–90) */
const SUMMA = [364, 365];

/* ========= Helpers ========= */
const toAbsolute = (seasonKey, dayInSeason) =>
  START_OFFSET[seasonKey] + dayInSeason;

const buildWeekMatrix = (days, weeks) => {
  const perWeek = 11;
  const matrix = [];
  let d = 1;
  for (let w = 0; w < weeks; w++) {
    const row = [];
    for (let i = 0; i < perWeek; i++) {
      row.push(d);
      d++;
    }
    matrix.push(row);
  }
  return matrix;
};

const inList = (list, day) => list.includes(day);

function getEventsForAbsolute(absDay) {
  const events = [];
  if (SUMMA.includes(absDay)) {
    events.push({ kind: "summa", text: "Summa (sin eventos)" });
    return events;
  }
  const addPhase = (moon, phase, emoji) => {
    if (inList(PHASES[moon][phase], absDay)) {
      events.push({ kind: "phase", text: `${emoji}${PHASES[moon].mark}` });
    }
  };
  addPhase("ohh", "new", "🌑");
  addPhase("ohh", "firstQ", "🌓");
  addPhase("ohh", "full", "🌕");
  addPhase("ohh", "lastQ", "🌗");

  addPhase("shirglue", "new", "🌑");
  addPhase("shirglue", "firstQ", "🌓");
  addPhase("shirglue", "full", "🌕");
  addPhase("shirglue", "lastQ", "🌗");

  addPhase("nerkhve", "new", "🌑");
  addPhase("nerkhve", "firstQ", "🌓");
  addPhase("nerkhve", "full", "🌕");
  addPhase("nerkhve", "lastQ", "🌗");

  const solar = ECLIPSES.solar.find((e) => e.day === absDay);
  if (solar) events.push({ kind: "solar", text: `☀︎ ${solar.type}` });

  const lunar = ECLIPSES.lunar.find((e) => e.day === absDay);
  if (lunar) events.push({ kind: "lunar", text: `☾ ${lunar.type}` });

  const fest = FESTIVOS_ABS.find((f) => f.abs === absDay);
  if (fest) events.push({ kind: "festivo", text: fest.label });

  return events;
}

function renderCellBody(absDay, seasonLabel, weekdayIdx) {
  const events = getEventsForAbsolute(absDay);
  if (!events.length) return null;
  const tags = events.map((e) => e.text).join(" · ");
  return (
    <Fragment>
      <div style={{ fontWeight: 700 }}>{tags}</div>
      <div style={{ fontSize: ".85rem", opacity: 0.85 }}>
        {seasonLabel} · {DAY_NAMES[weekdayIdx]}
      </div>
    </Fragment>
  );
}

const Calendario = () => {
  const [seasonKey, setSeasonKey] = useState("verano");
  const season = SEASONS.find((s) => s.key === seasonKey);
  const weekMatrix = buildWeekMatrix(season.days, season.weeks);

  const isFestivoCell = (dayInSeason) => {
    if (season.festivoStart && dayInSeason === season.festivoStart.day)
      return true;
    if (season.festivoEnd && dayInSeason === season.festivoEnd.day) return true;
    return false;
  };

  // Fila extra para Primavera: días 89 y 90 (Summa)
  const renderPrimaveraSummaRow = () => {
    if (season.key !== "primavera") return null;

    const cells = Array.from({ length: 11 }, (_, i) => {
      if (i === 0 || i === 1) {
        const dayInSeason = 89 + i; // 89 y 90
        const abs = START_OFFSET.primavera + dayInSeason; // 364 y 365
        return (
          <div
            key={`summa-${i}`}
            className="calendario__cell calendario__cell--summa"
            data-mark="Summa"
          >
            <span className="calendario__cell-num">{dayInSeason}</span>
            <div className="calendario__cell-body">
              <strong>Summa</strong>
              <div style={{ fontSize: ".85rem", opacity: 0.85 }}>
                Primavera · {DAY_NAMES[i]}
              </div>
            </div>
          </div>
        );
      }
      // celdas vacías para completar la fila a 11 columnas
      return (
        <div key={`summa-empty-${i}`} className="calendario__cell">
          <div className="calendario__cell-body" />
        </div>
      );
    });

    return <div className="calendario__week">{cells}</div>;
  };

  return (
    <section className="calendario calendario--compact">
      {" "}
      {/* <section className="calendario">   Esta es el otro css para el tablero */}
      <header className="calendario__header">
        <h2 className="calendario__title">Calendario de Érden</h2>
        <p className="calendario__subtitle">
          Estructura por estaciones (días de 36&nbsp;h). Verano inicia el año.
          Festivos: <strong>Día de la Ascensión</strong> (Verano&nbsp;1) y{" "}
          <strong>Día del Renacer</strong> (Invierno&nbsp;88).
          <br />
          <strong>Summa</strong>: Primavera 89–90 (días 364–365) — visibles en
          la fila extra de Primavera.
        </p>
      </header>
      {/* Selector de estación */}
      <div className="calendario__season">
        {SEASONS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={"chip" + (s.key === seasonKey ? " chip--active" : "")}
            onClick={() => setSeasonKey(s.key)}
            aria-pressed={s.key === seasonKey}
          >
            {s.label}{" "}
            <span>
              ({s.days}
              {s.key === "primavera" ? "+2" : ""} d)
            </span>
          </button>
        ))}
      </div>
      <div className="calendario__board" id="top">
        {/* Cabecera de 11 nombres de día */}
        <div className="calendario__head">
          {DAY_NAMES.map((d) => (
            <div key={d} className="calendario__dayname">
              {d}
            </div>
          ))}
        </div>

        {/* Semanas */}
        <div className="calendario__weeks">
          {weekMatrix.map((week, wi) => (
            <div key={wi} className="calendario__week">
              {week.map((dayInSeason, di) => {
                const abs = toAbsolute(season.key, dayInSeason);
                const fest = isFestivoCell(dayInSeason);
                const events = getEventsForAbsolute(abs);
                const isSumma = events.some((e) => e.kind === "summa");

                const classes = [
                  "calendario__cell",
                  fest ? "calendario__cell--festivo" : "",
                  isSumma ? "calendario__cell--summa" : "",
                ]
                  .join(" ")
                  .trim();

                // data-mark para badge
                let dataMark;
                if (fest) {
                  const festAbs = FESTIVOS_ABS.find((f) => f.abs === abs);
                  if (festAbs)
                    dataMark = festAbs.label.includes("Ascensión")
                      ? "Ascensión"
                      : "Renacer";
                }
                if (!dataMark && isSumma) dataMark = "Summa";

                return (
                  <div
                    key={`${wi}-${di}`}
                    className={classes}
                    data-mark={dataMark}
                  >
                    <span className="calendario__cell-num">{dayInSeason}</span>
                    <div className="calendario__cell-body">
                      {isSumma ? (
                        <Fragment>
                          <strong>Summa</strong>
                          <div style={{ fontSize: ".85rem", opacity: 0.85 }}>
                            {season.label} · {DAY_NAMES[di]}
                          </div>
                        </Fragment>
                      ) : (
                        renderCellBody(abs, season.label, di)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Fila adicional para Primavera: días 89–90 (Summa) */}
          {renderPrimaveraSummaRow()}
        </div>

        <a className="btn btn--primary btn--center" href="#top">
          Volver arriba
        </a>
      </div>
      {/* Leyenda */}
      <div className="calendario__legend">
        <div className="key key--today">Hoy</div>
        <div className="key key--selected">Seleccionado</div>
        <div className="key key--festivo">Festivo</div>
        <div className="key key--solsticio">Solsticio/Equinoccio</div>
        <div className="key">Summa</div>
        <div className="key">
          Fases: 🌑 nueva · 🌓 creciente · 🌕 llena · 🌗 menguante
        </div>
        <div className="key key--moons">
          <span className="moon">
            <img src="/lunas/ohh.png" alt="Ohh" className="moon__img" />
            <span className="moon__name">Ohh</span>
          </span>
          <span className="sep">·</span>
          <span className="moon">
            <img
              src="/lunas/shirglue.png"
              alt="Shirglüe"
              className="moon__img"
            />
            <span className="moon__name">Shirglüe</span>
          </span>
          <span className="sep">·</span>
          <span className="moon">
            <img
              src="/lunas/nerkhve.png"
              alt="Nerk’hve"
              className="moon__img"
            />
            <span className="moon__name">Nerk’hve</span>
          </span>
        </div>

        <div className="key">Eclipses: ☀︎ solar · ☾ lunar</div>
      </div>
      <p style={{ textAlign: "center", marginTop: 12, opacity: 0.85 }}>
        <strong>Summa</strong> (Primavera 89–90, días 364–365): sin fases ni
        eclipses visibles.
      </p>
    </section>
  );
};

export default Calendario;
