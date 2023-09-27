import React from "react"
import Link from "next/link"
import classNames from "classnames"
import { Arrow } from "@/components/icons/Arrow"
import { ButtonVariant } from "@/utils/types"

interface ButtonProps {
  children: React.ReactNode
  url?: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: "base" | "lg"
  fontWeight?: "normal" | "bold"
  borderRadius?: "none" | "base" | "full"
  type?: "submit" | "button" | "reset" | undefined
}

const Button: React.FC<ButtonProps> = (props) => {
  const { size = "base", variant = "standard", borderRadius = "base", url, children, onClick, type = "button" } = props
  if (variant === "link-btn") {
    return (
      <Link className={classNames("group flex gap-2 items-center text-blue-600 px-0 text-lg hover:underline hover:underline-offset-4")} href={url ?? "#"}>
        {children}
        <span className="relative group-hover:left-1">
          <Arrow />
        </span>
      </Link>
    )
  }
  const classes = classNames(
    "cursor-pointer inline-block text-center hover:animate-poop transition-all duration-500",
    { "bg-primary-500 hover:bg-primary-600 text-white" : variant === "standard" },
    { "bg-secondary-500 hover:bg-secondary-600 text-white" : variant === "alternate" },
    { "bg-black text-white" : variant === "black" },
    { "!border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white" : variant === "outline" },
    { "!border-2 border-black text-black hover:bg-black hover:text-white" : variant === "outline-black" },
    { "!border-2 border-white text-white hover:bg-primary-500" : variant === "outline-white" },
    { "px-6 py-2": size === "base" },
    { "px-10 py-3 text-lg font-semibold": size === "lg" },
    { "rounded": borderRadius === "base" },
    { "rounded-full": borderRadius === "full" },
  )

  if (url) {
    return (
      <Link className={classes} href={url}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button