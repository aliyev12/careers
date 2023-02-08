import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className=""> home page</h1>
      <a href="@">Click me</a>
      <div></div>
      <button className="primary">Click me</button>
      <button className="secondary">Click me</button>
    </div>
  );
}

// <Image
// src="/vercel.svg"
// alt="Vercel Logo"
// className={styles.vercelLogo}
// width={100}
// height={24}
// priority
// />

// <Image
// className={styles.logo}
// src="/next.svg"
// alt="Next.js Logo"
// width={180}
// height={37}
// priority
// />
// <div className={styles.thirteen}>
// <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
