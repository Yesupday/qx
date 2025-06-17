// 深圳限行免限行申请通行证重写
// [rewrite_local]
// ^https:\/\/gzh\.szjj\.sz\.gov\.cn\/h5\/static\/js\/.*\.js$ url script-response-body https://github.com/Yesupday/qx/raw/refs/heads/master/szmxx.js
// [mitm]
// hostname = gzh.szjj.sz.gov.cn

let body = $response.body;

try {
  const originalPattern = /carPlateTypeStr:\s*'请选择',[\s\S]*?ticket:\s*''/;

  const replacement2 = `
    carPlateTypeStr: '蓝牌',
    carPlateTypeCode: ['02'],
    carPlateSyncPicker: true,
    carPlateData: [{
      'name': '请选择',
      'value': ''
    }, {
      'value': '02',
      'name': '蓝牌'
    }, {
      'value': '06',
      'name': '黑牌'
    }, {
      'value': '52',
      'name': '小型新能源车号牌'
    }],
    carTypeStr: '小型轿车',
    carTypeCode: ['K33'],
    carTypeSyncPicker: true,
    carTypeData: [{
      'name': '请选择',
      'value': ''
    }, {
      'value': 'K31',
      'name': '小型普通客车'
    }, {
      'value': 'K32',
      'name': '小型越野客车'
    }, {
      'value': 'K33',
      'name': '小型轿车'
    }, {
      'value': 'K34',
      'name': '小型专用客车'
    }, {
      'value': 'K41',
      'name': '微型普通客车'
    }, {
      'value': 'K42',
      'name': '微型越野客车'
    }, {
      'value': 'K43',
      'name': '微型轿车'
    }, {
      'value': 'K38',
      'name': '小型专用校车'
    }],
    showKeyboard: false,
    showDatePicker: false,
    showStuDatePicker: false,
    applyDateStr: '',
    startbox: false,
    endbox: false,

    endTimeData: (0, _moment2.default)().format('YYYY') + '-06-28',
    eightTimeData: (0, _moment2.default)().format('YYYY') + '-06-27',
    startTimeData: (0, _moment2.default)().format('YYYY') + '-06-26',
    name: '',
    newMtDateTimeMsg: (0, _moment2.default)().add(3, 'days').format('YYYY-MM-DD'),
    formatTime: '',
    informTime: (0, _moment2.default)().add(1, 'days').format('YYYY-MM-DD'),
    newInformTime: (0, _moment2.default)().add(1, 'days').format('YYYY-MM-DD'),
    nowformTime: (0, _moment2.default)().format('YYYY-MM-DD'),
    licensePlateNo: '',
    cur_license_id: 'K31',
    cur_plate_id: '02',
    car_number: '',
    vehicleIdentifyNoLast4: '6057',
    mobilephone: '13011111111',
    illegalData: [],
    myIllegalData: [],
    licenseSelectShow: false,
    licenseSelectMassage: '小型普通客车',
    licenseSelectData: [{
      'id': 'K31',
      'str': '小型普通客车'
    }, {
      'id': 'K32',
      'str': '小型越野客车'
    }, {
      'id': 'K33',
      'str': '小型轿车'
    }, {
      'id': 'K34',
      'str': '小型专用客车'
    }, {
      'id': 'K41',
      'str': '微型普通客车'
    }, {
      'id': 'K42',
      'str': '微型越野客车'
    }, {
      'id': 'K43',
      'str': '微型轿车'
    }, {
      'id': 'K38',
      'str': '小型专用校车'
    }],
    plateSelectShow: false,
    plateSelectMassage: '蓝牌',
    plateSelectData: [{
      'id': '02',
      'str': '蓝牌'
    }, {
      'id': '06',
      'str': '黑牌'
    }, {
      'id': '52',
      'str': '小型新能源车号牌'
    }],
    beginPicker: false,
    isOpen: false,
    ticket: ''`;

  if (originalPattern.test(body)) {
    body = body.replace(originalPattern, replacement2);
    console.log("✅ 深圳限行成功替换 return 配置块");
  } else {
    console.log("⚠️ 深圳限行未找到 return 匹配块");
  }

  const pattern = /car_number:\s*'',\s*cjh:\s*'',\s*phone:\s*'',\s*showKeyboard:\s*false,\s*plateTypePicker:\s*false,\s*plateTypeName:\s*'蓝牌',\s*plateType:\s*\['02'\],/;

  const replacement = `car_number: '粤KUE525',
      cjh: '6057',
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
