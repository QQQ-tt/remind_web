<template>
  <div id="quote-pdf" class="quote-container">
    <h1 class="title">报价单</h1>

    <div class="section">
      <p>客户名称：{{ customerName }} 付款周期：{{ paymentTerm }}</p>
      <p>送货方式：{{ deliveryType }} 承运物流：{{ logistics }}</p>
      <p>联系人：{{ contactPerson }} 配送地址：{{ address }}</p>
    </div>

    <p class="tip">以下报价作为参考，如有任何问题请与我们联系</p>

    <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>产品名称</th>
          <th>规格</th>
          <th>数量</th>
          <th>单价</th>
          <th>金额</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.spec }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </tbody>
    </table>

    <div class="section">
      <p>运费：{{ freight }}</p>
      <p>优惠：{{ discount }}</p>
      <p><strong>合计：{{ total }}</strong></p>
    </div>

    <div class="section">
      <p>备注：</p>
      <ul>
        <li>1、报价单7天内有效</li>
        <li>2、报价单内容确认签字</li>
      </ul>
    </div>

    <div class="footer">
      <p>报价单位：{{ company }} 报价人：{{ saler }}</p>
      <p>电话：{{ phone }} 报价日期：{{ date }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customerName: String,
  paymentTerm: String,
  deliveryType: String,
  logistics: String,
  contactPerson: String,
  address: String,
  items: Array,
  freight: String,
  discount: String,
  total: String,
  company: String,
  saler: String,
  phone: String,
  date: String
});
</script>

<style scoped>
.quote-container {
  padding: 20px;
  width: 794px;
  /* A4宽度 */
  font-size: 14px;
  font-family: "Arial", sans-serif;
  color: #333;
  background: #fff;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.section {
  margin: 10px 0;
}

.tip {
  margin: 10px 0;
  font-style: italic;
  color: #555;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}

.table th,
.table td {
  border: 1px solid #333;
  padding: 8px;
  text-align: center;
}

.footer {
  margin-top: 20px;
}
</style>
