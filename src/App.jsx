import "./App.css";
import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";
import { PostsProvider } from "./context/PostsContext";
import Main from "./views/Main";

function App() {
  return (
    <ModalProvider>
      <UserProvider>
        <PostsProvider>
          <Main />
        </PostsProvider>
      </UserProvider>
    </ModalProvider>
  );
}

export default App;
