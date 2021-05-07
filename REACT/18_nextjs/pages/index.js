import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    console.log(router);
    return (
        <div className={styles.container}>
            <Head>
                <title>Next.js 연습</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2>
                <Link href="/about">
                    <a>소개</a>
                </Link>
            </h2>
            <h2>
                <Link href="/search?query=검색해">
                    <a>검색</a>
                </Link>
            </h2>
            <h2>
                <Link href="/ssr-test">SSR 테스트</Link>
            </h2>
        </div>
    );
}
