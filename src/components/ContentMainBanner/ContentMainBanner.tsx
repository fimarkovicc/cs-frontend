import React from "react"
import { ContentMainBannerStyled } from "./ContentMainBanner.style"
import { states } from "src/utils/states"
import { useRouter } from "next/router"

function ContentMainBanner() {
    const router = useRouter()

    const handleUrlChange = (e: { target: { value: string } }) => {
        e.target.value && router.push(`${e.target.value}`)
    }

    return (
        <ContentMainBannerStyled>
            <h1>Pratimo, analiziramo, informiramo</h1>
            <p>42 grada, 157 općina, 62530 stanova</p>
            <select onChange={handleUrlChange}>
                <option>--odaberi županiju--</option>
                {states.map((state) => {
                    return (
                        <option key={state.url} value={state.url}>
                            {state.name}
                        </option>
                    )
                })}
            </select>
        </ContentMainBannerStyled>
    )
}

export default ContentMainBanner