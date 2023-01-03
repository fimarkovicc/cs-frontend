import { useState, useEffect } from "react"

const SMALL_DESKTOP_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 992
const TABLET_BREAKPOINT = 768

const useScreenSize = () => {
    const [width, setWidth] = useState<null | number>(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth)
            const handleResize = () => setWidth(window.innerWidth)
            window.addEventListener("resize", handleResize)

            return () => {
                window.removeEventListener("resize", handleResize)
            }
        }
    }, [])

    if (!width) {
        return null
    }

    return {
        width,
        isMobile: width < TABLET_BREAKPOINT,
        isTablet: width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT,
        isHandheld: width < DESKTOP_BREAKPOINT,
        isLargeHandheld: width > DESKTOP_BREAKPOINT && width <= SMALL_DESKTOP_BREAKPOINT,
        isDesktop: width >= DESKTOP_BREAKPOINT,
    }
}

export default useScreenSize