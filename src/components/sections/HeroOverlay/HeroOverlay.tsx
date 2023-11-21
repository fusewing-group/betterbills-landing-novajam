/* 
Created by minhwpm (minhhien134@gmail.com) 
Layout: Overlay
*/

import classNames from "classnames";
import Button from "@/components/elements/Button/Button";
import { HeroType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";
import Carousel from "@/components/elements/Carousel/Carousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import Container from "@/components/elements/Container/Container";

const HeroC: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, textAlignment } = data;
  return (
    <section className={classNames("relative")} >
      <Carousel
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          enabled: true,
          clickable: true
        }}
        loop={true}
        slides={content.map(section => (
          <div key={section.id} className={classNames("relative w-screen h-screen lg:h-auto lg:min-h-max")}>
            <div className={classNames("h-full")}>
              {section.media.length === 1 && <MediaItem data={section.media[0]} dimensionBase="height" videoAutoplay={true} />}
              {section.media.length > 1 && <MediaCarousel data={section.media} dimensionBase="height" videoAutoplay={true} />}
            </div>
            {(section.heading || section.content || section.buttons.length) && (
              <div className={classNames(
                "w-full h-full px-4 py-10 lg:py-16 text-white drop-shadow-lg",
                { "bg-gradient-to-b from-primary-800 via-primary-500 to-primary-300" : section.media.length === 0 },
                { "absolute top-0 left-0 bg-neutral-900/20": section.media.length > 0 }
              )}>
                <Container className={classNames(
                  "h-full flex flex-col justify-center bg-transparent",
                  { "items-center text-center": textAlignment === "center" },
                  { "items-end text-end": textAlignment === "reverse" },
                )}>
                  {section.label && (
                    <div className="tracking-widest font-semibold lg:text-lg max-w-2xl">
                      {section.label}
                    </div>
                  )}
                  {section.heading && (
                    <div className="text-super-heading leading-tight font-heading max-w-3xl">
                      <RichText htmlString={section.heading} />
                    </div>
                  )}
                  {section.content && (
                    <div className="block text-lg lg:text-xl font-semibold leading-normal mt-5 max-w-2xl">
                      <RichText htmlString={section.content} />
                    </div>
                  )}
                  <div
                    className={classNames(
                      "flex flex-row flex-wrap gap-6 mt-12",
                      { "justify-center": textAlignment === "center" },
                      { "justify-end": textAlignment === "reverse" }
                    )}
                  >
                    {section.buttons.length > 0 &&
                      section.buttons.map((button) => (
                        <Button
                          key={button.text}
                          variant={button.buttonVariant}
                          size="lg"
                          url={button.url}
                          openNewTab={button.openNewTab}
                        >
                          {button.text}
                        </Button>
                      ))}
                  </div>
                </Container>
              </div>
            )}
          </div>
        ))}
      />
    </section>
  );
};

export default HeroC;
