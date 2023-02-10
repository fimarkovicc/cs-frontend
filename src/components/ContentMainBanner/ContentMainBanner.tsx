import React from "react"
import { ContentMainBannerStyled } from "./ContentMainBanner.style"
import StateSelect from "@global/utils/StateSelect/StateSelect"

function ContentMainBanner() {
    return (
        <ContentMainBannerStyled>
            <h1>Pratimo, analiziramo, informiramo</h1>
            <p>42 grada, 157 općina, 62530 stanova</p>
            <StateSelect />
        </ContentMainBannerStyled>
    )
}

export default ContentMainBanner