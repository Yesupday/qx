// ^https:\/\/.*\.tianyancha\.com\/.* url script-response-body tianyancha_vip_bypass.js


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
