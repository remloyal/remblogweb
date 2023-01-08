
import Picture from "./Picture";
import Menu from "./Menu";
import Centers from "./Centers";

const Header = () => {
    return <div className="header" style={{overflowX:"hidden"}}>
        <Centers />
        <Picture />
    </div>
}

export default Header;