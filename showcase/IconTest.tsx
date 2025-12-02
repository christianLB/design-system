import { Sun, Moon, Star, Heart, Folder, File } from 'lucide-react';

export function IconTest() {
  return (
    <div style={{ padding: '20px', background: '#333', color: 'white' }}>
      <h3>Icon Test - These should be SVG icons:</h3>
      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        <Sun size={32} />
        <Moon size={32} />
        <Star size={32} />
        <Heart size={32} />
        <Folder size={32} />
        <File size={32} />
      </div>
      <p style={{ marginTop: '10px', fontSize: '12px' }}>
        If you see actual sun, moon, star, heart, folder, file SVG graphics, lucide-react works. If
        you see weird Unicode characters, there's a bundling issue.
      </p>
    </div>
  );
}
