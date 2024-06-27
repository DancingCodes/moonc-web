import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "@/pages/Home"
import useCursor from "@/hook/useCursor";
import MediaBg from "@/components/MediaBg";

import {touristAccess} from "@/api/home";
// 添加访问记录
touristAccess().then()

const App: React.FC = () => {
    // 鼠标指针
    useCursor()

    const AppStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
    };

    return (
        <>
            <MediaBg/>
            <div className={"App"} style={AppStyle}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App
