// # 哈哈替换车牌默认值
// [rewrite_local]
// ^https:\/\/gzh\.szjj\.sz\.gov\.cn\/h5\/static\/js\/54\..*\.js$ url script-response-body https://github.com/Yesupday/qx/raw/refs/heads/master/wtxc.js
// [mitm]
// hostname = gzh.szjj.sz.gov.cn



let body = $response.body;

try {
  // 替换 licensePlateNo: ''
  body = body.replace(/licensePlateNo: *''/, "licensePlateNo: '粤KUE525'");
  body = body.replace(/carPlateTypeStr: *'请选择'/, "carPlateTypeStr: '小型汽车'");
  body = body.replace(/carPlateSyncPicker: *false,/, "carPlateSyncPicker: true,");
  console.log("✅ 成功替换 licensePlateNo");
} catch (e) {
  console.log("❌ 替换失败:", e);
}

$done({ body });
