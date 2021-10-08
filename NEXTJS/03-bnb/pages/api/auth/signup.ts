import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import bcrypt from 'bcryptjs';
import user from '../../../lib/data/user';
import { StoredUserType } from '../../../types/user';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // 1. api method가 POST인지 확인
    if (req.method === 'POST') {
        const { email, firstname, lastname, password, birthday } = req.body;
        // req.body에 필요한 값이 전부 들어 있는지 확인
        if (!email || !firstname || !lastname || !password || !birthday) {
            res.statusCode = 400;
            return res.send('필수 데이터가 없습니다.');
        }
        // 이메일이 중복인지 확인
        const userExist = Data.user.exist({ email });
        if (userExist) {
            res.statusCode = 409;
            return res.send('이미 가입된 이메일입니다.');
        }

        // 패스워드를 암호화
        const hashedPassword = bcrypt.hashSync(password, 8);

        // 유저 정보를 추가
        const users = Data.user.getList();
        let userId;
        if (users.length === 0) {
            userId = 1;
        } else {
            userId = users[users.length - 1].id + 1;
        }
        const newUser: StoredUserType = {
            id: userId,
            email,
            firstname,
            lastname,
            password: hashedPassword,
            birthday,
            profileImage: '/static/image/user/default_user_profile_image.jpg',
        };

        Data.user.write([...users, newUser]);

        // 추가된 유저의 정보와 token을 전달
        const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET);
        res.setHeader(
            'Set-Cookie',
            `access_token=${token}; path=/; expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3,
            ).toISOString()}; httponly`, // 3일
        );

        const newUserWithoutPassword: Partial<
            Pick<StoredUserType, 'password'>
        > = newUser;
        delete newUserWithoutPassword.password;
        res.statusCode = 200;
        return res.send(newUser);
    }
    res.statusCode = 405;

    return res.end();
};
