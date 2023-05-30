'use client'
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import FeatureContentItem from "@/components/elements/FeatureContentItem/FeatureContentItem";

const sections = [
  {
    img: "https://www.tidio.com/_next/image/?url=%2Fimages%2Ffrontpage%2Fsection-slider%2Fstart-conversation.png&w=3840&q=75",
    content: {
      title: "Start conversations, win loyal customers",
      description: "Chat with customers. Solve their problems in real time. Offer custom discounts based on browsing history. And make product recommendations based on their behavior.",
    }
  },
  {
    img: "https://www.tidio.com/_next/image/?url=%2Fimages%2Ffrontpage%2Fsection-slider%2Fautomate-answers.png&w=3840&q=75",
    content: {
      title: "Automate answers and workflows in minutes",
      description: "Automate up to 47% of repetitive answers about shipping, order status, or product availability so your agents can advise on complex topics.",
    }
  },
  {
    img: "https://www.tidio.com/_next/image/?url=%2Fimages%2Ffrontpage%2Fsection-slider%2Fvisitors.png&w=3840&q=75",
    content: {
      title: "Turn visitors into paying customers",
      description: "Make the most of your website traffic with sales chatbots designed to boost your revenue by 10-25%.",
    }
  },
]

const FeatureRow = () => {
  const [ visibleIdx, setVisibleIdx ] = useState(0);
  
  return (
    <section className="px-4 lg:px-32">
      <h2 className="text-4xl lg:text-5xl leading-snug text-center max-w-screen-lg font-semibold mb-16 mx-auto">
        Make customer experience your competitive advantage
      </h2>
      {/* FOR MOBILE, TABLETS */}
      <div className="xl:hidden">
        {sections.map((section, idx) => (
          <div key={section.content.title} className="mb-20" >
            <div className="mb-10">
              <h3 className="font-semibold text-3xl lg:text-4xl leading-snug mb-6">
                {section.content.title}
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                {section.content.description}
              </p>
            </div>
            <div className="md:w-3/5 mx-auto">
              {/* @TODO use Next/Image */}
              <img className="w-full object-cover" src={section.img} />
            </div>
          </div>
        ))}
      </div>

      {/* FOR DESKTOP */}
      <div className="hidden xl:flex">
        <div className=" relative w-3/5">
          <div className="sticky top-20">
            <div className="relative h-[80vh]">
              {sections.map((section, idx) => (
                <div key={section.content.title} className={classNames(
                  "transition-opacity duration-300",
                  { "is-visible opacity-100 h-full overflow-visible ": visibleIdx === idx},
                  { "is-invisible h-0 opacity-10 max-h-full relative overflow-hidden": visibleIdx !== idx}
                )}>
                  {/* @TODO use Next/Image */}
                  <img className="h-full object-cover" src={section.img} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {sections.map((section, idx) => (
            <FeatureContentItem key={section.content.title} section={section} idx={idx} setVisibleIdx={setVisibleIdx} />
          ))}
        </div>
      </div>
      
    </section>
  )
}

export default FeatureRow