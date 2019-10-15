const disableBlinkingCursor = async page => {
  const styleContent = `
    input {
      caret-color: transparent !important;
    }
    input:focus {
      outline: none;
    }
  `

  await page.addStyleTag({ content: styleContent })
}

module.exports = disableBlinkingCursor
