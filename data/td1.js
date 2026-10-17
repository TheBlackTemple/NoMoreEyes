// transforms raw_data to trigram data
function extractTD1(l1, l2) {
  const out = [];
  let i1 = 0, i2 = 0, idx = 0;
  while (true) {
    if (idx % 2 === 0) {
      if (i1 + 1 >= l1.length || i2 >= l2.length) break;
      out.push(l1[i1] + l1[i1+1] + l2[i2]);
      i1 += 2; i2 += 1;
    } else {
      if (i2 + 1 >= l2.length || i1 >= l1.length) break;
      out.push(l2[i2+1] + l2[i2] + l1[i1]);
      i2 += 2; i1 += 1;
    }
    idx++;
  }
  return out;
}