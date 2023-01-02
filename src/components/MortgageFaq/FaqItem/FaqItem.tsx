
import { useState } from "react"
import { FaqItemStyled } from "./FaqItem.styled"

type Props = {
    item: {
        title: string,
        content: string
    }
}

function FaqItem(props: Props) {
    const { title, content } = props.item

    const [itemIsVisible, setItemIsVisible] = useState(false)

    function handleClick(){
        setItemIsVisible(!itemIsVisible)
    }

    return (
        <FaqItemStyled>
            <h3 className="title" onClick={handleClick}>{title}</h3>
            <div className={itemIsVisible ? "content-visible" : "content-hidden"} dangerouslySetInnerHTML={{ __html: content }}></div>
        </FaqItemStyled>
    )
}

export default FaqItem