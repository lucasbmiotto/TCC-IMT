import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import SeedPhraseScreen from '../screens/SeedPhraseScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import HomePageScreen from '../screens/HomePageScreen';
import SignInScreen from '../screens/SignInScreen';
import ShareScreen from '../screens/ShareScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import WalletActionsScreen from '../screens/WalletActionsScreen';
import KeyScreen from '../screens/KeyScreen';
import DeleteScreen from '../screens/DeleteScreen';
import DownloadWalletScreen from '../screens/WalletBackup';
import ValidarCredenciais from '../screens/ValidarCredenciais';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
      <Stack.Screen name="SeedPhrase" component={SeedPhraseScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="Home" component={HomePageScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Share" component={ShareScreen} />
      <Stack.Screen name="QRCode" component={QRCodeScreen} />
      <Stack.Screen name="WalletAction" component={WalletActionsScreen} />
      <Stack.Screen name="Key" component={KeyScreen} />
      <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
      <Stack.Screen name="WalletBackup" component={DownloadWalletScreen} />
      <Stack.Screen name="ValidateCredentials" component={ValidarCredenciais} />
    </Stack.Navigator>
  );
}
