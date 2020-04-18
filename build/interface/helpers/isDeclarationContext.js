export default function isDeclarationContext({ variables, functions, classes } = {}) {
  const isVariables = variables && Object.keys(variables).length;
  const isFunctions = functions && Object.keys(functions).length;
  const isClasses = classes && Object.keys(classes).length;
  return isVariables || isFunctions || isClasses;
}
