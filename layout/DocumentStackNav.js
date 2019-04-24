import { createStackNavigator } from 'react-navigation';
import Agreements from './Agreements';
import Agreement from './Agreement';

export default (DrawNav = createStackNavigator(
  {
    Agreements: { screen: Agreements },
    Agreement: { screen: Agreement },
  },
  {
    initialRouteName: 'Agreements',
    headerMode: 'none',
  },
));
