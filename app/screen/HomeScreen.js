import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {images} from "../resource"
import AllScreen from "./all/AllScreen";
import OneScreen from "./one/OneScreen";
import MeScreen from "./me/MeScreen";

/**
 * Created by yunpeng on
 * Desc:
 */
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "one"
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator>
                    {this._renderItem("one")}
                    {this._renderItem("all")}
                    {this._renderItem("me")}
                </TabNavigator>
            </View>
        )
    }


    /**
     * 返回底部导航栏
     * @param tag
     * @returns {XML}
     * @private
     */
    _renderItem(tag) {

        let selectedIcon;
        let unSelectedIcon;
        let screen;
        switch (tag) {
            case "one":
                selectedIcon = images.one_fill;
                unSelectedIcon = images.one_line;
                screen = <OneScreen
                    navigation={this.props.navigation}
                />;
                break;
            case "all":
                selectedIcon = images.all_fill;
                unSelectedIcon = images.all_line;
                screen = <AllScreen/>;
                break;
            case "me":
                selectedIcon = images.me_fill;
                unSelectedIcon = images.me_line;
                screen = <MeScreen/>;
                break;
        }
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                selectedTitleStyle={styles.selectTabTitle}
                titleStyle={styles.tabTitle}
                title={tag}
                renderIcon={() => <Image source={unSelectedIcon} style={styles.icoImg}/>}
                renderSelectedIcon={() => <Image source={selectedIcon} style={styles.icoImg}/>}
                onPress={() => this.setState({selectedTab: tag})}>
                {screen}
            </TabNavigator.Item>
        )
    }
}
const styles = StyleSheet.create({
    icoImg: {
        height: 35,
        width: 35,
    },
    tabTitle: {
        color: "#000",
        height: 0
    },
    selectTabTitle: {
        color: "#000",
        height: 0
    }

});