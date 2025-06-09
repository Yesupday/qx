// ^https:\/\/.*\.tianyancha\.com\/.* url script-response-body tianyancha_vip_bypass.js

if (!$response.headers['Content-Type']?.includes('application/json')) {
  console.log("⛔ 天眼查非 JSON 响应，跳过处理");
  $done({});
  return;
}

let body = $response.body;

try {
  if (body.includes('"special":"mustvip"')) {
    body = body.replace(/"special":"mustvip"/g, '"special":""');
    console.log('🔓 已去除 天眼查mustvip 标识');
  }
  $done({ body });
} catch (e) {
  console.log('❌ 天眼查替换失败:', e);
  $done({ body });
}
