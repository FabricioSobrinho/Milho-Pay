import styles from "../styles/Loader.module.css";

import loaderImage from "../assets/images/loading.svg";

function Loader() {
  return (
    <div className={styles.mainLoader}>
      <img src={loaderImage} alt="loading" />
    </div>
  );
}

export default Loader;
