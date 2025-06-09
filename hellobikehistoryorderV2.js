// 支付宝哈啰历史订单列表重写
// [rewrite_local]

// ^https:\/\/taxiapi\.hellobike\.com\/api\?hitch\.driver\.getHistoryJourneyList url script-response-body hellobikehistoryorderV2.js.js
// [mitm]

// hostname = taxiapi.hellobike.com

if ($request?.headers["X-Bypass"] === "1") {
    console.log("⏭️ 跳过自身请求");
    $done({});
    return;
}


let body = $response.body;

try {
    let obj = JSON.parse(body);
    let resultlist = obj.data.list;
    let oldcount = resultlist.length;

    while (obj.datatotal === 20) {
        (async () => {
            try {
                const headers = { ...$request.headers };

                let bodyObject = {};
                if ($request.body) {
                    try {
                        bodyObject = JSON.parse($request.body);
                    } catch (e) {
                        console.log("❌ 请求体不是 JSON，跳过处理");
                        $done({});
                        return;
                    }
                }

                // ✅ 设置或覆盖 planStartTime
                if (!("planStartTime" in bodyObject)) {
                    bodyObject.planStartTime = resultlist[-1].planStartTime;
                }
                else {
                    bodyObject["planStartTime"] = resultlist[-1].planStartTime;
                }

                if (!("X-Bypass" in headers)) {
                    headers["X-Bypass"] = "1";
                }

                const requestInfo = {
                    method: $request.method,
                    url: $request.url,
                    headers,
                    body: JSON.stringify(bodyObject)
                };


                const response = await $task.fetch(requestInfo);
                let obj2 = JSON.parse(response)
                resultlist.push(obj2.data.list)
            } catch (e) {
                console.log("❌ 错误:", e);
                $done();
            }
        })();


    }

    obj.data.list = resultlist.filter(item => item.orderStatus === 60);
    console.log(`哈啰历史订单原${oldcount}条,过滤后剩余${obj.data.list.length}条`);

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("🚫 过滤订单状态失败：", e);
    $done({ body }); // 保持原始内容不变
}
