import "./App.css";
import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";
import { PostsProvider } from "./context/PostsContext";
import Main from "./views/Main";
import { FilesProvider } from "./context/FilesContext";

function App() {
  return (
    <ModalProvider>
      <UserProvider>
        <FilesProvider>
          <PostsProvider>
            <Main />
          </PostsProvider>
        </FilesProvider>
      </UserProvider>
    </ModalProvider>
  );
}

export default App;
