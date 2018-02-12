import {
    AppRegistry,
} from 'react-native';
import {StackNavigator} from "react-navigation";
import HomeScreen from "./screen/HomeScreen"
import ImageViewer from "./screen/ImageViewer"
//界面跳转的动画
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import AllScreen from "./screen/all/AllScreen"
import ItemDetail from "./screen/one/ItemDetail";
import OneScreen from "./screen/one/OneScreen";

const  stackNavigator=StackNavigator(
    {
        HomeScreen:{screen:HomeScreen},
        ItemDetail:{screen:ItemDetail},
        OneScreen:{screen:OneScreen},
        ImageViewer:{screen:ImageViewer},
        AllScreen:{screen:AllScreen},
    },{
        headerMode:"none",
        transitionConfig:()=>({
            screenInterpolator:CardStackStyleInterpolator.forHorizontal,
        })
    }

);
AppRegistry.registerComponent('One', () => stackNavigator);