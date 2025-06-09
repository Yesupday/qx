// 支付宝哈啰历史订单列表重写
// [rewrite_local]

// ^https:\/\/taxiapi\.hellobike\.com\/api\?hitch\.driver\.getHistoryJourneyList url script-response-body hellobikehistoryorderV2.js
// [mitm]

// hostname = taxiapi.hellobike.com

if ($request?.headers["X-Bypass"] === "1") {
    console.log("⏭️ 哈哈 跳过自身请求");
    $done({});
    return;
}

let body = $response.body;

(async () => {
    try {
        let obj = JSON.parse(body);
        let resultlist = obj.data.list || [];
        let oldcount = resultlist.length;

        let headers = { ...$request.headers };
        headers["X-Bypass"] = "1"; // 避免重复请求自己

        let bodyObject = {};
        if ($request.body) {
            try {
                bodyObject = JSON.parse($request.body);
            } catch (e) {
                console.log("❌ 哈哈 请求体不是 JSON，跳过处理");
                $done({});
                return;
            }
        }
        let num = 1;

        while (obj.data.total === 20) {
            bodyObject.planStartTime = resultlist[resultlist.length - 1]?.planStartTime;
            console.log(`哈哈准备翻到第${++num}页,时间戳为${bodyObject.planStartTime}`);

            const requestInfo = {
                method: $request.method,
                url: $request.url,
                headers,
                body: JSON.stringify(bodyObject)
            };

            try {
                const response = await $task.fetch(requestInfo);

                if (!response?.body) {
                    console.log("❗ 响应为空 response.body =", response.body);
                    break;
                }

                obj = JSON.parse(response.body);

                if (!obj?.data?.list) {
                    console.log("❗ obj.data.list 不存在，obj =", JSON.stringify(obj));
                    break;
                }

                const nextList = obj.data.list;
                if (nextList.length === 0) break;

                resultlist = resultlist.concat(nextList);
            } catch (e) {
                console.log(`❌ 哈哈翻页请求失败: ${e.message}`);
                break;
            }


        }

        const filtered = resultlist.filter(item => item.orderStatus === 60);
        obj.data.list = filtered;
        obj.data.total = filtered.length;

        console.log(`✅ 哈哈历史订单原 ${oldcount} 条，过滤后剩余 ${filtered.length} 条`);
        $done({ body: JSON.stringify(obj) });

    } catch (e) {
        console.log("🚫 哈哈过滤订单状态失败：", e.message);
        $done({ body }); // 返回原始数据
    }
})();
