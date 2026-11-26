// Inline SVG icons. All decorative unless a caller adds a label.
const svg = (inner, cls = "icon", vb = "0 0 24 24") =>
  `<svg class="${cls}" viewBox="${vb}" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

export const icons = {
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  partial: svg('<circle cx="12" cy="12" r="7.5"/><path d="M12 4.5v15" /><path d="M12 4.5a7.5 7.5 0 0 0 0 15z" fill="currentColor" stroke="none"/>'),
  cross: svg('<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>'),
  copy: svg('<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5v-2a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  download: svg('<path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 19.5h14"/>'),
  arrowRight: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowDown: svg('<path d="M12 5v14M6 13l6 6 6-6"/>'),
  external: svg('<path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>'),
  play: svg('<path d="M8 5.5v13l10-6.5z" fill="currentColor"/>'),
  warn: svg('<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.2v.1"/>'),
};

/** The OptiLink badge. `dark` draws the slate-deep badge used on slate backgrounds. */
export function logoMark(dark = false, size = 40) {
  const rect = dark
    ? '<rect x="2" y="2" width="36" height="36" rx="9.36" fill="#2D3948" stroke="#A9BBD0" stroke-width="1.2"/>'
    : '<rect x="2" y="2" width="36" height="36" rx="9.36" fill="#3F4E61"/>';
  return `<svg class="logo-mark" viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true" focusable="false">${rect}<path d="M25.083 15.423A6.84 6.84 0 0 1 25.083 24.577" fill="none" stroke="#fff" stroke-width="2.7" stroke-linecap="round"/><path d="M28.561 12.292A11.52 11.52 0 0 1 28.561 27.708" fill="none" stroke="#A9BBD0" stroke-width="2.7" stroke-linecap="round"/><path d="M14.917 15.423A6.84 6.84 0 0 0 14.917 24.577" fill="none" stroke="#fff" stroke-width="2.7" stroke-linecap="round"/><path d="M11.439 12.292A11.52 11.52 0 0 0 11.439 27.708" fill="none" stroke="#A9BBD0" stroke-width="2.7" stroke-linecap="round"/><circle cx="20" cy="20" r="3.06" fill="#D63B31"/></svg>`;
}

/** Badge plus live-text wordmark. `dark` = on a dark background. */
export function logo({ dark = false, size = 40, label = true } = {}) {
  return `<span class="logo ${dark ? "logo--dark" : "logo--light"}">${logoMark(dark, size)}<span class="wordmark"${label ? "" : ' aria-hidden="true"'}><span class="wm-opti">Opti</span><span class="wm-link">Link</span></span></span>`;
}

// Bed, station and tablet drawings for the "ward kit vs two tablets" visual.
export const bedIcon = `<svg viewBox="0 0 48 32" width="44" height="30" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 26V8M4 20h40v6M44 20v-5a4 4 0 0 0-4-4H20v9"/><circle cx="12" cy="15" r="3.4"/></svg>`;
export const stationIcon = `<svg viewBox="0 0 48 32" width="44" height="30" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="13" y="3" width="22" height="26" rx="5"/><rect x="17" y="8" width="14" height="7" rx="1.2"/><path d="M18 21h2M23 21h2M28 21h2M18 25h2M23 25h2M28 25h2"/></svg>`;
export const tabletIcon = `<svg viewBox="0 0 48 32" width="44" height="30" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="36" height="24" rx="3.5"/><path d="M22 24.5h4"/></svg>`;
