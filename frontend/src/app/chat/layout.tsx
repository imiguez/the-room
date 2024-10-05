import styles from "./page.module.css";

export default function ChatRoomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.layout}>{children}</section>
}