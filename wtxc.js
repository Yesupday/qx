// 违停返回现场申报重写
// [rewrite_local]
// ^https:\/\/gzh\.szjj\.sz\.gov\.cn\/h5\/static\/js\/.*\.js$ url script-response-body https://github.com/Yesupday/qx/raw/refs/heads/master/wtxc.js
// [mitm]
// hostname = gzh.szjj.sz.gov.cn



let body = $response.body;

try {
  // 替换 licensePlateNo: ''
  body = body.replace(/licensePlateNo:\s*''/, "licensePlateNo: '粤KUE525'");
  body = body.replace(/carPlateTypeStr:\s*'请选择'/, "carPlateTypeStr: '小型汽车'");
  body = body.replace(/carPlateSyncPicker:\s*false,/, "carPlateSyncPicker: true,");

  body = body.replace(/if\s*\(\s*json\.code\s*===\s*'0000'\s*\)\s*{/,
    `if (json.code !== '0000') {
    _this2.$vux.alert.show({
        title: 'qx调试提示',
        content: JSON.stringify(json, null, 2)
    });}
    if (json.code === '0000') {
    `);
  console.log("✅ 违停返回现场申报重写替换完成: licensePlateNo → 粤KUE525, carPlateTypeStr → 小型汽车, carPlateSyncPicker → true");

} catch (e) {
  console.log("❌ 违停返回现场申报重写替换失败:", e);
}

$done({ body });
