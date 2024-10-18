interface TextBlockProps {
    header: string;
    subHeader: string;
}

const TextBlock = ({header, subHeader} : TextBlockProps) => {

    return (
        <div>
            <h1 className="text-6xl lg:text-8xl text-white relative z-20 mt-64">
                {header}
            </h1>
            <p className=" text-center mt-2 text-neutral-300 relative z-20 mb-40">
                {subHeader}
            </p>
        </div>
    )
}

export default TextBlock;