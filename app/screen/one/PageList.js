import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Animated


} from 'react-native';
import {titleBar, LaudView} from "../../components"
import ImageButton from "../../components/ImageButton";
import OneStyle from "./OneStyle"
import images from "../../resource/images";


/**
 * Created by yunpeng on
 * Desc:
 */
export  default class PageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: "2017 / 09 / 12",
            jsonData: [],
            isRefreshing: false,
            scrollY:new Animated.Value(0)
        }
    }
    render(){

        return(
            <FlatList
                onEndReached={() => this._fetchJson(true)}
                onEndReachedThreshold={0.5}
                data={this.state.jsonData}
                renderItem={({item}) => this._renderListItem(item)}
                ItemSeparatorComponent={this._separator}
                //设置下拉刷新控件
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        //刷新时调用这个方法
                        onRefresh={() => this._fetchJson(false)}
                    >
                    </RefreshControl>
                }
            />


        )
    }

    /**
     * 分割线
     * @returns {XML}
     * @private
     */
    _separator = () => {
        return <View style={{height: 5, backgroundColor: '#eee'}}/>;
    };

    _renderListItem(item) {

        switch (item.key) {
            case 0:
                return this._renderHeaderItem(item);
                break;
            default:
                return (
                    <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress.bind(this,item.item)}>
                        {this._renderHeadTitle(item)}
                    </TouchableOpacity>
                );
                break;
        }


    }




    /**
     *
     * @private
     */
    _renderHeadTitle(item) {
        let title;
        let bean = item.item;
        switch (bean.category) {
            case "1":
                title = "ONE STORY";
                return (
                    <View key={item.key} style={{backgroundColor: "#fff", flexDirection: "column", padding: 10}}>
                        <Text style={{textAlign: "center"}}>- {title}-</Text>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "#000",
                            marginVertical: 15
                        }}>{bean.title}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, marginBottom: 10}}>文
                            / {bean.author.user_name}</Text>
                        <ImageButton
                            source={{uri: bean.img_url}}
                            style={OneStyle.contentImgStyle}
                            onPress={() => {
                            }}
                        />
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            marginBottom: 20,
                            lineHeight: 30,
                        }}>{bean.forward}</Text>
                        {this._renderItemBottom()}
                    </View>
                )

                break;
            case "2":
                title = "连载";
                break;
            case "3":
                title = "问答";
                return (
                    <View key={item.key} style={{backgroundColor: "#fff", flexDirection: "column", padding: 10}}>
                        <Text style={{textAlign: "center"}}>- {title}-</Text>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "#000",
                            marginVertical: 15
                        }}>{bean.title}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, marginBottom: 10}}>文
                            / {bean.author.user_name}</Text>
                        <ImageButton
                            source={{uri: bean.img_url}}
                            style={OneStyle.contentImgStyle}
                            onPress={() => {
                            }}
                        />
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            marginBottom: 20,
                            lineHeight: 30,
                        }}>{bean.forward}</Text>
                        {this._renderItemBottom()}
                    </View>
                )
                break;
            case "4":
                title = "音乐";

                return (
                    <View key={item.key} style={{backgroundColor: "#fff", flexDirection: "column", padding: 10}}>
                        <Text style={{textAlign: "center"}}>- {title}-</Text>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "#000",
                            marginVertical: 15
                        }}>{bean.title}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, marginBottom: 10}}>文
                            / {bean.author.user_name}</Text>
                        <View style={{flexDirection:"row",justifyContent:"center",flex:1}}>
                            <ImageButton
                                source={{uri: bean.img_url}}
                                style={OneStyle.circle}
                                onPress={() => {
                                }}
                            />
                        </View>

                        <Text style={{
                            fontSize: 13,
                            marginBottom: 5,
                            lineHeight: 30,
                        }}>{bean.share_info.title.split(":")[1]}</Text>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            marginBottom: 20,
                            lineHeight: 30,
                        }}>{bean.forward}</Text>
                        {this._renderItemBottom()}
                    </View>
                )


                break;
            case "5":
                title = "电影";
                return(
                    <View key={item.key} style={{backgroundColor: "#fff", flexDirection: "column", padding: 10}}>
                        <Text style={{textAlign: "center"}}>- {title}-</Text>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "#000",
                            marginVertical: 15
                        }}>{bean.title}</Text>
                        <Text style={{fontSize: 13, marginBottom: 10}}>文
                            / {bean.author.user_name}</Text>
                        <ImageButton
                            source={{uri: bean.img_url}}
                            style={OneStyle.contentImgStyle}
                            onPress={() => {
                            }}
                        />
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            marginTop:20,
                        }}>{bean.forward}</Text>
                        <Text style={{textAlign:"right",marginBottom:20}}>
                            ——《{
                            bean.subtitle.split(":")[1]
                        }》</Text>
                        {this._renderItemBottom()}
                    </View>



                )
                break;
            case "6":
                title = "广告";
                break;

        }


        return (
            <View key={item.key} style={{backgroundColor: "#fff", flexDirection: "column", padding: 10}}>
                <Text style={{textAlign: "center"}}>- {title}-</Text>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#000",
                    marginVertical: 15
                }}>{bean.title}</Text>
                <Text style={{fontWeight: "bold", fontSize: 13, marginBottom: 10}}>文
                    / {bean.author.user_name}</Text>
                <ImageButton
                    source={{uri: bean.img_url}}
                    style={OneStyle.contentImgStyle}
                    onPress={() => {
                    }}
                />
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    marginBottom: 20,
                    lineHeight: 30,
                }}>{bean.forward}</Text>
                {this._renderItemBottom()}
            </View>
        )
    }


    /**
     * item下面图标
     * @returns {XML}
     * @private
     */
    _renderItemBottom() {
        return (
            <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
                <Text style={{fontSize:13}}>今天</Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <LaudView/>
                    <ImageButton
                        source={images.bubble_share}
                        style={{height: 18, width: 18,marginLeft:30}}
                    />
                </View>
            </View>
        )
    }

    /**
     * 返回头部的item
     * @returns {XML}
     * @private
     */
    _renderHeaderItem(item){
        let bean = item.item;
        return (
            <View key={item.key} style={{backgroundColor: "#fff"}}>
                <ImageButton
                    source={{uri: bean.img_url}}
                    style={OneStyle.headImgStyle}
                    onPress={() => {
                    }}
                />
                <View style={OneStyle.headTitleStyle}>
                    <Text style={{textAlign: "center"}}>{bean.title}</Text>
                    <Text style={{textAlign: "center"}}> | </Text>
                    <Text style={{textAlign: "center"}}>{bean.pic_info}</Text>
                </View>
                <Text style={OneStyle.forwardStyle}>{bean.forward}</Text>
                <Text style={{textAlign: "center", marginVertical: 10}}>{bean.words_info}</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
                    <View style={{flexDirection: "row"}}>
                        <ImageButton
                            source={images.diary_icon}
                            style={{height: 18, width: 18, marginRight: 5}}
                        />
                        <Text>小计</Text>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <LaudView/>
                        <ImageButton
                            source={images.bubble_collect}
                            style={{height: 18, width: 18, marginHorizontal: 30}}
                        />
                        <ImageButton
                            source={images.bubble_share}
                            style={{height: 18, width: 18}}
                        />
                    </View>
                </View>
            </View>
        );
    }

    /**
     * 获取网络数据
     * @private
     */
    _fetchJson() {
        fetch(this.props.url)
            .then(response => response.json())
            .then(responseJson => {
                this.state.isRefreshing = false;
                let data = [];
                //提取json中的数据
                let content = responseJson.data.content_list;
                //将数据设置到state，react-native会调用render对界面进行重绘
                for (let i = 0; i < content.length; i++) {
                    data.push({
                        key: i,
                        item: content[i],
                    })
                }
                this.setState(
                    {
                        jsonData: data,
                    }
                )
            })
            .catch(() => {

            })

    }

    componentDidMount() {
        this._fetchJson();
    }


}