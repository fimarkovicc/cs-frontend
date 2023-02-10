
import { useState } from "react"
import { FaqItemStyled } from "./FaqItem.styled"

type Props = {
    item: {
        title: string,
        text: string
    }
}

function FaqItem(props: Props) {
    const { title, text } = props.item

    const [itemIsVisible, setItemIsVisible] = useState(false)

    function handleClick(){
        setItemIsVisible(!itemIsVisible)
    }

    return (
        <FaqItemStyled>
            <div className="title" role="button" onClick={handleClick}>
                <h3>{title}</h3>
                <div className={["faq-btn", itemIsVisible ? "active" : ""].join(" ")}>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={itemIsVisible ? "content-visible" : "content-hidden"} dangerouslySetInnerHTML={{ __html: text }}></div>
        </FaqItemStyled>
    )
}

export default FaqItem