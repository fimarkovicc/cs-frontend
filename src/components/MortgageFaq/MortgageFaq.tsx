import FaqItem from "./FaqItem/FaqItem"
import { faqs } from "src/constants/faqs"

function MortgageFaq(){

    return(
        <>
            <h2 id="faq">Često postavljena pitanja</h2>
            <ul>
                {faqs.map((item) => {
                    return <li key={item.title}><FaqItem item={item} /></li>
                })}
            </ul>
        </>
    )
}

export default MortgageFaq