export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Paper surfaces */
        paper:  '#F4F1EA',
        paper2: '#ECE7DC',

        /* Night surfaces */
        night:  '#0A0E18',
        night2: '#11151F',
        night3: '#1B2030',
        'night-text':  '#E5E3DC',
        'night-text2': '#9CA0AA',
        'night-text3': '#5C6173',

        /* Ink scale */
        ink:  '#14171E',
        ink2: '#4B4E55',
        ink3: '#82848B',
      },
      fontFamily: {
        sans:  ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono:  ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
      },
    },
  },
};
