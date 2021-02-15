#! /usr/bin/env node

const { program } = require('commander');

const fs = require('fs');
const path = require('path');
// commander를 사용하더라도 여전히 명령어를 외워야 함. inquirer로 cli 명령어를 사용할 때 사용자와 상호작용할 수 있도록 만들 수 있다
const inquirer = require('inquirer');
const chalk = require('chalk'); // 색 추가

const htmlTemplate = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Template</title>
    </head>
    <body>
        <h1>Hello</h1>
        <p>CLI</p>
    </body>
</html>
`;

const routerTempate = `
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
`;

const exist = dir => { // 폴더 존재 확인 함수
    try {
        fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (e) {
        return false;
    }
};

const mkdirp = dir => { // 경로 생성 함수
    const dirname = path // 상대적인 위치를 파악한 후 순차적으로 상위 폴더부터 만들어 나감
        .relative('.', path.normalize(dir))
        .split(path.sep)
        .filter(p => !!p);
    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
        if (!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder);
        }
    });
};

const makeTemplate = (type, name, directory) => { // 템플릿 생성 함수
    mkdirp(directory);
    if (type === 'html') {
        const pathToFile = path.join(directory, `${name}.html`);
        if (exist(pathToFile)) {
            console.error(chalk.bold.red('이미 해당 파일이 존재합니다.'));
        } else {
            fs.writeFileSync(pathToFile, htmlTemplate);
            console.log(chalk.green(pathToFile, '생성 완료'));
        }
    } else if (type === 'express-router') {
        const pathToFile = path.join(directory, `${name}.js`);
        if (exist(pathToFile)) {
            console.error(chalk.bold.red('이미 해당 파일이 존재합니다.'));
        } else {
            fs.writeFileSync(pathToFile, routerTempate);
            console.log(chalk.green(pathToFile, '생성 완료'));
        }
    } else {
        console.error(chalk.bold.red('html 또는 express-router 둘 중 하나를 입력하세요.'));
    }
};

program
    .version('0.0.1', '-v --version') // 프로그램의 버전 설정
    .name('cli'); // 명령어의 이름

program
    .command('template <type>') // 명령어를 설정하는 메서드 <>는 필수라는 의미로 넣지 않으면 에러가 발생함
    .usage('<type> --filename [filename] --path [path]') // 명령어의 사용법 설정, -h 또는 --help을 붙였을 때 표시됨
    .description('템플릿을 생성합니다.') // 명령어에 대한 설명을 설정
    .alias('tmpl') // 명령어의 별칭을 설정 cli template html 대신 cli tmpl html 가능
    .option('-f, --filename [filename]', '파일명을 입력하세요.', 'index') // [options]는 필수가 아닌 선택
    .option('-d, --directory [path]', '생성 경로를 입력하세요.', '.') // (옵션 명령어, 옵션에 대한 설명, 옵션 기본값)
    .action((type, options) => { // 실제 동작을 정의하는 메서드 <type> 같은 필수 요소나 옵션들을 매개변수로 가져올 수 있음
        console.log(type, options.filename, options.directory);
        makeTemplate(type, options.filename, options.directory);
    });

program.action((cmd, args) => { // cmd : 명령어에 대한 전체적인 내용, args : cli 명령어 다음에 오는 인수가 들어 있음 (cli copy 면 ['copy'])
        if (args) {
            console.log(chalk.bold.red('해당 명령어를 찾을 수 없습니다.'));
            program.help();
        } else {
            inquirer.prompt([{ // 질문 목록을 받고, 프로미스를 통해 답변을 반환함
                    type: 'list', // 질문의 종류, input(평범한 답변), checkbox, list(다중택일), password, confirm(Yes or No) 등이 있음
                    name: 'type', // 질문의 이름
                    message: '템플릿 종류를 선택하세요.', // 사용자에게 표시되는 문자열
                    choices: ['html', 'express-router'], // type이 checkbox, list 등인 경우 선택지를 배열로 넣음
                }, {
                    type: 'input',
                    name: 'name',
                    message: '파일의 이름을 입력하세요.',
                    default: 'index',
                }, {
                    type: 'input',
                    name: 'directory',
                    message: '파일이 위치할 폴더의 경로를 입력하세요.',
                    default: '.',
                }, {
                    type: 'confirm',
                    name: 'confirm',
                    message: '생성하시겠습니까?',
                }])
                .then(answers => {
                    if (answers.confirm) {
                        makeTemplate(answers.type, answers.name, answers.directory);
                        console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
                    }
                });
        }
    })
    .parse(process.argv);

/*
program
    .command('*', { noHelp: true }) // 템플릿을 제외한 다른 모든 명령어를 입력했을 경우 실행
    .action(() => {
        console.log('해당 명령어를 찾을 수 없습니다.');
        program.help();
    });

program
    .parse(process.argv); // 명령어와 옵션을 파싱
*/