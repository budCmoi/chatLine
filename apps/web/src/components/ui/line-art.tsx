/**
 * Line art SVG animal illustrations — thin stroke, no fill, elegant minimal.
 * All use currentColor so parent can control color.
 */

interface SvgProps {
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
}

export function FoxLineArt({ className, style, strokeWidth = 1.1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 260 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Tail */}
      <path
        d="M165 225 C202 208 220 232 214 262 C208 286 180 290 162 272"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Body sitting */}
      <path
        d="M82 188 C70 218 68 258 90 272 C112 285 150 285 170 270 C188 255 184 218 172 192"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Neck connector */}
      <path
        d="M105 188 C105 175 118 168 130 168 C142 168 155 175 155 188"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Head */}
      <ellipse cx="130" cy="140" rx="40" ry="36" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Left ear */}
      <path
        d="M97 118 L78 83 L112 105"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Right ear */}
      <path
        d="M163 118 L182 83 L148 105"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Left eye */}
      <circle cx="114" cy="132" r="4.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="114" cy="132" r="1.5" fill="currentColor" />
      {/* Right eye */}
      <circle cx="146" cy="132" r="4.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="146" cy="132" r="1.5" fill="currentColor" />
      {/* Nose */}
      <path
        d="M124 152 L130 158 L136 152"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Mouth */}
      <path
        d="M118 162 C124 168 136 168 142 162"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Whiskers left */}
      <path d="M90 148 L112 152" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      <path d="M88 155 L111 156" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      {/* Whiskers right */}
      <path d="M148 152 L170 148" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      <path d="M149 156 L171 155" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      {/* Front paws */}
      <path d="M98 270 C90 278 85 282 80 280" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M155 270 C163 278 168 282 173 280" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function DeerLineArt({ className, style, strokeWidth = 1.1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 240 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Left antler main */}
      <path
        d="M100 68 L88 40 L80 18 M88 40 L74 35 M80 18 L68 8"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Right antler main */}
      <path
        d="M140 68 L152 40 L160 18 M152 40 L166 35 M160 18 L172 8"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Head */}
      <ellipse cx="120" cy="88" rx="28" ry="32" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Left ear */}
      <path d="M94 78 L78 62 L90 82" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Right ear */}
      <path d="M146 78 L162 62 L150 82" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Left eye */}
      <circle cx="108" cy="84" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="108" cy="84" r="1.2" fill="currentColor" />
      {/* Right eye */}
      <circle cx="132" cy="84" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="132" cy="84" r="1.2" fill="currentColor" />
      {/* Nose */}
      <ellipse cx="120" cy="108" rx="5" ry="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Neck */}
      <path d="M100 118 C96 135 95 150 98 162" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M140 118 C144 135 145 150 142 162" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Body */}
      <path
        d="M98 162 C90 175 88 195 90 215 C92 235 95 248 98 260"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      <path
        d="M142 162 C150 175 152 195 150 215 C148 235 145 248 142 260"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Back line */}
      <path d="M98 162 C108 158 132 158 142 162" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Belly */}
      <path d="M98 220 C108 228 132 228 142 220" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Front left leg */}
      <path d="M98 220 L92 265 L88 300 M88 300 L84 306 M88 300 L92 307" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Front right leg */}
      <path d="M116 222 L112 268 L108 302 M108 302 L104 308 M108 302 L112 309" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Back left leg */}
      <path d="M124 222 L128 268 L132 302 M132 302 L128 308 M132 302 L136 309" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Back right leg */}
      <path d="M142 220 L148 265 L152 300 M152 300 L148 306 M152 300 L156 307" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Tail */}
      <path d="M142 172 C152 165 158 170 155 180" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function HeronLineArt({ className, style, strokeWidth = 1.1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Head crest */}
      <path d="M106 28 C112 14 120 8 118 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="100" cy="42" rx="18" ry="16" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Eye */}
      <circle cx="106" cy="38" r="3" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="106" cy="38" r="1" fill="currentColor" />
      {/* Beak */}
      <path d="M115 42 L148 36 M115 44 L148 46 M148 36 L148 46" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Long neck — S-curve */}
      <path
        d="M100 58 C105 72 110 86 106 100 C102 114 94 122 92 138 C90 152 96 164 100 172"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Body */}
      <path
        d="M86 172 C76 182 74 210 78 230 C82 248 90 258 100 262"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      <path
        d="M114 172 C124 182 126 210 122 230 C118 248 110 258 100 262"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Top back wing line */}
      <path d="M86 172 C100 168 114 168 114 172" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Wing folded — left */}
      <path d="M80 200 C65 205 55 215 58 228" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Wing folded — right */}
      <path d="M120 200 C135 205 145 215 142 228" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Tail feathers */}
      <path d="M100 262 C95 275 88 282 82 290" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M100 262 C100 278 100 285 100 295" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M100 262 C105 275 112 282 118 290" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Left leg — long */}
      <path d="M86 255 L82 300 L78 340" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Left foot */}
      <path d="M78 340 L64 346 M78 340 L74 348 M78 340 L82 348" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Right leg — long */}
      <path d="M114 255 L118 300 L122 340" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Right foot */}
      <path d="M122 340 L136 346 M122 340 L126 348 M122 340 L118 348" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function WolfLineArt({ className, style, strokeWidth = 1.1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 260 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Body */}
      <path
        d="M55 200 C42 230 40 260 62 272 C84 282 176 282 198 272 C220 260 218 230 205 200"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Neck */}
      <path d="M95 200 C92 185 96 172 100 162" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M165 200 C168 185 164 172 160 162" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Head */}
      <path
        d="M100 162 C94 140 88 120 90 108 C92 95 108 86 130 86 C152 86 168 95 170 108 C172 120 166 140 160 162"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Close head bottom */}
      <path d="M100 162 C110 168 150 168 160 162" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Left ear */}
      <path d="M96 108 L82 72 L108 92" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Right ear */}
      <path d="M164 108 L178 72 L152 92" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Left eye */}
      <path d="M106 114 C110 110 118 110 122 114" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="114" cy="118" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="114" cy="118" r="1.5" fill="currentColor" />
      {/* Right eye */}
      <path d="M138 114 C142 110 150 110 154 114" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="146" cy="118" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="146" cy="118" r="1.5" fill="currentColor" />
      {/* Muzzle */}
      <path
        d="M115 140 C118 148 130 152 145 148 C158 144 164 140 162 136"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Nose */}
      <path d="M122 136 L130 130 L138 136 L130 140 Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Tail */}
      <path
        d="M52 218 C28 200 12 210 15 232 C18 250 38 252 52 240"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Paws bottom */}
      <path d="M65 272 L58 282 M58 282 L52 286 M58 282 L62 288 M58 282 L65 286" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M195 272 L202 282 M202 282 L208 286 M202 282 L198 288 M202 282 L195 286" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function RabbitLineArt({ className, style, strokeWidth = 1.1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 180 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Left ear long */}
      <path
        d="M72 72 C65 50 63 25 70 12 C77 0 88 0 90 15 C92 30 88 55 82 72"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Right ear long */}
      <path
        d="M108 72 C115 50 117 25 110 12 C103 0 92 0 90 15 C88 30 92 55 98 72"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Head */}
      <ellipse cx="90" cy="96" rx="35" ry="30" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Left eye */}
      <circle cx="76" cy="90" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="76" cy="90" r="1.5" fill="currentColor" />
      {/* Right eye */}
      <circle cx="104" cy="90" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="104" cy="90" r="1.5" fill="currentColor" />
      {/* Nose */}
      <path d="M86 108 L90 113 L94 108" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Whiskers */}
      <path d="M60 106 L84 110" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      <path d="M58 112 L83 113" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      <path d="M96 110 L120 106" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      <path d="M97 113 L122 112" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      {/* Body */}
      <path
        d="M62 122 C50 140 48 175 55 195 C62 215 78 225 90 226 C102 225 118 215 125 195 C132 175 130 140 118 122"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Front paws */}
      <path d="M68 160 L60 178 M60 178 L55 183 M60 178 L64 184" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M112 160 L120 178 M120 178 L125 183 M120 178 L116 184" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Back large feet */}
      <path d="M58 195 C48 205 38 210 36 220 C34 230 42 235 55 230 C68 225 75 215 75 205" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M122 195 C132 205 142 210 144 220 C146 230 138 235 125 230 C112 225 105 215 105 205" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Tail */}
      <circle cx="90" cy="225" r="8" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
