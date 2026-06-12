import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/button';
import { Check, Sun, Moon, Laptop } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useTheme } from '@/app/providers/theme-provider';

// Cấu hình danh sách ngôn ngữ hỗ trợ
const SUPPORTED_LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
] as const;

type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const changeLanguage = (lang: LanguageCode) => {
    i18n.changeLanguage(lang);
  };

  const currentLang = (i18n.language || 'vi').slice(0, 2) as LanguageCode;

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // Tự động cập nhật tiêu đề tab trình duyệt theo ngôn ngữ
  useEffect(() => {
    document.title = t('header.app_name');
  }, [currentLang, t]);

  // Helper để hiển thị icon đại diện của theme hiện tại
  const renderThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="size-[1.2rem]" />;
      case 'dark':
        return <Moon className="size-[1.2rem]" />;
      default:
        return <Laptop className="size-[1.2rem]" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('header.app_name')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Bộ chọn Theme Sáng/Tối/Hệ thống dạng Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer transition-all border-border"
              >
                {renderThemeIcon()}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => setTheme('light')}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sun className="size-4 text-muted-foreground" />
                  <span>{t('theme.light')}</span>
                </span>
                {theme === 'light' && <Check className="size-3.5 text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('dark')}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Moon className="size-4 text-muted-foreground" />
                  <span>{t('theme.dark')}</span>
                </span>
                {theme === 'dark' && <Check className="size-3.5 text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('system')}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Laptop className="size-4 text-muted-foreground" />
                  <span>{t('theme.system')}</span>
                </span>
                {theme === 'system' && <Check className="size-3.5 text-primary" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bộ chuyển đổi Ngôn ngữ */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer transition-all border-border"
              >
                <span className="text-base select-none">{currentLanguageInfo.flag}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {isActive && <Check className="size-3.5 text-primary" />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
