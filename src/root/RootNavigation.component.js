import { Switch, Route } from 'react-router-dom';

import Paths from './Paths';
import { Home } from '../pages/Home';
import { DetailUser } from '../pages/DetailUser';
import { Album } from '../pages/Album';
import { DetailPost } from '../pages/DetailPost';
import { Photo } from '../pages/Photo';
import { CreatePost } from '../pages/CreatePost';
import { EditPost } from '../pages/EditPost';

const RootNavigation = () => (
  <Switch>
    <Route path={Paths.Home} component={Home} exact />
    <Route path={Paths.DetailUser} component={DetailUser} exact />
    <Route path={Paths.Album} component={Album} exact />
    <Route path={Paths.CreatePost} component={CreatePost} exact />
    <Route path={Paths.UpdatePost} component={EditPost} exact />
    <Route path={Paths.DetailPost} component={DetailPost} exact />
    <Route path={Paths.Photo} component={Photo} exact />
    <Route path="*" component={Home} />
  </Switch>
);

export default RootNavigation;
