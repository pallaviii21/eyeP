function isValidIPv4(ip) {
  const ipv4Regex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return ipv4Regex.test(ip);
}

function isValidIPv6(ip) {
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:))$/;
  return ipv6Regex.test(ip);
}

function isPrivateIP(ip) {
  if (isValidIPv4(ip)) {
    const parts = ip.split('.').map(Number);

    if (parts[0] === 10) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  }

  // IPv6 private & loopback
  if (ip === '::1' || ip.startsWith('fc') || ip.startsWith('fd')) {
    return true;
  }

  return false;
}

function validateIP(ip) {
  if (!ip) {
    return { valid: false, message: 'IP address cannot be empty.' };
  }

  if (!isValidIPv4(ip) && !isValidIPv6(ip)) {
    return { valid: false, message: 'Invalid IP address format.' };
  }

  if (isPrivateIP(ip)) {
    return { valid: false, message: 'Private or local IPs cannot be geolocated.' };
  }

  return { valid: true };
}
