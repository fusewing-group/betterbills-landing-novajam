import SlidingText from "@/components/elements/SlidingText/SlidingText"
import FakeMessageBox from "@/components/elements/FakeMessageBox/FakeMessageBox"
import Button from "@/components/elements/Button/Button"

const content = {
  "title": "Turn your website visitors into customers with",
  "subtitle": "Tidio is a top-rated platform for small and medium businesses to grow sales through outstanding customer service.",
  "button": {
    "text": "Get started for free",
    "url": "/register"
  }
}

const Hero = () => {
  return (
    <div className="py-16 flex flex-col items-center bg-gradient-to-b from-blue-950 from-45% to-blue-700 to-100%">
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-center font-semibold text-5xl text-white leading-snug max-w-screen-lg mx-auto mb-8">
          {content.title}{" "}
          <SlidingText content={[
            { text: "live chat"},
            { text: "chatbots"},
            { text: "ticketing"},
          ]}/>
        </h1>
        <p className="text-center text-xl text-gray-300 leading-relaxed max-w-screen-md mx-auto mb-6">
          {content.subtitle}
        </p>
        <Button variant="secondary" url={content.button.url}>
          {content.button.text}
        </Button>
      </div>
      <div className="w-full md:w-[600px] h-[500px]">
        <FakeMessageBox />
      </div>
    </div>
  )
}

export default Hero