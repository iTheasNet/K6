import { check, group, sleep } from "k6";
import http from "k6/http";

export let options = {
    stages: [
        { duration: "10s", target: 15 },
        { duration: "20s", target: 15 },
        { duration: "10s", target: 0 }
    ],
    thresholds: {
        http_req_duration: ["p(95)<250"]
    },
    ext: {
        loadimpact: {
            name: "ltr-code3-imageservice-staging.azurewebsites.net"
        }
    }
};

export default function () {
    group("Swagger RestFull Front page", function () {
        let res = http.get(
            "http://www.msdn.com"
        );
        check(res, {
            "is status 200": r => r.status === 200
        });
        sleep(5);
    });
}
