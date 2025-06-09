// 支付宝哈啰历史订单列表重写
// [rewrite_local]

// ^https:\/\/taxiapi\.hellobike\.com\/api\?hitch\.driver\.getHistoryJourneyList url script-response-body hellobike_filter.js
// [mitm]

// hostname = taxiapi.hellobike.com


let body = $response.body;

try {
  let obj = JSON.parse(body);
  
  if (obj?.data?.list && Array.isArray(obj.data.list)) {
    obj.data.list = obj.data.list.filter(item => item.orderStatus !== 60);
    obj.data.total = obj.data.list.length;
  }
  console.log(`哈啰历史过滤订单后剩余${obj.data.total}条`);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log("🚫 过滤订单状态失败：", e);
  $done({ body }); // 保持原始内容不变
}
