import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

// 유저 리스트 데이터 불러오기
const getList = () => {
    const userBuffer = readFileSync('data/users.json');
    const usersString = userBuffer.toString();

    if (!usersString) {
        return [];
    }
    const users: StoredUserType[] = JSON.parse(usersString);
    return users;
};

// email의 유저가 있는지 확인하기
const exist = ({ email }: { email: string }) => {
    const users = getList();
    return users.some(user => user.email === email);
};

// 유저 리스트 저장하기
const write = async (users: StoredUserType[]) => {
    writeFileSync('data/users.json', JSON.stringify(users));
};

// email 또는 id의 유저 불러오기
const find = ({ email, id }: { email?: string; id?: number }) => {
    const users = getList();
    return users.find(user => user.email === email || user.id === id);
};

export default { getList, exist, write, find };
