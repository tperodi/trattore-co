import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 10 }, // 10 utenti per 30s
        { duration: '1m', target: 50 }, // 50 utenti per 1m
        { duration: '30s', target: 0 }, // Riduzione graduale
    ],
};

export default function () {
    let res = http.get('http://localhost:3000');
    check(res, { 'status was 200': (r) => r.status === 200 });
    sleep(1);
}
