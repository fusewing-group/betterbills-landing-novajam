'use client';
import classNames from 'classnames';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { FeaturedContentType } from '@/helpers/types';
import { Section } from '@/components/elements/Section/Section';
import { FlexibleContent } from '@/components/elements/FlexibleContent/FlexibleContent';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';
import '@/app/styles/bg-color.css';
import '@/app/styles/padding.css';

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({
  data,
}) => {
  const { supportingItems, media, mediaPosition, mediaAspectRatio } = data;
  const layout = data.layout ?? 'flex row';

  const [mediaRef, isMediaIntersecting] = useIntersecting();
  const [itemsListRef, isItemsListIntersecting] = useIntersecting();

  return (
    <Section data={data} layout={layout}>
      {!!media.length && (
        <div
          ref={mediaRef}
          className={classNames(
            'relative -bottom-10 opacity-0 basis-1/3 grow shrink',
            {
              '-order-1': mediaPosition === 'left' && layout === 'flex row',
              'order-3': mediaPosition === 'right',
              'animate-slidingUpContent animation-delay-300':
                isMediaIntersecting,
            },
          )}
        >
          {media.length === 1 ? (
            <MediaItem
              data={media[0]}
              aspectRatio={mediaAspectRatio}
              videoControls
            />
          ) : (
            <MediaCarousel
              data={media}
              autoplay={{ delay: 3500 }}
              pagination={{ enabled: true }}
              aspectRatio={mediaAspectRatio}
            />
          )}
        </div>
      )}
      {!!supportingItems.length && (
        <div
          ref={itemsListRef}
          className={classNames(
            'relative -bottom-10 opacity-0 basis-1/3 grow shrink flex flex-col gap-y-8 my-8',
            {
              'animate-slidingUpContent animation-delay-450':
                isItemsListIntersecting,
            },
          )}
        >
          {supportingItems.map((item, index) => (
            <FlexibleContent
              key={index}
              data={item}
              layout="horizontal"
              alignment="start"
            />
          ))}
        </div>
      )}
    </Section>
  );
};
