import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // 로그아웃하기
        if (req.method === 'DELETE') {
            // 만료일을 변경해서 쿠키가 자동으로 삭제되도록
            res.setHeader(
                'Set-Cookie',
                'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
            );
            res.statusCode = 204;
            return res.end();
        }
    } catch (e) {
        console.log(e);
        return res.send(e.message);
    }
    res.statusCode = 405;
    return res.end();
};
