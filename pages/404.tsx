import React from "react"
import Link from "next/link"

function Error404() {
    return (
        <div className="error-page">
            <h1>Error 404</h1>
            <h2>Stranica ne posoji</h2>
            <p>natrag na <Link href="/">početnu stranicu</Link></p>
        </div>
    )
}

export default Error404