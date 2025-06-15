// 脚本菜单运行脚本
//0 0 1 1 * https://github.com/Yesupday/qx/raw/refs/heads/master/calcpoint.js
(async () => {
  const defaultScore = 20;
  const multiplier = 2;
  const names = ["A", "B", "C", "D"];

  let input = "-12 -17 81 28";

  if (!input) {
    $notify("输入取消", "", "");
    $done();
    return;
  }

  let scores = input.split(" ").map(s => parseFloat(s.trim()));
  if (scores.length !== 4 || scores.some(isNaN)) {
    $notify("输入格式错误", "请确保是4个数字，用逗号分隔", "");
    $done();
    return;
  }

  let diffs = scores.map(score => score - defaultScore);

  let creditors = [];
  let debtors = [];
  let resultText = "";

  diffs.forEach((diff, i) => {
    let name = names[i];
    let status = diff > 0 ? "赢了" : diff < 0 ? "输了" : "平局";
    let amount = Math.abs(diff) * multiplier;
    resultText += `${name} ${status} ${Math.abs(diff)} 点（￥${amount.toFixed(2)}）\n`;

    if (diff > 0) creditors.push({ name, amount: diff });
    if (diff < 0) debtors.push({ name, amount: -diff });
  });

  // 简化支付路径（贪心）
  let payments = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    let debtor = debtors[i];
    let creditor = creditors[j];
    let payAmt = Math.min(debtor.amount, creditor.amount);
    payments.push(`${debtor.name} → ${creditor.name}：${payAmt.toFixed(2)} 点（￥${(payAmt * multiplier).toFixed(2)}）`);

    debtor.amount -= payAmt;
    creditor.amount -= payAmt;

    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  let result = resultText + "\n💰 支付路径：\n" + payments.join("\n");

  $notify("点数结算结果", "", result);
  $done();
})();
