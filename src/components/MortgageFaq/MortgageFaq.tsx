import FaqItem from "./FaqItem/FaqItem"
import { faqs } from "src/constants/faqs"
import { MortgageFaqStyled } from "./MortgageFaq.style"

function MortgageFaq(){

    return(
        <MortgageFaqStyled>
            <h2 id="faq">Često postavljena pitanja</h2>
            <ul>
                {faqs.map((item) => {
                    return <li key={item.title}><FaqItem item={item} /></li>
                })}
            </ul>
        </MortgageFaqStyled>
    )
}

export default MortgageFaq