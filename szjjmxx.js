// 深圳交警免限行申请
// szjjmxx.js

let body = $response.body;

// 匹配 placeholder 并插入 value 属性，仅处理包含目标 placeholder 的字段
body = body.replace(
  /("placeholder"\s*:\s*"请输入号牌号码")(?!,\s*"value")/g,
  '$1, "value": "粤KUE525"'
);

// 可选：添加日志（可用于调试）
console.log("申请限行JS 替换完成");

$done({ body });
