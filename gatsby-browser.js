const React = require("react");
const GlobalStyle = require("./src/components/GlobalStyle.css").default;
const { fontFaceRules } = require("./src/components/GlobalStyle.css");
const { Helmet } = require("react-helmet");

exports.wrapPageElement = ({ element, props }) => {
  return (
    <React.Fragment>
      <Helmet>
        <style>{fontFaceRules}</style>
      </Helmet>
      <GlobalStyle />
      {element}
    </React.Fragment>
  );
};