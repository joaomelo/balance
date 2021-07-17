export function createErrorReport (error, schema = {}) {
  const entries = Object.entries(schema);
  const report = entries.reduce((acc, [key, codes]) => {
    acc[key] = reportOnCodes(error, codes);
    return acc;
  }, {});

  report.escaped = reportOnEscaped(error, schema);

  return report;
}

function reportOnCodes (error, codeOrCodes) {
  if (!error || !error.code) return null;

  const { code } = error;
  const codes = Array.isArray(codeOrCodes) ? codeOrCodes : [codeOrCodes];
  return codes.includes(code) ? code : null;
}

function reportOnEscaped (error, schema) {
  if (!error) return null;

  const { code } = error;
  const registeredCodes = Object.values(schema).flat();
  if (registeredCodes.includes(code)) return null;

  // the ui can come with a generic message given we provide here
  // a standard code for no-code errors
  if (!code) return 'ERROR/UNEXPECTED_ERROR';

  return code;
};
