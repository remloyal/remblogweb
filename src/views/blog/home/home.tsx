import Menu from "../header/Menu";
import './home.less'
const Home = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Menu />
      <div className="home" style={{backgroundImage:`url('http://127.0.0.1:7001/static/image/2.jpg')`}}> This is Tag page</div>
    </div>
  );
};
export default Home;
