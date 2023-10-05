'use client'
import Image from "next/image"
import Button from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/utils/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
import NavMenu from "@/components/elements/NavMenu/NavMenu"
import NavMenuMobile from "@/components/elements/NavMenu/NavMenuMobile"
import { HeaderType } from "@/utils/types"

interface Props {
  data: HeaderType
  variant?: "standard" | "minimal" | "extended"
  // @TODO following 4 properties
  stickyType?: 'none' | 'scroll-up' | 'scroll-down'
  logoAlignment?: 'center' | 'left'
  backgroundColor?: 'white' | 'transparent'
}

const Header: React.FC<Props> = ({ data, variant = "standard" }) => {
  const { logo, logoRedirect, menu, buttons, isLoginEnabled } = data
  const sticky = useStickyHeaderOnScrollUp()

  return (
    <header className={classNames(
      "relative bg-white z-[99999]",
      { "sticky w-full z-50 top-0 animate-headerSlideIn": sticky },
      { "border-b font-bold tracking-wider": variant === "standard" },
    )}>
      <div className="container p-4 mx-auto flex items-center">
        <div className="shrink-0">
          <Link href={logoRedirect ?? "/"}>
            <Image
              className="w-40 h-14 object-contain"
              src={logo.url}
              width={160}
              height={56}
              alt={logo.title ?? ""}
            />
          </Link>
        </div>
        <div className="flex-1">
          <NavMenu menu={menu} />
        </div>

        { isLoginEnabled && (
          <Link href="/login" className="px-3 py-1 rounded hover:bg-primary-100 hover:text-primary-600 transition-all duration-300 hidden lg:block">
            Login
          </Link>
        )}
        <div className="shrink-0 hidden lg:block">
          {buttons && buttons.length > 0 && buttons.map(button => (
            <Button key={button.text} variant={button.type} size="lg" url={button.url}>
              {button.text}
            </Button>
          ))}
        </div>
        <NavMenuMobile menu={menu} />
      </div>

    </header>
  )
}

export default Header