// 支付宝哈啰历史订单列表重写
// [rewrite_local]

// ^https:\/\/taxiapi\.hellobike\.com\/api\?hitch\.driver\.getHistoryJourneyList url script-response-body hellobike_filter.js
// [mitm]

// hostname = taxiapi.hellobike.com


let body = $response.body;

try {
  let obj = JSON.parse(body);
  
  let oldcount = obj.data?.total || 0;
  if (obj?.data?.list && Array.isArray(obj.data.list)) {
    obj.data.list = obj.data.list.filter(item => item.orderStatus === 60);
  }
  console.log(`哈啰历史订单原${oldcount}条,过滤后剩余${obj.data.list.length}条`);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log("🚫 过滤订单状态失败：", e);
  $done({ body }); // 保持原始内容不变
}
