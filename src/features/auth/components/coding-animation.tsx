import { useLottie } from 'lottie-react';
import { useTheme } from '@/app/providers/theme-provider';
import { useEffect, useState } from 'react';
import codingLightAnimation from '@/../public/assets/coding-animation-light.json';
import codingDarkAnimation from '@/../public/assets/coding-animation.json';

function LottiePlayer({ animationData }: { animationData: unknown }) {
  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
  });

  return (
    <div className="w-full max-w-[420px] aspect-square flex items-center justify-center">
      {View}
    </div>
  );
}

export function CodingAnimation() {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [prevTheme, setPrevTheme] = useState(theme);

  // Sync state if theme changes (recommended React pattern to avoid setState in useEffect)
  if (theme !== prevTheme) {
    setPrevTheme(theme);
    if (theme === 'dark') {
      setIsDark(true);
    } else if (theme === 'light') {
      setIsDark(false);
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Sáng: dùng coding-animation-light.json (bản tươi sáng, bàn cam, áo xanh, chậu cây lá xanh)
  // Tối: dùng coding-animation.json (bản tối màu, tiệp màu với dark mode)
  const activeAnimation = isDark ? codingDarkAnimation : codingLightAnimation;

  return <LottiePlayer key={isDark ? 'dark' : 'light'} animationData={activeAnimation} />;
}
