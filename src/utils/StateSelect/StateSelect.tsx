import React from "react"
import { states } from "@utils/states"
import { useRouter } from "next/router"
import { StateSelectStyled } from "./StateSelect.style"

function StateSelect() {
    const router = useRouter()

    const handleUrlChange = (e: { target: { value: string } }) => {
        e.target.value && router.push(`${e.target.value}`)
    }

    return (
        <StateSelectStyled>
            <select onChange={handleUrlChange} value={"abc"}>
                <option value=''>odaberi županiju</option>
                {states.map((state) => {
                    return (
                        <option key={state.url} value={state.url}>
                            {state.name}
                        </option>
                    )
                })}
            </select>
        </StateSelectStyled>
    )
}

export default StateSelect