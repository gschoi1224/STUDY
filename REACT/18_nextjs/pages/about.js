import Layout from '../components/Layout';

const About = ({ url }) => {
    console.log(url);
    return (
        <Layout>
            <h2>당신이 검색한 쿼리는 {url}입니다.</h2>
        </Layout>
    );
};

export default About;
