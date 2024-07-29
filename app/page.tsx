import Image from 'next/image';
import style from './page.module.scss';

export default function Home() {
  return (
    <main>
      <div className={style.bgPlayerMask}></div>
      <div className={style.bgPlayer}></div>
    </main>
  );
}
