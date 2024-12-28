import styles from "../styles/navbar.module.css";
import Button from "../components/forms/Button";
import Cookies from "js-cookie";

function Navbar() {
  const tentName = Cookies.get("loggedTent");

  return (
    <div className={styles.mainNavbar}>
      <div className={styles.leftNavbar}>{tentName}</div>
      <div className={styles.rightNavbar}>
        <Button text="Pratos" type="nav" />
        <Button text="Bebidas" type="nav" />
        <Button text="Vendas" type="nav" />
      </div>
    </div>
  );
}

export default Navbar;
