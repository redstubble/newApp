import { createStackNavigator } from 'react-navigation';
import Agreements from '../layout/Agreements';
import Agreement from '../layout/Agreement';

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
