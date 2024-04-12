"use client"
import classNames from "classnames";
import { createContext } from "react"
import { Section } from "@/components/elements/Section/Section";
import { ContentListType } from "@/helpers/types";
import { Button } from "@/components/elements/Button/Button";
import { CarouselList } from "./CarouselList";
import { MasonryList } from "./MasonryList";
import { DeckList } from "./DeckList";
import "@/app/css/bg-color.css";

export const DarkModeContext = createContext(false)
export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    heading,
    eyebrow,
    summary,
    exploreMore,
    content,
    appearanceVariant,
    size,
    headingTextAlignment,
    contentTextAlignment,
    htmlid,
    backgroundColor,
    backgroundImage,
    darkMode
  } = data;
  return (
    <DarkModeContext.Provider value={darkMode}>
      <Section
        id={htmlid}
        className={classNames(
          `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
        )}
        eyebrow={eyebrow}
        heading={heading}
        summary={summary}
        alignment={headingTextAlignment}
        framed={appearanceVariant !== "carousel"}
        backgroundImage={backgroundImage}
        darkMode={darkMode}
      >
        {exploreMore && (
          <div
            className={classNames(
              "w-full flex -mt-8 mb-4",
              { "justify-center": headingTextAlignment === "center" },
              { "justify-end": headingTextAlignment === "end" }
            )}
          >
            <Button
              size="lg"
              withArrow={true}
              variant="ghost"
              url={exploreMore.url}
            >
              {exploreMore.text}
            </Button>
          </div>
        )}
        {appearanceVariant === "carousel" && (
          <CarouselList
            list={content}
            size={size}
            alignment={contentTextAlignment}
          />
        )}
        {appearanceVariant === "masonry" && (
          <MasonryList
            list={content}
            size={size}
            alignment={contentTextAlignment}
          />
        )}
        {appearanceVariant === "deck" && (
          <DeckList list={content} size={size} alignment={contentTextAlignment} />
        )}
      </Section>
    </DarkModeContext.Provider>
  );
}