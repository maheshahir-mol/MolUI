import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Downloads from './pages/Downloads';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="editorPage" element={<EditorPage />} />
          <Route path="previewPage" element={<PreviewPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
