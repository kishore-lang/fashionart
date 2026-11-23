// DNS resolver fallback for environments where local ISP / mobile hotspot DNS cannot resolve AWS Neon subdomains
const dns = require("dns");

const NEON_IPS = ["3.0.167.45", "13.251.17.193", "18.138.49.39"];

const origLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  if (hostname && hostname.includes("neon.tech")) {
    const ip = NEON_IPS[0];
    if (options && options.all) {
      return callback(null, [{ address: ip, family: 4 }]);
    }
    return callback(null, ip, 4);
  }
  return origLookup(hostname, options, callback);
};
