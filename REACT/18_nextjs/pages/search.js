import React from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default () => {
    const router = useRouter();
    const keyword = router.query.query;
    return (
        <Layout>
            <div>{keyword}</div>
        </Layout>
    );
};
