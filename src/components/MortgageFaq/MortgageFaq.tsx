import FaqItem from "./FaqItem/FaqItem"
import { MortgageFaqStyled } from "./MortgageFaq.style"

type MortgageFaqProps = {
    data: {
        title: string;
        text: string;
    }[]
}

function MortgageFaq(props: MortgageFaqProps){
    const {data} = props

    return(
        <MortgageFaqStyled>
            <h2 id="faq">Često postavljena pitanja</h2>
            <ul>
                {data.map((item) => {
                    return <li key={item.title}><FaqItem item={item} /></li>
                })}
            </ul>
        </MortgageFaqStyled>
    )
}

export default MortgageFaq