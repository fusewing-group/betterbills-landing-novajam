'use client';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Section } from '@/components/sections/Section/Section';
import { ContentPTType } from '@/helpers/types';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

const ArrowGroup = ({
  visibleIdx,
  setVisibleIdx,
  length,
}: {
  visibleIdx: number;
  setVisibleIdx: (idx: number) => void;
  length: number;
}) => {
  return (
    <>
      <GoArrowLeft
        size={50}
        className={classNames(
          'cursor-pointer flex justify-center items-center rounded-full p-2.5 hover:bg-primary-600 hover:text-slate-100 transition-colors duration-300 ease-in-out dark:text-slate-100',
        )}
        onClick={() => {
          if (visibleIdx > 0) setVisibleIdx(visibleIdx - 1);
          else setVisibleIdx(length - 1);
        }}
      />
      <GoArrowRight
        size={50}
        className={classNames(
          'cursor-pointer flex justify-center items-center rounded-full p-2.5 hover:bg-primary-600 hover:text-slate-100 transition-colors duration-300 ease-in-out dark:text-slate-100',
        )}
        onClick={() => {
          if (visibleIdx < length - 1) setVisibleIdx(visibleIdx + 1);
          else setVisibleIdx(0);
        }}
      />
    </>
  );
};

export const SleekCarouselPT: React.FC<{ data: ContentPTType }> = ({
  data,
}) => {
  const {
    eyebrow,
    displayTitle,
    summary,
    presentationItems,
    alignment,
    itemAlignment,
    darkMode,
  } = data;
  const [visibleIdx, setVisibleIdx] = useState(0);
  const [ref, isIntersecting] = useIntersecting();

  return (
    <Section className={classNames('overflow-x-hidden')} data={data}>
      <div
        ref={ref}
        className={classNames(
          'flex flex-col lg:flex-row gap-5 py-10 lg:py-16',
          'relative -bottom-10 opacity-0',
          {
            'animate-slidingUpContent animation-delay-150': isIntersecting,
          },
        )}
      >
        <div className="lg:w-1/2 lg:pr-10">
          {eyebrow && (
            <p
              className={classNames(
                'uppercase text-sm lg:text-base tracking-widest text-secondary-600 font-medium mb-2',
                { 'text-center': alignment === 'center' },
                { 'text-end': alignment === 'end' },
              )}
            >
              {eyebrow}
            </p>
          )}
          {displayTitle && (
            <div
              className={classNames(
                'font-heading text-heading leading-tight mb-3 dark:text-slate-100',
                {
                  'text-center': alignment === 'center',
                  'text-end': alignment === 'end',
                },
              )}
            >
              <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
            </div>
          )}
          {summary && (
            <div
              className={classNames(
                'prose md:prose-lg lg:prose-xl mb-3 max-w-xl lg:max-w-3xl dark:text-slate-100',
                {
                  'text-center': alignment === 'center',
                  'text-end': alignment === 'end',
                },
              )}
            >
              <MarkdownRenderer>{summary}</MarkdownRenderer>
            </div>
          )}
          <div
            className={classNames('mt-8 hidden lg:flex gap-4', {
              'lg:justify-center': alignment === 'center',
            })}
          >
            <ArrowGroup
              visibleIdx={visibleIdx}
              setVisibleIdx={setVisibleIdx}
              length={presentationItems.length}
            />
          </div>
        </div>
        <div
          className={classNames(
            'lg:w-1/2 grid',
            'relative -bottom-10 opacity-0',
            {
              'animate-slidingUpContent animation-delay-300': isIntersecting,
            },
          )}
        >
          {presentationItems.map((item, idx) => (
            <div
              key={item.id}
              className={classNames(
                'col-start-1 row-start-1 flex flex-col gap-6 p-8 lg:p-12 shadow-lg bg-white rounded-theme transition-all ease-in-out duration-500 relative',
                { 'items-center': itemAlignment === 'center' },
                { 'items-end': itemAlignment === 'end' },
                { 'opacity-100 right-0': visibleIdx === idx },
                { 'opacity-0 -right-24': visibleIdx !== idx },
                { 'bg-opacity-5': darkMode },
              )}
            >
              {item.media.length > 0 && (
                <FlexibleContentMediaPart
                  data={item}
                  alignment={itemAlignment}
                />
              )}
              <div
                className={classNames(
                  'grow flex flex-col justify-center',
                  { 'text-center': itemAlignment === 'center' },
                  { 'text-end': itemAlignment === 'end' },
                )}
              >
                {item.eyebrow && (
                  <div
                    className={classNames(
                      'text-sm font-semibold tracking-widest text-slate-500 dark:text-slate-100/70',
                    )}
                  >
                    {item.eyebrow}
                  </div>
                )}
                {item.displayTitle && (
                  <div className={classNames('text-2xl dark:text-slate-100')}>
                    <MarkdownRenderer>{item.displayTitle}</MarkdownRenderer>
                  </div>
                )}
                {item.summary && (
                  <div
                    className={classNames(
                      'mt-5 prose 2xl:prose-lg dark:text-slate-100/70',
                    )}
                  >
                    <MarkdownRenderer>{item.summary}</MarkdownRenderer>
                  </div>
                )}
                {item.buttons && item.buttons.length > 0 && (
                  <div className={classNames('mt-8')}>
                    <ButtonGroup
                      data={item.buttons}
                      alignment={itemAlignment}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex lg:hidden gap-4 mt-2 justify-center">
          <ArrowGroup
            visibleIdx={visibleIdx}
            setVisibleIdx={setVisibleIdx}
            length={presentationItems.length}
          />
        </div>
      </div>
    </Section>
  );
};
