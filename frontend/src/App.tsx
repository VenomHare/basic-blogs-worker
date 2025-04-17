import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./page/Login"
import SignUp from "./page/SignUp"
import Blog from "./page/Blog"
import Blogs from "./page/Blogs"
import Publish from "./page/Publish"
import Edit from "./page/Edit"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/blogs" element={<Blogs />}/>
          <Route path="/blog/:id" element={<Blog />}/>
          <Route path="/blog/:postId/edit" element={<Edit />}/>
          <Route path="/publish" element={<Publish />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
