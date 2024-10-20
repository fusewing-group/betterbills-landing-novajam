import classNames from 'classnames';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import { generateFontClassnames } from '@/helpers/fonts';
import { generateColorClassnames } from '@/helpers/utils';
import getNavigation from '@/helpers/query/getNavigation';
import getFooter from '@/helpers/query/getFooter';
import getPage from '@/helpers/query/getPage';
import styles from '@/app/styles/theme.module.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation('/blog');
  const footer = await getFooter('/blog');
  let fontTheme, colorTheme, borderRadiusTheme, headingFontSizeTheme;
  const page = await getPage('/blog');
  if (page) {
    fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
    colorTheme = generateColorClassnames(
      page.colorPrimary,
      page.colorSecondary,
    );
    borderRadiusTheme = `${page.borderRadius}-border-radius-theme`;
    headingFontSizeTheme = `${page.headingFontSize}-heading-font-size`;
  }

  return (
    <div
      className={classNames(
        fontTheme,
        styles[borderRadiusTheme ?? ''],
        styles[headingFontSizeTheme ?? ''],
        styles[colorTheme?.primaryColor ?? ''],
        styles[colorTheme?.secondaryColor ?? ''],
        { 'overlay-nav': navigation?.layout === 'overlay' },
      )}
    >
      {navigation && <Navigation data={navigation} />}
      {children}
      {footer && <Footer data={footer} />}
    </div>
  );
}
