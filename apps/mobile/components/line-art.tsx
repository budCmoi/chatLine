/**
 * Line art SVG animal illustrations — thin stroke, no fill.
 * React Native version using react-native-svg.
 * Paths are identical to the web version in apps/web/src/components/ui/line-art.tsx
 */
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface LineArtProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// ─── Fox ─────────────────────────────────────────────────────────────────────
export function FoxLineArt({ size = 140, color = 'rgba(245,245,245,0.22)', strokeWidth = 1.1 }: LineArtProps) {
  const h = Math.round((size * 300) / 260);
  const sw = strokeWidth;
  const sw7 = strokeWidth * 0.7;
  return (
    <Svg width={size} height={h} viewBox="0 0 260 300" fill="none">
      {/* Tail */}
      <Path d="M165 225 C202 208 220 232 214 262 C208 286 180 290 162 272" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Body */}
      <Path d="M82 188 C70 218 68 258 90 272 C112 285 150 285 170 270 C188 255 184 218 172 192" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Neck */}
      <Path d="M105 188 C105 175 118 168 130 168 C142 168 155 175 155 188" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Head */}
      <Ellipse cx="130" cy="140" rx="40" ry="36" stroke={color} strokeWidth={sw} />
      {/* Left ear */}
      <Path d="M97 118 L78 83 L112 105" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Right ear */}
      <Path d="M163 118 L182 83 L148 105" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Left eye */}
      <Circle cx="114" cy="132" r="4.5" stroke={color} strokeWidth={sw} />
      <Circle cx="114" cy="132" r="1.5" fill={color} />
      {/* Right eye */}
      <Circle cx="146" cy="132" r="4.5" stroke={color} strokeWidth={sw} />
      <Circle cx="146" cy="132" r="1.5" fill={color} />
      {/* Nose */}
      <Path d="M124 152 L130 158 L136 152" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Mouth */}
      <Path d="M118 162 C124 168 136 168 142 162" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Whiskers left */}
      <Path d="M90 148 L112 152" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      <Path d="M88 155 L111 156" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      {/* Whiskers right */}
      <Path d="M148 152 L170 148" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      <Path d="M149 156 L171 155" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      {/* Front paws */}
      <Path d="M98 270 C90 278 85 282 80 280" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M155 270 C163 278 168 282 173 280" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Deer ─────────────────────────────────────────────────────────────────────
export function DeerLineArt({ size = 140, color = 'rgba(245,245,245,0.22)', strokeWidth = 1.1 }: LineArtProps) {
  const h = Math.round((size * 340) / 240);
  const sw = strokeWidth;
  return (
    <Svg width={size} height={h} viewBox="0 0 240 340" fill="none">
      {/* Left antler */}
      <Path d="M100 68 L88 40 L80 18 M88 40 L74 35 M80 18 L68 8" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Right antler */}
      <Path d="M140 68 L152 40 L160 18 M152 40 L166 35 M160 18 L172 8" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Head */}
      <Ellipse cx="120" cy="88" rx="28" ry="32" stroke={color} strokeWidth={sw} />
      {/* Left ear */}
      <Path d="M94 78 L78 62 L90 82" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Right ear */}
      <Path d="M146 78 L162 62 L150 82" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Left eye */}
      <Circle cx="108" cy="84" r="3.5" stroke={color} strokeWidth={sw} />
      <Circle cx="108" cy="84" r="1.2" fill={color} />
      {/* Right eye */}
      <Circle cx="132" cy="84" r="3.5" stroke={color} strokeWidth={sw} />
      <Circle cx="132" cy="84" r="1.2" fill={color} />
      {/* Nose */}
      <Ellipse cx="120" cy="108" rx="5" ry="3.5" stroke={color} strokeWidth={sw} />
      {/* Neck */}
      <Path d="M100 118 C96 135 95 150 98 162" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M140 118 C144 135 145 150 142 162" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Body */}
      <Path d="M98 162 C90 175 88 195 90 215 C92 235 95 248 98 260" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M142 162 C150 175 152 195 150 215 C148 235 145 248 142 260" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Back line */}
      <Path d="M98 162 C108 158 132 158 142 162" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Belly */}
      <Path d="M98 220 C108 228 132 228 142 220" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Front left leg */}
      <Path d="M98 220 L92 265 L88 300 M88 300 L84 306 M88 300 L92 307" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Front right leg */}
      <Path d="M116 222 L112 268 L108 302 M108 302 L104 308 M108 302 L112 309" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Back left leg */}
      <Path d="M124 222 L128 268 L132 302 M132 302 L128 308 M132 302 L136 309" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Back right leg */}
      <Path d="M142 220 L148 265 L152 300 M152 300 L148 306 M152 300 L156 307" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Tail */}
      <Path d="M142 172 C152 165 158 170 155 180" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Heron ────────────────────────────────────────────────────────────────────
