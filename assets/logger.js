const logger = {
  _$log_elem: null,
  init: (parent) => {
    parent.append("<pre></pre>");
    logger._$log_elem = parent.children("pre").last();
    return true;
  },
  log: (msg, prefix) => {
    if (logger._$log_elem === null) {
      return undefined;
    }
    const pref = prefix === undefined ? "" : prefix;
    const m = pref + msg;
    console.log(m);
    logger._$log_elem.append(m + "\n");
  }
}
