import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

// import LanguageProviderContainer from "containers/LanguageProvider";
// import theme from "utils/styledThemes";
import { configureStore } from "../../app/store";
// import { translationMessages } from "../../app/i18n";

if (!window.store) window.store = configureStore({});

const theme = {};

class Provider extends React.PureComponent {
  static propTypes = {
    story: PropTypes.node.isRequired
  };

  render() {
    const { story } = this.props;

    return (
      <ReduxProvider store={window.store}>
        {/* <LanguageProviderContainer messages={translationMessages}> */}
        <ThemeProvider theme={theme}>{story}</ThemeProvider>
        {/* </LanguageProviderContainer> */}
      </ReduxProvider>
    );
  }
}

export default path => storyFactory => {
  // No App, hence just return the provided story
  if (!path.includes("/Apps/") && !path.includes("/Content/Template/")) {
    return <ThemeProvider theme={theme}>{storyFactory()}</ThemeProvider>;
  }

  // return the decorated story (with redux store, intl and theme)
  return <Provider story={storyFactory()} />;
};
