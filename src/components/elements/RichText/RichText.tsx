import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

const RichText: React.FC<{htmlString: string}> = ({htmlString}) => {
  return (
    <ReactMarkdown
      components={{
        a: (props) => {
          return (
            <Link className="text-blue-500 hover:text-blue-600 underline-offset-4 transition-colors duration-300 ease"  href={props.href ?? ""}>
              {props.children}
            </Link>
          )
        },
        table: ({...props}) => {
          return (
            <div className="w-full overflow-x-auto">
              <table className="border">
                {props.children}
              </table>
            </div>
          )
        },
        th: ({...props}) => {
          return (
            <th className="bg-primary-50 border leading-tight px-4">
              {props.children}
            </th>
          )
        },
        td: ({...props}) => {
          return (
            <td className="border leading-tight px-4 py-0 lg:px-4 lg:py-0">
              {props.children}
            </td>
          )
        },
        video: ({...props}) => {
          return (
            <video className="" src={props.src} controls>
              <track kind="captions" label={props.title} />
            </video>
          )
        }
      }}
      rehypePlugins={[rehypeRaw]} 
    >
      {htmlString}
    </ReactMarkdown>
  )
}

export default RichText