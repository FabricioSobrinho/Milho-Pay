import styles from "../styles/navbar.module.css";
import Button from "../components/forms/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const tentName = Cookies.get("loggedTent");
  const navigate = useNavigate();
  return (
    <div className={styles.mainNavbar}>
      <div className={styles.leftNavbar} onClick={() => navigate("/tent")}>{tentName}</div>
      <div className={styles.rightNavbar}>
        <Button
          text="Pratos"
          type="nav"
          handleClick={() => navigate("/menu")}
        />
        <Button
          text="Bebidas"
          type="nav"
          handleClick={() => navigate("/drink")}
        />
        <Button
          text="Vendas"
          type="nav"
          handleClick={() => navigate("/order")}
        />
      </div>
    </div>
  );
}

export default Navbar;
