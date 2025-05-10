import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import SubscriptionScreen from './screens/SubscriptionScreen';

import TrustedSuppliersIntro from './screens/TrustedSuppliersIntro';
import TrustedSuppliersList from './screens/TrustedSuppliersList';

import AccountEditScreen from './screens/AccountEditScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';
import AccountOverviewScreen from './screens/AccountOverviewScreen';
import ProfileScreen from './screens/ProfileScreen';

import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import OtpScreen from './screens/OtpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import TeamHandleScreen from './screens/TeamHandleScreen';
import CompanyInformationScreen from './screens/CompanyInformationScreen';

import BidsScreen from './screens/BidsScreen';
import AddBidScreen from './screens/AddBidScreen';
import LiveBidScreen from './screens/LiveBidScreen';
import ClosedBidScreen from './screens/ClosedBidScreen';
import SelectSuppliersScreen from './screens/SelectSuppliersScreen';

// Suppliers Stack: only Intro and List
const SupplierStack = createStackNavigator();
function SuppliersScreen() {
  return (
    <SupplierStack.Navigator screenOptions={{ headerShown: false }}>
      <SupplierStack.Screen name="TrustedSuppliersIntro" component={TrustedSuppliersIntro} />
      <SupplierStack.Screen name="TrustedSuppliersList" component={TrustedSuppliersList} />
    </SupplierStack.Navigator>
  );
}

// Account Stack: starts from Profile
const AccountStack = createStackNavigator();
function AccountScreen() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="Profile" component={ProfileScreen} />
      <AccountStack.Screen name="AccountOverview" component={AccountOverviewScreen} />
      <AccountStack.Screen name="AccountEdit" component={AccountEditScreen} />
      <AccountStack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    </AccountStack.Navigator>
  );
}

// Bids Stack remains same
const BidsStack = createStackNavigator();
function BidsTabStack() {
  return (
    <BidsStack.Navigator screenOptions={{ headerShown: false }}>
      <BidsStack.Screen name="BidsList" component={BidsScreen} />
      <BidsStack.Screen name="AddBid" component={AddBidScreen} />
      <BidsStack.Screen name="LiveBid" component={LiveBidScreen} />
      <BidsStack.Screen name="ClosedBid" component={ClosedBidScreen} />
      <BidsStack.Screen name="SelectSuppliers" component={SelectSuppliersScreen} />
    </BidsStack.Navigator>
  );
}

// Main Bottom Tabs — No Orders
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Bids') iconName = 'hammer';
          else if (route.name === 'Suppliers') iconName = 'hand-left';
          else if (route.name === 'Account') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Bids" component={BidsTabStack} />
      <Tab.Screen name="Suppliers" component={SuppliersScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// Root Navigator
const RootStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
  <RootStack.Screen name="Splash" component={SplashScreen} />
  <RootStack.Screen name="SignIn" component={SignInScreen} options={{ presentation: 'modal' }} />
  <RootStack.Screen name="Otp" component={OtpScreen} options={{ presentation: 'modal' }} />
  <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ presentation: 'modal' }} />
  <RootStack.Screen name="TeamHandle" component={TeamHandleScreen} options={{ presentation: 'modal' }} />
  <RootStack.Screen name="CompanyInformation" component={CompanyInformationScreen} options={{ presentation: 'modal' }} />
  <RootStack.Screen name="Subscription" component={SubscriptionScreen} options={{ presentation: 'modal' }} />
  <RootStack.Screen name="TrustedSuppliersIntro" component={TrustedSuppliersIntro} options={{ presentation: 'modal' }} />
  <RootStack.Screen name="Main" component={MainTabs} />
</RootStack.Navigator>

    </NavigationContainer>
  );
}
