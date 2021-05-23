import { ChakraProvider, theme, Box, Grid } from "@chakra-ui/react";

import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import { IdeaManager } from "./managers";
import { ColorModeSwitcher } from "./components";

const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="lg">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        {/* <NavigationBar /> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={`/users/:userId`} children={<IdeaManager />} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Grid>
    </Box>
  </ChakraProvider>
);

export default App;
