import Section from "@/components/elements/Section/Section"
import GridBox from "@/components/elements/GridBox/GridBox"
import Image from "next/image"
import classNames from "classnames"

interface FeatureProps {
  data: {
    title: string
    label?: string
    subtitle?: string
    content?: string
    media?: {
      type: string
      src: string
    }
  }
  mediaPosition?: "left" | "right"

}

const Feature: React.FC<FeatureProps> = ({ data, mediaPosition = "left" }) => {
  const { title, label, subtitle, content, media } = data
  return (
    <Section framed={false}>
      <GridBox columns={2} gap={0}>
        <div className={classNames({ "lg:col-start-2" : mediaPosition === "right"})}>
          <Image
            className="w-full h-full object-cover"
            src={media?.src ?? ""}
            alt="Teacher Training"
            width={500}
            height={500}
            />
        </div>
        <div className={classNames("px-4 pb-20 md:px-8 lg:p-20 xl:p-32", { "lg:col-start-1 lg:row-start-1": mediaPosition === "right"})}>
          {label && (
            <p className="uppercase tracking-widest">
              {label}
            </p>
          )}
          <h2 className="text-5xl lg:text-6xl leading-snug lg:leading-snug font-bold max-w-4xl my-5 text-secondary-700">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg leading-8 lg:text-xl lg:leading-10 font-medium text-center mb-12 max-w-4xl">
              {subtitle}
            </p>
          )}
          <p className="text-lg mb-3">
            {content}
          </p>
        </div>
        
      </GridBox>
    </Section>
  )
}

export default Feature