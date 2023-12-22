import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { NavLinkItem } from "@/components/elements/NavLinkItem/NavLinkItem";
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";
import { SubmenuType } from "@/helpers/types";

export const SubmenuMobile: React.FC<{data: SubmenuType, setMobileMenuShowed:  Dispatch<SetStateAction<boolean>>}> = ({data, setMobileMenuShowed}) => {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenu.Trigger
        className={classNames(
          "py-2 px-3 select-none font-semibold text-start w-full group rounded-assets hover:bg-primary-100 transition duration-500",
          {
            "bg-primary-100":
              data.featuredContent.find(
                (content) => "url" in content && content.url === pathname
              ) ||
              data.menu.find(
                (subItem) =>
                  (subItem.contentType === "link" &&
                    subItem.url === pathname) ||
                  (subItem.contentType === "linkgroup" &&
                    subItem.links.find((link) => link.url === pathname))
              ),
          }
        )}
        onPointerEnter={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
      >
        {data.title}
        <FaChevronDown
          size={10}
          className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className="bg-neutral-50 font-medium mt-2 rounded-assets"
        onPointerLeave={(e) => e.preventDefault()}
      >
        <NavigationMenu.Root
          aria-label="Sub"
          orientation="vertical"
          className="py-2 px-4"
        >
          <NavigationMenu.List>
            {data.menu.length > 0 &&
              data.menu.map((subItem) => (
                <NavigationMenu.Item key={subItem.id} className="py-1 border-b last:border-none border-neutral-100">
                  {subItem.contentType === "link" && (
                    <NavLinkItem
                      href={subItem.url}
                      onClick={() => {
                        setMobileMenuShowed(false);
                        document.body.style.overflow = "auto";
                      }}
                    > 
                    {subItem.text}
                    </NavLinkItem>
                  )}
                  {subItem.contentType === "linkgroup" && (
                    <>
                      <NavigationMenu.Trigger
                        className={classNames(
                          "w-full select-none text-left py-2 px-3 rounded-assets hover:bg-primary-100 transition-color duration-300 data-[state=open]:bg-primary-100 group",
                          {
                            "bg-primary-100": subItem.links.find(
                              (link) => link.url === pathname
                            ),
                          }
                        )}
                        onPointerEnter={(e) => e.preventDefault()}
                        onPointerMove={(e) => e.preventDefault()}
                        onPointerLeave={(e) => e.preventDefault()}
                      >
                        {subItem.title}
                        <FaChevronDown
                          size={10}
                          className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content
                        className="mt-2"
                        onPointerLeave={(e) => e.preventDefault()}
                      >
                        <ul className="pl-4 pb-2 flex flex-col gap-y-1">
                          {subItem.links.length > 0 &&
                            subItem.links.map((link) => (
                              <li key={link.id}>
                                <NavLinkItem
                                  href={link.url}
                                  onClick={() => {
                                    setMobileMenuShowed(false);
                                    document.body.style.overflow = "auto";
                                  }}
                                >
                                  {link.text}
                                </NavLinkItem>
                              </li>
                            ))}
                        </ul>
                      </NavigationMenu.Content>
                    </>
                  )}
                </NavigationMenu.Item>
              ))}
          </NavigationMenu.List>
          {data.featuredContent?.length > 0 && (
            <div className="mt-4 flex gap-4 overflow-y-auto overscroll-y-contain">
              {data.featuredContent.map((content) => (
                <div
                  key={content.id}
                  className="w-4/5 md:basis-72 shrink-0 grow max-w-xs"
                >
                  <NavFeaturedContent data={content} />
                </div>
              ))}
            </div>
          )}
        </NavigationMenu.Root>
      </NavigationMenu.Content>
    </>
  );
}