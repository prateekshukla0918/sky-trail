import { Route, Switch } from 'wouter';
import { BlogProvider } from './context/BlogContext';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BlogProvider>
      <Switch>
        <Route path="/" component={BlogList} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route component={NotFound} />
      </Switch>
    </BlogProvider>
  );
}

export default App;