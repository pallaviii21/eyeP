const input = document.getElementById('ipInput');
const button = document.getElementById('lookupBtn');
const messageBox = document.getElementById('message');
const resultBox = document.getElementById('result');

button.addEventListener('click', async () => {
  const ip = input.value.trim();
  messageBox.textContent = '';
  resultBox.classList.add('hidden');
  resultBox.innerHTML = '';

  const validation = validateIP(ip);

  if (!validation.valid) {
    messageBox.textContent = validation.message;
    return;
  }

  messageBox.textContent = 'Fetching IP data...';

  const result = await fetchIPData(ip);
  console.log(result);

  if (!result.success) {
    messageBox.textContent = result.error;
    return;
  }

  messageBox.textContent = '';
  renderIPData(result.data);
});


let unavailableFields = [];

function safeValue(value, fieldName = "") {
  const cleaned =
    typeof value === "string" ? value.trim() : value;

  if (
    cleaned === null ||
    cleaned === undefined ||
    cleaned === ""
  ) {
    if (fieldName) unavailableFields.push(fieldName);
    return "Unavailable";
  }

  return cleaned;
}


function classifyIP(data) {
  const security = data.security || {};
  const company = data.company || {};
  const asn = data.asn || {};

  if (security.is_tor) {
    return { type: "Tor Network", badge: "tor" };
  }

  if (security.is_vpn) {
    return { type: "VPN", badge: "vpn" };
  }

  if (security.is_proxy) {
    return { type: "Proxy", badge: "proxy" };
  }

  if (security.is_hosting) {
    return { type: "Hosting / Data Center", badge: "hosting" };
  }

  if (company.type === "isp" || asn.type === "isp") {
    return { type: "Residential / ISP", badge: "residential" };
  }

  return { type: "Unknown", badge: "unknown" };
}


function renderIPData(data) {
  unavailableFields = [];
  resultBox.classList.remove('hidden');

  const location = data.location || {};
  const timezone = data.timezone || {};
  const currency = data.currency || {};
  const security = data.security || {};
  const company = data.company || {};
  const asn = data.asn || {};
  const flag = data.flag || {};

  const classification = classifyIP(data);

  const html = `
  <div class="card">

    <div class="card-header">
      <div class="badge ${classification.badge}">
        ${classification.type}
      </div>
      <div class="flag">
        ${flag.emoji || ""}
      </div>
    </div>

    <div class="grid">

      <div class="info-box">
        <h4>Location</h4>
        <p>Country: ${safeValue(location.country, "Country")}</p>
        <p>Region: ${safeValue(location.region, "Region")}</p>
        <p>City: ${safeValue(location.city, "City")}</p>
        <p>Latitude: ${safeValue(location.latitude, "Latitude")}</p>
        <p>Longitude: ${safeValue(location.longitude, "Longitude")}</p>
      </div>

      <div class="info-box">
        <h4>Network</h4>
        <p>Company: ${safeValue(company.name, "Company")}</p>
        <p>ASN: ${safeValue(asn.asn, "ASN")}</p>
        <p>Timezone: ${safeValue(timezone.name, "Timezone")}</p>
        <p>Currency: ${safeValue(currency.name, "Currency")}</p>
      </div>

      <div class="info-box">
        <h4>Security</h4>
        <p>VPN: ${safeValue(security.is_vpn, "VPN")}</p>
        <p>Proxy: ${safeValue(security.is_proxy, "Proxy")}</p>
        <p>Tor: ${safeValue(security.is_tor, "Tor")}</p>
        <p>Hosting: ${safeValue(security.is_hosting, "Hosting")}</p>
      </div>

    </div>

  </div>
`;

let noteSection = "";

const totalFields = 8; // adjust if you count more tracked fields
const missingCount = unavailableFields.length;
const completeness = Math.round(
  ((totalFields - missingCount) / totalFields) * 100
);

if (missingCount > 0) {
  noteSection = `
    <div class="note">
      <strong>⚠ Data Notice</strong>
      <p>Missing fields: ${unavailableFields.join(", ")}</p>
      <p>Data completeness: <strong>${completeness}%</strong></p>
      <p>This may occur because the IP belongs to a data center, 
      uses VPN/proxy masking, or the API plan limits certain fields.</p>
    </div>
  `;
} else {
  noteSection = `
    <div class="note success">
      ✅ All major fields available.
      <p>Data completeness: <strong>100%</strong></p>
    </div>
  `;
}

  resultBox.innerHTML = html + noteSection;
}

