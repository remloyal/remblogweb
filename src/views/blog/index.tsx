
import Footer from "./footer";
import Header from "../header/header";
import Main from "./main";
import Float from "./Float";
import { ConfigProvider, Button, theme } from 'antd';
import Menu from "../header/Menu";
import { Outlet } from "react-router-dom";
import Snowflake from '../../components/specialEffects/snowflake'

const Index = () => {
    return <div className="blog">
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}>
            {/* <Snowflake /> */}
            <Menu />
            <Header />
            <Main />
            <Footer />
            <Float />
            {/* <Outlet ></Outlet> */}
        </ConfigProvider>
    </div>
}

export default Index;