import './index.scss'
import {useEffect} from "react";
import isMobileDevice from "@/utils/getIsMobileDevice";

// 鼠标指针，仅服务于Pc
const useCursor = () => {
    useEffect(() => {
        if (isMobileDevice) {
            return
        }
        const body = document.body;
        const CursorDom = document.createElement('div')
        CursorDom.classList.add('Cursor')
        document.body.appendChild(CursorDom)

        const handleMouseEnter = () => {
            CursorDom.style.display = 'block'
        };
        const handleMouseMove = (e: MouseEvent) => {
            CursorDom.style.left = `${e.clientX}px`
            CursorDom.style.top = `${e.clientY}px`
        }
        const handleMouseClick = () => {
            CursorDom.classList.remove('cursorAnimation')
            // 触发重绘
            void CursorDom.offsetWidth;
            CursorDom.classList.add('cursorAnimation')
        }
        const handleMouseLeave = () => {
            CursorDom.style.display = 'none'
        };
        body.addEventListener('mousemove', handleMouseMove)
        body.addEventListener('click', handleMouseClick)
        body.addEventListener("mouseleave", handleMouseLeave);
        body.addEventListener("mouseenter", handleMouseEnter);
        return () => {
            body.removeEventListener('mousemove', handleMouseMove);
            body.removeEventListener('click', handleMouseClick);
            body.removeEventListener("mouseleave", handleMouseLeave);
            body.removeEventListener("mouseenter", handleMouseEnter);
            body.removeChild(CursorDom)
        };
    }, []);
}
export default useCursor
