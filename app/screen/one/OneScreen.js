import React, {Component} from 'react';
import {
    View,
    ToastAndroid,
    Dimensions,
    Text,
    Animated
} from 'react-native';

import TitleBar from "../../components/TitleBar";
import ImageButton from "../../components/ImageButton";
import {constants} from "../../resource"
import PageList from "./PageList"
import Swiper from "react-native-swiper"

const pageNum = 7;
/**
 * Created by yunpeng on
 * Desc:
 */
export default class OneScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: "2017 / 09 / 12",
            jsonData: [],
            scrollY: new Animated.Value(0),
        }
    }

    render() {


        return (
            <View style={{flex: 1}}>
                {this._renderTitleBar()}
                {this._renderSwiperItem()}
            </View>
        )


    }


    /**
     * 返回title
     * @returns {XML}
     * @private
     */
    _renderTitleBar() {
        return (
            <View style={{flexDirection: "column"}}>
                <View style={{
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    height: 50,
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                    justifyContent: 'space-between',
                }}>
                    <View  style={{
                        position:"absolute",
                        left:Dimensions.get("window").width/4,
                        right:Dimensions.get("window").width/4,

                        flexDirection:"column"
                    }}>
                    <Text
                        //设置文本缩略格式 tail clip
                        ellipsizeMode="tail"
                        //文本行数限制
                        numberOfLines={1}
                        style={{
                            color: "#000",
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontSize:18,
                            fontWeight:"bold",
                        }}
                      >{this.state.today}</Text>
                        <Text
                            style={{
                                color: "#000",
                                textAlign: "center",
                                textAlignVertical: "center",
                                fontSize:10,
                            }}
                        >这是副标题</Text>
                    </View>
                </View>
                <View style={{backgroundColor: "#eee", height: 1, width: Dimensions.get("window").width}}/>
            </View>
        )


    }

    /**
     * 返回swiper每一页的内容
     * @returns {XML}
     * @private
     */
    _renderSwiperItem() {
        if (this.state.jsonData.length > 0) {
            // console.log("======>_renderSitemswiperItem"+this.state.jsonData[0].date);
            let swiperItem = [];
            for (let i = 0; i < this.state.jsonData.length; i++) {
                swiperItem.push(
                    <PageList
                        key={i}
                        onPress={(item) => {
                            this._go2ItemDetail(item)
                        }}
                        url={constants.oneUrlStart + this.state.jsonData[i].date + constants.oneUrlEnd}
                    />
                )
            }
            return (
                <Swiper horizontal={true} showsButtons={false} showsPagination={false} loop={false}
                    //获取当前滑动到哪一页
                        onMomentumScrollEnd={(e, state, context) => {
                            if (this.state.jsonData.length > 0) {
                                this.setState({
                                    today: this.state.jsonData[state.index].today
                                })
                            }
                        }}
                >
                    {swiperItem}
                </Swiper>
            );
        }


    }

    /**
     * 跳转到详情界面
     * @param item
     * @private
     */
    _go2ItemDetail(item) {
        this.props.navigation.navigate("ItemDetail", {
            item: item,
        })
    }

    _fetchListDate() {
        fetch(constants.oneUrl)
            .then(response => response.json())
            .then(responseJson => {
                let data = [];
                //提取json中的数据
                let date = responseJson.data.date;
                let year = (date.split(" ")[0]).split("-")[0];
                let month = (date.split(" ")[0]).split("-")[1];
                let day = (date.split(" ")[0]).split("-")[2];

                //将数据设置到state，react-native会调用render对界面进行重绘
                for (let i = 0; i < pageNum; i++) {
                    data.push({
                        key: i,
                        date: year + "-" + month + "-" + (day - i),
                        today: year + " / " + month + " / " + (day - i),
                    });
                }
                // console.log("=====>day"+data[1].date);
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
        this._fetchListDate();
    }


}
