let body = JSON.parse($response.body);

// 检查数据是否存在
if (body?.data?.nsmxList) {
  const originalList = body.data.nsmxList;
  const beforeCount = originalList.length;

  // 过滤条件
  const filteredList = originalList.filter(item =>
    item.grsdssdxmDm !== "0108" 
    &&!item.kjywrMc?.includes("威")
    &&!item.kjywrMc?.includes("富")
  );

  const sreSum = filteredList.reduce((sum, item) => sum + (item.sre || 0), 0);
  const ybtseSum = filteredList.reduce((sum, item) => sum + (item.ybtse || 0), 0);

  // 替换列表和字段
  body.data.nsmxList = filteredList;
  body.data.rowCount = filteredList.length;
  body.data.sreHj = Number(sreSum.toFixed(2));
  body.data.ybtseHj = Number(ybtseSum.toFixed(2));

  // 调试日志
  console.log(`etax 脚本运行成功，原始 ${beforeCount} 条，过滤后 ${filteredList.length} 条，合计税前收入: ${body.data.sreHj}，应补退税额: ${body.data.ybtseHj}`);

} else {
  $notify("etax 错误", "", "未找到 data.nsmxList");
}

$done({ body: JSON.stringify(body) });
