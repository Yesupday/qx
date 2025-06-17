// 深圳限行免限行申请通行证重写
// [rewrite_local]
// ^https:\/\/gzh\.szjj\.sz\.gov\.cn\/h5\/static\/js\/.*\.js$ url script-response-body https://github.com/Yesupday/qx/raw/refs/heads/master/szmxx.js
// [mitm]
// hostname = gzh.szjj.sz.gov.cn

let body = $response.body;

try {
  const pattern = /car_number:\s*'',\s*cjh:\s*'',\s*phone:\s*'',\s*showKeyboard:\s*false,\s*plateTypePicker:\s*false,\s*plateTypeName:\s*'蓝牌',\s*plateType:\s*\['02'\],/;

  const replacement = `car_number: '粤KUE525',
      cjh: '',
      phone: '13011111111',
      showKeyboard: true,
      plateTypePicker: true,
      plateTypeName: '蓝牌',
      plateType: ['02'],`;

  if (pattern.test(body)) {
    body = body.replace(pattern, replacement);
    console.log("✅ 深圳限行免限行申请通行证重写替换车牌信息成功：car_number, cjh, phone 等已设置默认值");
  } else {
    console.log("ℹ️ 深圳限行免限行申请通行证重写未找到指定 car_number 字段段落");
  }
} catch (e) {
  console.log("❌ 深圳限行免限行申请通行证重写替换发生异常：", e);
}

$done({ body });
