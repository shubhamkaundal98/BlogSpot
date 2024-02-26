function Button({
    children,
    type = "button",
    bgColor = "",
    textColor = "text-white",
    className = "",
    ...props
}) {

    return (
        <button className={`inline-bock px-6 py-2 duration-200 hover:text-blue-900 border-x border-black ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )

}

export default Button