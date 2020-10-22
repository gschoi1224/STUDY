setInterval(() => {
    console.log('시작');
    try {
        throw new Error('서버를 고장내주마!');
    } catch (err) {
        console.error(err);
    }
}, 1000);
// 멀티스레드에서는 스레드 하나가 멈추면 그 일을 다른 스레드가 대신하지만 노드의 메인 스레드는 하나 뿐이므로 그 하나를 소중히 보호해야함
