import { PropsWithChildren } from "react";
import { APP_NAME } from "../config";
import Settings from "./Settings";
import styles from "./Layout.module.css";
import Tooltip from "./charts/Tooltip";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.aside}>
          <section>
            <h1>{APP_NAME}</h1>
            <Settings />
          </section>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
      <Tooltip />
    </>
  );
}