export function HeronLineArt({ size = 140, color = 'rgba(245,245,245,0.22)', strokeWidth = 1.1 }: LineArtProps) {
  const h = Math.round((size * 360) / 200);
  const sw = strokeWidth;
  return (
    <Svg width={size} height={h} viewBox="0 0 200 360" fill="none">
      {/* Head crest */}
      <Path d="M106 28 C112 14 120 8 118 20" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Head */}
      <Ellipse cx="100" cy="42" rx="18" ry="16" stroke={color} strokeWidth={sw} />
      {/* Eye */}
      <Circle cx="106" cy="38" r="3" stroke={color} strokeWidth={sw} />
      <Circle cx="106" cy="38" r="1" fill={color} />
      {/* Beak */}
      <Path d="M115 42 L148 36 M115 44 L148 46 M148 36 L148 46" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Long neck S-curve */}
      <Path d="M100 58 C105 72 110 86 106 100 C102 114 94 122 92 138 C90 152 96 164 100 172" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Body */}
      <Path d="M86 172 C76 182 74 210 78 230 C82 248 90 258 100 262" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M114 172 C124 182 126 210 122 230 C118 248 110 258 100 262" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Top back wing line */}
      <Path d="M86 172 C100 168 114 168 114 172" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Wing left */}
      <Path d="M80 200 C65 205 55 215 58 228" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Wing right */}
      <Path d="M120 200 C135 205 145 215 142 228" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Tail feathers */}
      <Path d="M100 262 C95 275 88 282 82 290" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M100 262 C100 278 100 285 100 295" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M100 262 C105 275 112 282 118 290" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Left leg */}
      <Path d="M86 255 L82 300 L78 340" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M78 340 L64 346 M78 340 L74 348 M78 340 L82 348" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Right leg */}
      <Path d="M114 255 L118 300 L122 340" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M122 340 L136 346 M122 340 L126 348 M122 340 L118 348" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Rabbit ───────────────────────────────────────────────────────────────────
export function RabbitLineArt({ size = 120, color = 'rgba(245,245,245,0.22)', strokeWidth = 1.1 }: LineArtProps) {
  const h = Math.round((size * 240) / 180);
  const sw = strokeWidth;
  const sw7 = strokeWidth * 0.7;
  return (
    <Svg width={size} height={h} viewBox="0 0 180 240" fill="none">
      {/* Left ear long */}
      <Path d="M72 72 C65 50 63 25 70 12 C77 0 88 0 90 15 C92 30 88 55 82 72" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Right ear long */}
      <Path d="M108 72 C115 50 117 25 110 12 C103 0 92 0 90 15 C88 30 92 55 98 72" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Head */}
      <Ellipse cx="90" cy="96" rx="35" ry="30" stroke={color} strokeWidth={sw} />
      {/* Left eye */}
      <Circle cx="76" cy="90" r="4" stroke={color} strokeWidth={sw} />
      <Circle cx="76" cy="90" r="1.5" fill={color} />
      {/* Right eye */}
      <Circle cx="104" cy="90" r="4" stroke={color} strokeWidth={sw} />
      <Circle cx="104" cy="90" r="1.5" fill={color} />
      {/* Nose */}
      <Path d="M86 108 L90 113 L94 108" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {/* Whiskers */}
      <Path d="M60 106 L84 110" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      <Path d="M58 112 L83 113" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      <Path d="M96 110 L120 106" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      <Path d="M97 113 L122 112" stroke={color} strokeWidth={sw7} strokeLinecap="round" />
      {/* Body */}
      <Path d="M58 125 C50 138 48 160 52 178 C56 195 68 208 90 210 C112 208 124 195 128 178 C132 160 130 138 122 125" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Front left paw */}
      <Path d="M64 185 L58 210 L55 225" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M55 225 L50 230 M55 225 L55 232 M55 225 L60 230" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Front right paw */}
      <Path d="M116 185 L122 210 L125 225" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M125 225 L120 230 M125 225 L125 232 M125 225 L130 230" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Tail */}
      <Circle cx="90" cy="208" r="9" stroke={color} strokeWidth={sw} />
    </Svg>
  );
}
