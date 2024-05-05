import { Switch, Route } from 'react-router-dom';

import Paths from './Paths';
import { Home } from '../pages/Home';
import { DetailUser } from '../pages/DetailUser';
import { Album } from '../pages/Album';
import { DetailPost } from '../pages/DetailPost';
import { Photo } from '../pages/Photo';
import { FormPost } from '../pages/FormPost';

const RootNavigation = () => (
  <Switch>
    <Route path={Paths.Home} component={Home} exact />
    <Route path={Paths.DetailUser} component={DetailUser} exact />
    <Route path={Paths.Album} component={Album} exact />
    <Route path={Paths.CreatePost} component={FormPost} exact />
    <Route path={Paths.UpdatePost} component={FormPost} exact />
    <Route path={Paths.DetailPost} component={DetailPost} exact />
    <Route path={Paths.Photo} component={Photo} exact />
    <Route path="*" component={Home} />
  </Switch>
);

export default RootNavigation;
