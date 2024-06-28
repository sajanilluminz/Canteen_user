export const touchSlope = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

export const secondsToHms = (d: any) => {
  let val = 0;
  d = Number(d);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var mDisplay = m > 0 ? `${m}:` : `${0}:`;

  var sDisplay = s > 0 ? (s >= 10 ? `${s}` : `${val}${s}`) : `${val}${val}`;

  return mDisplay + sDisplay;
};
