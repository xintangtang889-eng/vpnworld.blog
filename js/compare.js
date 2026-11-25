/**
 * VPNWorld.blog - Dynamic Airport Comparison Engine
 * Supports selecting 2 to 4 airport services for side-by-side comparison
 */

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("compare-matrix-container");
  const checkboxesContainer = document.getElementById("compare-selector-boxes");
  const emptyNotice = document.getElementById("compare-empty-notice");
  const rootPrefix = document.body.getAttribute("data-root") || "./";

  if (!container || !checkboxesContainer) return;

  const airports = window.AIRPORTS_DATA || [];
  let selectedSlugs = ["tag-vpn", "flyingbird", "just-my-socks"]; // Default 3 selected

  // Render Checkboxes
  function renderCheckboxes() {
    let html = "";
    airports.forEach(function (airport) {
      const isChecked = selectedSlugs.includes(airport.slug);
      html += '<label class="compare-checkbox-label">' +
              '<input type="checkbox" value="' + airport.slug + '" ' + (isChecked ? 'checked' : '') + '> ' +
              airport.name +
              '</label>';
    });
    checkboxesContainer.innerHTML = html;

    // Attach change event
    const inputs = checkboxesContainer.querySelectorAll("input[type='checkbox']");
    inputs.forEach(function (input) {
      input.addEventListener("change", function () {
        const slug = this.value;
        if (this.checked) {
          if (selectedSlugs.length >= 4) {
            alert("横向对比最多同时选择 4 家机场进行深度比对");
            this.checked = false;
            return;
          }
          selectedSlugs.push(slug);
        } else {
          selectedSlugs = selectedSlugs.filter(function (s) { return s !== slug; });
        }
        renderMatrix();
      });
    });
  }

  // Render Comparison Matrix
  function renderMatrix() {
    if (selectedSlugs.length < 2) {
      container.innerHTML = "";
      if (emptyNotice) {
        emptyNotice.style.display = "block";
        emptyNotice.innerHTML = '<div class="alert alert-warning">请至少在上方勾选 <strong>2 家</strong>（最多 4 家）机场以激活横向对比矩阵。</div>';
      }
      return;
    }

    if (emptyNotice) {
      emptyNotice.style.display = "none";
    }

    const currentAirports = airports.filter(function (a) {
      return selectedSlugs.includes(a.slug);
    });

    let html = '<div class="table-responsive"><table class="data-table"><thead><tr><th style="min-width: 140px;">比较维度</th>';

    // Headers with airport names
    currentAirports.forEach(function (a) {
      html += '<th style="min-width: 200px; text-align: center;">' +
              '<div style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary);">' + a.name + '</div>' +
              '<div style="font-size: 0.8125rem; color: var(--color-muted); margin-top: 0.25rem;">' + a.billingCycle + '</div>' +
              '</th>';
    });
    html += '</tr></thead><tbody>';

    // 1. Starting Price
    html += '<tr><td><strong>起步价格</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td style="text-align: center;"><span style="font-size: 1.25rem; font-weight: 800; color: var(--color-dark);">' + a.currency + a.startingPrice + '</span> <span style="font-size: 0.8125rem; color: var(--color-muted);">/月折合</span></td>';
    });
    html += '</tr>';

    // 2. Base Plan Traffic
    html += '<tr><td><strong>起步套餐流量</strong></td>';
    currentAirports.forEach(function (a) {
      const plan = a.plans[0];
      html += '<td style="text-align: center;"><strong>' + (plan ? plan.traffic + ' GB' : '尚未核实') + '</strong></td>';
    });
    html += '</tr>';

    // 3. Per GB Cost
    html += '<tr><td><strong>每GB单价 (折算)</strong></td>';
    currentAirports.forEach(function (a) {
      const plan = a.plans[0];
      html += '<td style="text-align: center;"><span class="badge" style="background:#eff6ff; color:#2563eb; font-weight:bold;">¥' + (plan ? plan.perGbCost.toFixed(3) : '-') + ' / GB</span></td>';
    });
    html += '</tr>';

    // 4. Line & Protocol
    html += '<tr><td><strong>线路与协议</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td>' + a.protocols.map(function(p){ return '<code>' + p + '</code>'; }).join(' ') + '</td>';
    });
    html += '</tr>';

    // 5. Node Regions
    html += '<tr><td><strong>节点覆盖地区</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td><div style="font-size: 0.875rem;">' + a.regions.join("、") + '</div></td>';
    });
    html += '</tr>';

    // 6. Device Limit
    html += '<tr><td><strong>设备同时在线数</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td style="text-align: center;">' + (a.deviceLimit || '尚未核实') + '</td>';
    });
    html += '</tr>';

    // 7. AI Tool Support
    html += '<tr><td><strong>ChatGPT / AI支持</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td>' + (a.aiSupport && a.aiSupport.length ? a.aiSupport.join('、') : '仅部分节点') + '</td>';
    });
    html += '</tr>';

    // 8. Streaming Support
    html += '<tr><td><strong>4K流媒体解锁</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td>' + (a.streamingSupport && a.streamingSupport.length ? a.streamingSupport.join('、') : '基础解锁') + '</td>';
    });
    html += '</tr>';

    // 9. Core Advantages
    html += '<tr><td><strong>核心优势</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td><ul class="pros-list" style="margin-bottom:0;">' +
              a.advantages.map(function (adv) { return '<li>' + adv + '</li>'; }).join('') +
              '</ul></td>';
    });
    html += '</tr>';

    // 10. Drawbacks / Cautions
    html += '<tr><td><strong>注意事项 / 缺点</strong></td>';
    currentAirports.forEach(function (a) {
      html += '<td><ul class="cons-list" style="margin-bottom:0;">' +
              a.disadvantages.map(function (dis) { return '<li>' + dis + '</li>'; }).join('') +
              '</ul></td>';
    });
    html += '</tr>';

    // 11. Links
    html += '<tr><td><strong>详细评测与档案</strong></td>';
    currentAirports.forEach(function (a) {
      const reviewUrl = rootPrefix + 'review/' + a.slug + '/index.html';
      const airportUrl = rootPrefix + 'airport/' + a.slug + '/index.html';
      html += '<td style="text-align: center;">' +
              '<a href="' + reviewUrl + '" class="btn btn-primary btn-sm" style="margin-bottom:0.4rem; display:block;">阅读深度评测</a>' +
              '<a href="' + airportUrl + '" class="btn btn-secondary btn-sm" style="display:block;">查看品牌档案</a>' +
              '</td>';
    });
    html += '</tr>';

    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  renderCheckboxes();
  renderMatrix();
});
