module.exports = function addProductionHash(template, isProduction = false) {
  if (!isProduction) {
    return template;
  }

  const PART_TO_REPLACE = '[name]';
  const PART_TO_APPEND = '[contenthash]';
  if (template.indexOf(PART_TO_REPLACE) < 0) {
    throw new Error(
      `Unable to find '[name]' part inside file template to add production hash in ${template}`
    );
  }

  return template.replace(
    PART_TO_REPLACE,
    `${PART_TO_REPLACE}.${PART_TO_APPEND}`
  );
};
